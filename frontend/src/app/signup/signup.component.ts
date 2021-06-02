import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {SignupService} from "../services/signup/signup.service";
import {HttpErrorResponse} from "@angular/common/http";

interface User {
  type: string;
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  ngOnInit(): void {
  }

  userControl = new FormControl('', Validators.required);
  selectFormControl = new FormControl('', Validators.required);
  users: User[] = [
    {type: 'Cliente'},
    {type: 'Gestor'},

  ];

  signupForm: FormGroup;
  loading = false;
  submitted = false;
  error = false;

  constructor(private service: SignupService, form_builder: FormBuilder) {
    this.signupForm = form_builder.group({
        username: ['', Validators.required, Validators.minLength(4)],
        password: ['', [Validators.required, Validators.minLength(5)]],
        is_customer: ['', [Validators.required]],
        is_manager: ['', [Validators.required]],
      }
    );
  }


  onSubmit(): void {
    this.submitted = true;
    if (this.signupForm.invalid) {
      return;
    }
    this.loading = true;
    this.service.signup(this.signupForm.value)
      .subscribe(res => {
          alert(res);
        },
        (err: HttpErrorResponse) => {
          this.error = true;
          this.loading = false;
        });
  }

  get formControls(): any {
    return this.signupForm.controls;
  }
}
