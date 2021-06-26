import { Component, OnInit, Inject } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common'; 
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogBodyComponent } from '../dialog-body/dialog-body.component';
import { Product } from '../models/Product';
import { ProductService } from '../services/product/product.service';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit {

  success: boolean = false; 
  products: Product[] = [];
  product? 

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private productService: ProductService,
    private dialog: MatDialog
  ) 
  { }

  ngOnInit(): void {
    this.getProducts();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogBodyComponent, {
      data: {product: this.product}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      console.log('The dialog was closed');
      this.success = true;
    });
  }

  getProducts(): void {
    this.productService.getProducts().subscribe(products => this.products = products);
  }

  goBack(): void {
		this.location.back();
  }

}
