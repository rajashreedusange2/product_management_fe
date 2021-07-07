import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {

  constructor(private httpService: HttpClient) { }

  getAllProductService(query) {
    const href = environment.api.getAllProduct;
    return this.httpService.get<any>(href + query, {'observe': 'response'});
  }

  addAndUpdateProductService(data) {
    const href = environment.api.addAndUpdateProduct;
    return this.httpService.post<any>(href, data, {'observe': 'response'});
  }
  deleteProductService(data) {
    const href = environment.api.deleteProductByProductId;
    return this.httpService.post<any>(href, data, {'observe': 'response'});
  }
  getProductDetailByProductid(query) {
    const href = environment.api.getProductByProductid;
    return this.httpService.get<any>(href + query, {'observe': 'response'});
  }
}

// addAndUpdateProduct
// deleteProductByProductId
// getAllProduct
// getProductDetailByProductid
