import {Component, Input, OnInit} from '@angular/core';
import {Emitters} from '../emitters/emitters';
import {Category} from '../models/Category';
import {Product} from '../models/Product';
import {ProductService} from '../services/product/product.service';

let category = <any>{};

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products: Product[];

  constructor(private productService: ProductService) {
  }

  ngOnInit(): void {
    this.productService.getProducts().subscribe(products => this.products = products);

  }

  addToShoppingCart(product: Product) {
    var key = "cart_item/" + product.id;
    console.log();
    Emitters.newCartItemEmitter.emit(JSON.stringify(product));

  }

}
