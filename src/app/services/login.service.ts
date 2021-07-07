import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpService: HttpClient) { }
  LoginService(user) {
    return this.httpService.post<any>(environment.api.loginAPI,user,{'observe':'response'})
  }
}
