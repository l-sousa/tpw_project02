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
import { Category } from '../models/Category';
import { Brand } from '../models/Brand';

const urlRegex = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent implements OnInit {

  authenticated: boolean | undefined;
  submitted: boolean = false;
  error: boolean = false;
  success: boolean = false;
  categories: Category[];
  brands: Brand[];
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
      price: ['', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/), Validators.min(0)]],
      image: ['', [ Validators.required, Validators.pattern(urlRegex)]]

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
    this.newProductForm.value.category = [this.newProductForm.value.category]
    // @ts-ignore
    if (this.newProductForm.invalid) {
      console.log("invalido");
      return;
    }
    this.success = true;
    // @ts-ignore
    this.productService.createProduct(this.newProductForm.value)
      .subscribe((res: any) => {
          this.success = true;
          this.router.navigate([this.router.url]);
        },
        (err: HttpErrorResponse) => {
          this.error = true;
        });
    
  }

}
