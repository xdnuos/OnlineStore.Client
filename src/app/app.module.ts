import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { CommonModule, registerLocaleData } from '@angular/common';
import {
  HTTP_INTERCEPTORS,
  HttpClientJsonpModule,
  HttpClientModule,
} from '@angular/common/http';
import en from '@angular/common/locales/en';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { NZ_I18N, en_US } from 'ng-zorro-antd/i18n';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { AntdModule } from './antd.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { OrderComponent } from './components/orders/order/order.component';
import { OrderItemComponent } from './components/orders/orderItem/orderItem.component';
import { ProductPaginationComponent } from './components/product/product-pagination.component';
import { ProductDetailComponent } from './components/productDetail/product-detail.component';
import { ChangePasswordComponent } from './components/user/changePassword/change-password.component';
import { UserInfoComponent } from './components/user/infomation/user.component';
import { HeaderComponent } from './layouts/header/header.component';
import { AuthPage } from './pages/auth/auth.component';
import { CartPage } from './pages/cart/cart.component';
import { HomePage } from './pages/home/home.component';
import { OrdersPage } from './pages/orders/orders.component';
import { UserPageComponent } from './pages/user/user.component';
import { JWTTokenService } from './services/jwt-token.service';
import { LocalStorageService } from './services/localStrorage.service';
import { AuthEffect } from './store/auth/Auth.effect';
import { AuthReducer } from './store/auth/Auth.reducer';
import { CategoriesEffect } from './store/categories/Categories.effect';
import { CategoriesReducer } from './store/categories/Categories.reducer';
import { OrderEffect } from './store/orders/Order.effect';
import { OrderReducer } from './store/orders/Order.reducer';
import { ProductEffect } from './store/product/Product.effect';
import { ProductReducer } from './store/product/Product.reducer';
import { UniversalAppInterceptor } from './utils/universalAppInterceptor ';
registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ProductPaginationComponent,
    ProductDetailComponent,
    RegisterComponent,
    LoginComponent,
    OrderItemComponent,
    OrderComponent,
    UserInfoComponent,
    CartPage,
    HomePage,
    AuthPage,
    OrdersPage,
    UserPageComponent,
    ChangePasswordComponent,
  ],
  imports: [
    AntdModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    StoreModule.forRoot({
      products: ProductReducer,
      categories: CategoriesReducer,
      auth: AuthReducer,
      orders: OrderReducer,
    }),
    StoreModule.forFeature('user', AuthReducer),
    RouterModule,
    CommonModule,
    NzIconModule,
    NzToolTipModule,
    EffectsModule.forRoot([
      ProductEffect,
      CategoriesEffect,
      AuthEffect,
      OrderEffect,
    ]),
  ],
  exports: [
    HeaderComponent,
    CommonModule,
    FormsModule,
    HttpClientModule,
    HttpClientJsonpModule,
    NzIconModule,
  ],
  providers: [
    { provide: NZ_I18N, useValue: en_US },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: UniversalAppInterceptor,
      multi: true,
    },
    LocalStorageService,
    JWTTokenService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
