import { Component, Input, OnInit } from '@angular/core';
import  { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";

import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common'; 

import { CheckAuthUserService } from '../services/check-auth-user/check-auth-user.service';
import { Emitters } from '../emitters/emitters';
import { CategoryService } from '../services/category/category.service';
import { BrandService } from '../services/brand/brand.service';
import { ProductService } from '../services/product/product.service';


@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent implements OnInit {

  authenticated: boolean | undefined;
  submitted = false;
  error = false;
  categories;
  brands;
  newProductForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private checkAuthUserService: CheckAuthUserService,
    private categoryService: CategoryService,
    private brandService: BrandService,
    private productService: ProductService,
    public fb: FormBuilder,
  ) 
  {
    /* Makes it only available if the user is logged in
    if (!checkAuthUserService.check()) {
      this.location.replaceState('/'); // clears browser history so they can't navigate with back button
      this.router.navigate(['']);
    }
    */
    this.newProductForm = this.fb.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      category: ['', [Validators.required]],
      brand: ['', [Validators.required]],
      quantity: ['', [Validators.required,Validators.pattern(/\d/), Validators.min(0)]],
      price: ['', [Validators.required,Validators.pattern(/\d/), Validators.min(0)]],
      image: []

    })

  }

  

  ngOnInit(): void {
    this.checkAuthUserService.check()
    this.categoryService.getCategories().subscribe(res => (this.categories = res));
    this.brandService.getBrands().subscribe(res => (this.brands = res));

    Emitters.authEmitter.subscribe(
      (auth: boolean) => {
        this.authenticated = auth;
      }
    );
  }

  

  goBack(): void {
		this.location.back();
  }

  onSubmit(): void {
    this.submitted = true;
    console.log(this.newProductForm.value);
    // @ts-ignore
    if (this.newProductForm.invalid) {
      console.log("invalido");
      return;
    }
    // @ts-ignore
    this.productService.createProduct(this.newProductForm.value)
      .subscribe((res: any) => {
          console.log(res);
          this.router.navigate(['/']);
        },
        (err: HttpErrorResponse) => {
          this.error = true;
        });
    
    console.log('YEET');
  }

}
