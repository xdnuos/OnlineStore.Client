import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { CommonModule, registerLocaleData } from '@angular/common';
import { HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';
import en from '@angular/common/locales/en';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { NZ_I18N, en_US } from 'ng-zorro-antd/i18n';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { AntdModule } from './antd.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './layouts/header/header.component';
registerLocaleData(en);

@NgModule({
  declarations: [AppComponent, HeaderComponent],
  exports: [
    HeaderComponent,
    CommonModule,
    FormsModule,
    HttpClientModule,
    HttpClientJsonpModule,
    NzIconModule,
  ],
  imports: [
    AntdModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    StoreModule.forRoot({}, {}),
    RouterModule,
    CommonModule,
    NzIconModule,
    NzToolTipModule,
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US }],
  bootstrap: [AppComponent],
})
export class AppModule {}
