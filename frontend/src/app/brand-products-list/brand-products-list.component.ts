import { Component, Input, OnInit } from '@angular/core';
import { Brand } from '../models/Brand';
import { Product } from '../models/Product';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common'; 
import { BrandService } from '../services/brand/brand.service';

@Component({
  selector: 'app-brand-products-list',
  templateUrl: './brand-products-list.component.html',
  styleUrls: ['./brand-products-list.component.css']
})
export class BrandProductsListComponent implements OnInit {

  @Input() brand: Brand;
  products: Product[];

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private brandService: BrandService
  ) { }

  ngOnInit(): void {
    this.getBrand();
  }

  getBrand(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.brandService.getBrandId(id).subscribe(brand => this.brand = brand);
    this.getBrandProducts();
  }

  getBrandProducts(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.brandService.getBrandProducts(id).subscribe(products => this.products = products);
  }

  goBack(): void {
		this.location.back();
  }


}
