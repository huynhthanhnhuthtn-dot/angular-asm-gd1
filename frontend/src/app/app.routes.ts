import { Routes } from '@angular/router';
import { CartComponent } from './pages/cart/cart.component';
import { DetailComponent } from './pages/detail/detail.component';
import { HomeComponent } from './pages/home/home.component';
import { ProductsComponent } from './pages/products/products.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'Trang chủ' },
  { path: 'products', component: ProductsComponent, title: 'Sản phẩm' },
  { path: 'products/:id', component: DetailComponent, title: 'Chi tiết sản phẩm' },
  { path: 'cart', component: CartComponent, title: 'Giỏ hàng' },
  { path: '**', redirectTo: '' },
];
