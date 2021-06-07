import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router'; 

import { ProductsComponent } from './products/products.component';
import { ProductDetailsComponent } from './product-details/product-details.component';


const routes: Routes = [
  { path: 'products', component: ProductsComponent }, 
  { path: 'product/:id', component: ProductDetailsComponent }, 
];


@NgModule({
  declarations: [],
  exports: [
    RouterModule
  ], 
  imports: [
    CommonModule,
    RouterModule.forRoot(routes), 
  ]
})
export class AppRoutingModule { }
