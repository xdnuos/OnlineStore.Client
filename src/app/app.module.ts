import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { CommonModule, registerLocaleData } from '@angular/common';
import { HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';
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
import { ProductPaginationComponent } from './components/product/product-pagination.component';
import { ProductDetailComponent } from './components/productDetail/product-detail.component';
import { HeaderComponent } from './layouts/header/header.component';
import { CartPage } from './pages/cart/cart.component';
import { HomePage } from './pages/home/home.component';
import { CategoriesEffect } from './store/categories/Categories.effect';
import { CategoriesReducer } from './store/categories/Categories.reducer';
import { ProductEffect } from './store/product/Product.effect';
import { ProductReducer } from './store/product/Product.reducer';
registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ProductPaginationComponent,
    ProductDetailComponent,
    CartPage,
    HomePage,
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
    }),
    RouterModule,
    CommonModule,
    NzIconModule,
    NzToolTipModule,
    EffectsModule.forRoot([ProductEffect, CategoriesEffect]),
  ],
  exports: [
    HeaderComponent,
    CommonModule,
    FormsModule,
    HttpClientModule,
    HttpClientJsonpModule,
    NzIconModule,
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US }],
  bootstrap: [AppComponent],
})
export class AppModule {}
