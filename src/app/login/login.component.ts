import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators, MinLengthValidator } from '@angular/forms';
import { Router } from '@angular/router';
import {LoginService} from '../services/login.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public ownerForm: FormGroup;
  hide = true;
  showError = false;

  constructor(
    private formBuilder: FormBuilder,
    private LoginService: LoginService,
    private Router: Router
  ) { }

  ngOnInit() {
    this.ownerForm = new FormGroup({
      mobile_number: new FormControl('', [Validators.required, Validators.pattern(/^\d{10}$/), Validators.maxLength(10)]),
      password: new FormControl('', [Validators.required])
    });
  }
  public createOwner = (ownerFormValue) => {
    if (this.ownerForm.valid) {
      this.login(ownerFormValue);
    } else {
      this.showError = true;
    }

  }
  login(ownerFormValue) {
    let user: any = {
      mobile_number: ownerFormValue.mobile_number,
      password: ownerFormValue.password,
    };

    this.LoginService.LoginService(user)
      .subscribe(
        (_response) => {

          if (_response.status === 200) {
            alert('Login successfully');
            this.Router.navigate(['/user-dashboard']);
            localStorage.setItem('userid', _response.body.userid);
            localStorage.setItem('mobile_number', ownerFormValue.mobile_number);
          }
        },
        (_error) => {
           alert('Please check username or password');

        }
      );
    console.log('data', user);
  }

}
