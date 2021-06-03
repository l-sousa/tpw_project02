import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {SignupService} from "../services/signup/signup.service";
import {HttpErrorResponse} from "@angular/common/http";

import {User} from "../models/User";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  ngOnInit(): void {
  }

  signupForm: FormGroup;
  submitted = false;
  error = false;
  customer: "customer" | undefined;
  manager: "manager" | undefined;

  constructor(private service: SignupService, private form_builder: FormBuilder) {
    this.signupForm = form_builder.group({
        username: ['', Validators.required, Validators.minLength(4)],
        password: ['', [Validators.required, Validators.minLength(5)]],
        user_type: ['', [Validators.required]],

      }
    );
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.signupForm.invalid) {

      return;
    }
    this.service.signup(this.signupForm.value)
      .subscribe(res => {
          alert(res);
        },
        (err: HttpErrorResponse) => {
          this.error = true;
        });
  }

  get formControls(): any {
    return this.signupForm.controls;
  }


  onItemChange(value: any){
    console.log(" Value is : ", value );
  }
}
