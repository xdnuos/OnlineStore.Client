import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { CookieService } from 'ngx-cookie-service';
import { Observable, of, switchMap } from 'rxjs';
import { loadCategories } from '../../store/categories/Categories.action';
import * as fromCategorySelectors from '../../store/categories/Categories.selector';
import { CartItem } from '../../store/model/Cart.model';
import { Category } from '../../store/model/Category.model';
import { SimpleProduct } from '../../store/model/Product.model';
import {
  changePage,
  findByCategoryAction,
  loadProductPagination,
  searchAction,
  sortAction,
} from '../../store/product/Product.action';
import * as fromProductSelectors from '../../store/product/Product.selector';
import { ProductDetailComponent } from '../productDetail/product-detail.component';
@Component({
  selector: 'app-product-pagination',
  templateUrl: './product-pagination.component.html',
})
export class ProductPaginationComponent implements OnInit {
  products$: Observable<SimpleProduct[]> = new Observable<SimpleProduct[]>();
  total$: Observable<number> = new Observable<number>();
  categories$: Observable<Category[]> = new Observable<Category[]>();
  private length: number = 0;
  private isLoadCategory: boolean = false;
  constructor(
    private store: Store,
    private modalService: NzModalService,
    private cookieService: CookieService,
    private message: NzMessageService
  ) {}
  filterList = [
    { label: 'Name [A-Z]', sortBy: 'name', order: 'asc' },
    { label: 'Name [Z-A]', sortBy: 'name', order: 'desc' },
    { label: 'Price [Hight - Low]', sortBy: 'price', order: 'asc' },
    { label: 'Price [Low - High]', sortBy: 'price', order: 'desc' },
  ];
  ngOnInit() {
    // load from store
    this.categories$ = this.store.select(
      fromCategorySelectors.selectCategories
    );
    this.products$ = this.store.select(fromProductSelectors.selectProducts);

    //check if products is empty then load products
    this.products$.subscribe((products) => (this.length = products.length));
    this.categories$.subscribe((categories) => {
      categories.length > 0
        ? (this.isLoadCategory = true)
        : (this.isLoadCategory = false);
    });
    console.log('check', this.length, this.isLoadCategory);
    if (this.length === 0) {
      this.store.dispatch(
        loadProductPagination({
          page: 1,
          limit: 20,
          search: '',
          sortBy: '',
          order: '',
          category: -1,
        })
      );
    }
    if (!this.isLoadCategory) {
      this.store.dispatch(loadCategories());
    }
    this.total$ = this.store.select(fromProductSelectors.selectTotal);
  }

  pageChanged(pageIndex: number) {
    this.store.dispatch(changePage({ page: pageIndex }));
    this.loadProducts();
  }
  search(value: string) {
    this.store.dispatch(searchAction({ search: value || '' }));
    this.loadProducts();
  }

  findCategory(id: number) {
    this.store.dispatch(findByCategoryAction({ categoryID: id || -1 }));
    this.loadProducts();
  }

  sort(event: any) {
    this.store.dispatch(
      sortAction({
        sortBy: event ? event.sortBy : '',
        order: event ? event.order : '',
      })
    );
    this.loadProducts();
  }

  private loadProducts() {
    this.store
      .select(fromProductSelectors.getState)
      .pipe(
        switchMap((state) => {
          this.store.dispatch(
            loadProductPagination({
              page: state.currentPage,
              limit: state.limit,
              search: state.search,
              sortBy: state.sortBy,
              order: state.order,
              category: state.category,
            })
          );
          return of(state);
        })
      )
      .subscribe();
  }
  addToCart(productID: number, qty: number = 1) {
    const cartItems: CartItem[] = JSON.parse(
      this.cookieService.get('cartItems') || '[]'
    );
    let item = cartItems.find((item) => item.productID === productID);

    if (item) {
      item.quantity += qty;
    } else {
      cartItems.push({ productID, quantity: qty });
    }

    this.cookieService.set('cartItems', JSON.stringify(cartItems));
    this.message.success('Add to cart successfully');
  }
  showDetail(productId: number) {
    this.modalService.create({
      nzTitle: '',
      nzContent: ProductDetailComponent,
      nzWidth: 1200,
      nzFooter: null,
      nzData: {
        productID: productId,
        addToCart: this.addToCart.bind(this),
      },
    });
  }
}
