import { Component, Input, OnInit } from '@angular/core';
import { Category } from '../models/Category';
import { Product } from '../models/Product';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common'; 
import { CategoryService } from '../services/category/category.service';

@Component({
  selector: 'app-category-products-list',
  templateUrl: './category-products-list.component.html',
  styleUrls: ['./category-products-list.component.css']
})
export class CategoryProductsListComponent implements OnInit {

  @Input() category: Category;
  products: Product[];

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private categoryService: CategoryService
  ) { }

  ngOnInit(): void {
    this.getBrand();
  }

  getBrand(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.categoryService.getCategoryId(id).subscribe(category => this.category = category);
    this.getCategoryProducts();
  }

  getCategoryProducts(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.categoryService.getCategoryProducts(id).subscribe(products => this.products = products);
  }

  goBack(): void {
		this.location.back();
  }

}
