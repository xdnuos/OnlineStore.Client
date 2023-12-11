import { Component, OnInit, inject } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NZ_MODAL_DATA, NzModalRef } from 'ng-zorro-antd/modal';
import { Observable } from 'rxjs';
import { ProductService } from '../../services/product.service';
import { DetailProduct } from '../../store/model/Product.model';
export interface ModalData {
  productID: number;
}
@Component({
  selector: 'product-detail',
  templateUrl: './product-detail.component.html',
})
export class ProductDetailComponent implements OnInit {
  public data = inject<ModalData>(NZ_MODAL_DATA);
  product$: Observable<DetailProduct> = new Observable<DetailProduct>();
  constructor(
    private modal: NzModalRef,
    private productService: ProductService,
    private message: NzMessageService
  ) {}
  ngOnInit(): void {
    this.product$ = this.productService.getByID(this.data.productID);
  }
  quantity: number = 1;

  decreaseQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  increaseQuantity(stock: number) {
    if (this.quantity < stock) {
      this.quantity++;
    } else {
      this.message.error('Out of stock');
    }
  }
  destroyModal(): void {
    this.modal.destroy();
  }
}
