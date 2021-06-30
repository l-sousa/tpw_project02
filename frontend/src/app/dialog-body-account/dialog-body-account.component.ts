import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpErrorResponse } from "@angular/common/http";

//MODEL
import { Customer } from '../models/Customer';

@Component({
  selector: 'app-dialog-body-account',
  templateUrl: './dialog-body-account.component.html',
  styleUrls: ['./dialog-body-account.component.css']
})
export class DialogBodyAccountComponent implements OnInit {

  editAccountForm: FormGroup;
  success: boolean = false;
  submitted: boolean = false;
  error: boolean = false;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<DialogBodyAccountComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {customer: Customer}
  ) 
  { }

  ngOnInit(): void {
    this.editAccountForm = this.fb.group({
      id: ['', [Validators.required]],
      username: ['', [Validators.required]],
      old_password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(25)]],
      new_password1: ['', [Validators.required, Validators.maxLength(20)]],
      new_password2: ['', [Validators.required, Validators.maxLength(20)]]
    });
  }



}
