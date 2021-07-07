import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators, MinLengthValidator } from '@angular/forms';
import { Router } from '@angular/router';
import {SignupService} from '../services/signup/signup.service'
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  public ownerForm: FormGroup;
  passwordHide = true;
  confirmPasswordHide = true;
  constructor(
    private formBuilder: FormBuilder,
    private SignupService: SignupService,
    private Router: Router
  ) { }

  ngOnInit() {
    this.ownerForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.pattern(/[A-Za-z]/)]),
      mobile_number: new FormControl('', [Validators.required, Validators.pattern(/^\d{10}$/), Validators.maxLength(10)]),
      // email_address : new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.pattern(/\d/), Validators.pattern(/[A-Z]/), Validators.pattern(/[a-z]/)]),
      confirmpassword: new FormControl(''),

    })
  }
  public createOwner = (ownerFormValue) => {
    if (this.ownerForm.valid) {
      this.signupadmin(ownerFormValue);
    }

  }
  signupadmin(ownerFormValue) {
    let user: any = {
      name: ownerFormValue.name,
      mobile_number: ownerFormValue.mobile_number,
      //email_address:ownerFormValue.email_address,
      password: ownerFormValue.password,
      confirmpassword: ownerFormValue.password,
    };

    this.SignupService.SignupService(user)
      .subscribe(
        (_response) => {
          if ((_response.status === 200) && (_response.body.msg == 'mobile alreday exist')) {
            alert("Mobile already exists")
          } else if (_response.status === 200) {
            alert("Successful")
            this.Router.navigate(['./home-page']);
          }

        },
        (_error) => {
          alert('invalid username or password');
        }
      );
    console.log('data', user);
  }

}
