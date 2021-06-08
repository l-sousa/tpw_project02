import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { BrandsComponent } from './brands/brands.component';
import { BrandProductsListComponent } from './brand-products-list/brand-products-list.component';

const routes: Routes = [
  { path: 'brands', component: BrandsComponent }, 
  { path: 'brand/:id/products', component: BrandProductsListComponent }, 
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
