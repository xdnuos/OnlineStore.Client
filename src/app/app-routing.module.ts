import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthPage } from './pages/auth/auth.component';
import { CartPage } from './pages/cart/cart.component';
import { HomePage } from './pages/home/home.component';
import { OrdersPage } from './pages/orders/orders.component';
import { UserPageComponent } from './pages/user/user.component';

const routes: Routes = [
  { path: '', component: HomePage },
  {
    path: 'cart',
    component: CartPage,
  },
  {
    path: 'login',
    component: AuthPage,
  },
  {
    path: 'register',
    component: AuthPage,
  },
  {
    path: 'orders',
    component: OrdersPage,
  },
  {
    path: 'profile',
    component: UserPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
