import { Component, OnInit } from '@angular/core';
import  {FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common'; 

import { CheckAuthUserService } from '../services/check-auth-user/check-auth-user.service';
import { Emitters } from '../emitters/emitters';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent implements OnInit {

  authenticated: boolean | undefined;
  newProductForm: FormGroup;
  submitted = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private checkAuthUserService: CheckAuthUserService,
  ) 
  {
    /* Makes it only available if the user is logged in
    if (!checkAuthUserService.check()) {
      this.location.replaceState('/'); // clears browser history so they can't navigate with back button
      this.router.navigate(['']);
    }
    */
  }

  ngOnInit(): void {
    this.checkAuthUserService.check()

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
    
    console.log('YEET');
  }

}
