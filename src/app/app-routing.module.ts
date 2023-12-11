import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartPage } from './pages/cart/cart.component';
import { HomePage } from './pages/home/home.component';

const routes: Routes = [
  { path: '', component: HomePage },
  {
    path: 'cart',
    component: CartPage,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
