import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { CategoriesComponent } from './categories/categories.component';
import { CategoryProductsListComponent } from './category-products-list/category-products-list.component';

const routes: Routes = [
  { path: 'categories', component: CategoriesComponent }, 
  { path: 'category/:id/products', component: CategoryProductsListComponent }, 
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