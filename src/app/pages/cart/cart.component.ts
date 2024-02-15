import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { CookieService } from 'ngx-cookie-service';
import { OrdersService } from '../../services/order.service';
import { ProductService } from '../../services/product.service';
import { CartItemDetail } from '../../store/model/Cart.model';
import { ProductOrder } from '../../store/model/Order.model';
import { DetailProduct } from '../../store/model/Product.model';
@Component({
  selector: 'app-cart-page',
  templateUrl: './cart.component.html',
})
export class CartPage implements OnInit {
  public items: CartItemDetail[] = [];
  private cartItems = JSON.parse(this.cookieService.get('cartItems') || '[]');
  public total: number = 0;
  confirmModal?: NzModalRef;
  constructor(
    private cookieService: CookieService,
    private productService: ProductService,
    private message: NzMessageService,
    private confirm: NzModalService,
    private ordersService: OrdersService,
    private router: Router
  ) {}
  ngOnInit(): void {
    const listID = this.cartItems.map((item: any) => item.productID);

    if (listID.length > 0) {
      this.productService.getByIDs(listID).subscribe(
        (data: DetailProduct | DetailProduct[]) => {
          if (Array.isArray(data)) {
            data.forEach((item) => {
              this.items.push({
                productID: item.id,
                quantity:
                  this.cartItems.find(
                    (product: any) => product.productID === item.id
                  )?.quantity || 0,
                name: item.name,
                price: item.unitPrice,
                thumbnail: item.thumbnail,
                stock: item.stock,
              });
            });
            this.updateTotal();
          } else {
            this.items.push({
              productID: data.id,
              quantity:
                this.cartItems.find(
                  (product: any) => product.productID === data.id
                )?.quantity || 0,
              name: data.name,
              price: data.unitPrice,
              thumbnail: data.thumbnail,
              stock: data.stock,
            });
            this.updateTotal();
          }
        },
        (error) => {
          console.error('Error fetching products:', error);
        }
      );
    }
  }
  deleteProduct(productID: number) {
    const itemIndex = this.items.findIndex(
      (product: any) => product.productID === productID
    );
    if (itemIndex !== -1) {
      this.items.splice(itemIndex, 1);
    }
    this.cartItems = this.cartItems.filter(
      (product: any) => product.productID !== productID
    );
    this.cookieService.set('cartItems', JSON.stringify(this.cartItems));
    this.updateTotal();
  }
  updateTotal() {
    this.total = 0;
    this.items.forEach((item) => {
      this.total += item.quantity * item.price;
    });
  }
  decreaseQuantity(productID: number) {
    const item = this.items.find((product) => product.productID === productID);
    if (item && item.quantity > 1) {
      item.quantity--;
      if (item.quantity === 0) {
        this.deleteProduct(productID);
      }
      this.cartItems = this.cartItems.map((product: any) => {
        if (product.productID === productID) {
          product.quantity--;
        }
        return product;
      });
      this.cookieService.set('cartItems', JSON.stringify(this.cartItems));
      this.updateTotal();
    }
  }

  increaseQuantity(producID: number) {
    const item = this.items.find((product) => product.productID === producID);
    if (item && item.quantity < item.stock) {
      item.quantity++;
      this.cartItems = this.cartItems.map((product: any) => {
        if (product.productID === producID) {
          product.quantity++;
        }
        return product;
      });
      this.cookieService.set('cartItems', JSON.stringify(this.cartItems));
      this.updateTotal();
    } else {
      this.message.error('Out of stock');
    }
  }
  updateQuantity(productID: number, event: any) {
    if (event.target.value > 2147483647) {
      event.target.value = 1;
      return;
    }

    const quantity = parseInt(event.target.value);
    const item = this.items.find((product) => product.productID === productID);
    if (item) {
      if (quantity > 0) {
        if (quantity > item.stock) {
          this.message.error('Out of stock');
          event.target.value = item.stock;
          console.log(item.stock);
          item.quantity = item.stock;
        } else {
          item.quantity = quantity;
        }
      } else {
        this.message.error('Invalid quantity');
        event.target.value = 1;
        item.quantity = 1;
      }
      this.cartItems = this.cartItems.map((product: any) => {
        if (product.productID === productID) {
          product.quantity = quantity;
        }
        return product;
      });
      this.cookieService.set('cartItems', JSON.stringify(this.cartItems));
      this.updateTotal();
    }
  }
  showConfirm(): void {
    this.confirmModal = this.confirm.confirm({
      nzTitle: 'Do you Want to checkout?',
      nzContent: '',
      nzOnOk: () => this.createOrder(),
    });
  }

  createOrder() {
    const orderItems: ProductOrder[] = this.items.map((item) => {
      return {
        productID: item.productID,
        quantity: item.quantity,
      };
    });
    this.ordersService.create(orderItems).subscribe(
      () => {
        this.message.success('Successfully created order');
        this.cookieService.set('cartItems', JSON.stringify([]));
        this.items = [];
        this.total = 0;
        this.router.navigate(['/orders']);
      },
      (error: any) => {
        console.error('Error creating order:', error);
        this.message.error('Oops errors!', error);
      }
    );
  }
}
