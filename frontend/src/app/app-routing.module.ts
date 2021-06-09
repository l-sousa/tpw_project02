import {LoginComponent} from './login/login.component';
import { MainContentComponent } from './main-content/main-content.component';
import {SignupComponent} from './signup/signup.component';
import { ProductDetailsComponent } from './product-details/product-details.component';


import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import { CheckoutComponent } from './checkout/checkout.component';

const routes: Routes = [
  {path: '', component: MainContentComponent, pathMatch: "full"},
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'checkout', component: CheckoutComponent},
  { path: 'product/:id', component: ProductDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
