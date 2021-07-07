import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  constructor(private httpService: HttpClient) { }
  SignupService(data){
    return this.httpService.post<any>(environment.api.signupAPI,data, { 'observe': 'response' })
  }
}
