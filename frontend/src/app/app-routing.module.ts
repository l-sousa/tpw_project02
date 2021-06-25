import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { MainContentComponent } from './main-content/main-content.component';
import { SignupComponent } from './signup/signup.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { BrandProductsListComponent } from './brand-products-list/brand-products-list.component';
import { CategoryProductsListComponent } from './category-products-list/category-products-list.component';

import { CheckoutComponent } from './checkout/checkout.component';
import { NewProductComponent } from './new-product/new-product.component';

const routes: Routes = [
  {path: '', component: MainContentComponent, pathMatch: "full"},
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'checkout', component: CheckoutComponent},
  { path: 'product/:id', component: ProductDetailsComponent },
  { path: 'brand/:id/products', component: BrandProductsListComponent }, 
  { path: 'category/:id/products', component: CategoryProductsListComponent }, 
  { path: 'admin/addproduct', component: NewProductComponent }, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
