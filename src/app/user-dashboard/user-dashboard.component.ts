import { Component, OnInit } from '@angular/core';
import {ProductServiceService} from '../services/product-service/product-service.service';
import { FormGroup, FormControl, Validators, FormGroupDirective } from '@angular/forms';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {
  products = [];
  userid = '';
  product_id;
  ownerForm: FormGroup;
  productAvailable;
  displayedColumns: string[] = ['product_name', 'sku_number', 'product_description', 'product_price', 'stock_level'];
  name;
  sku_number;
  product_name;
  product_description;
  product_price;
  stock_level;

  constructor(private ProductServiceService: ProductServiceService) { }

  ngOnInit() {
    this.ownerForm = new FormGroup({
      product_name: new FormControl(''),
      sku_number: new FormControl(''),
      product_description: new FormControl(''),
      product_price: new FormControl(''),
      stock_level: new FormControl(''),
    });
    this.userid = localStorage.getItem('userid');
    this.getAllProduct()
  }

  public createOwner = (ownerFormValue, formDirective: FormGroupDirective) => {
    if (this.ownerForm.valid) {
      this.addProduct(ownerFormValue);
      formDirective.resetForm();
      this.ownerForm.reset();
    }
  }

  addProduct(ownerFormValue) {
    let product = {
      product_name: ownerFormValue.product_name,
      userid: this.userid,
      sku_number: ownerFormValue.sku_number,
      product_description: ownerFormValue.product_description,
      product_price: ownerFormValue.product_price,
      stock_level: ownerFormValue.stock_level
    };

    this.ProductServiceService.addAndUpdateProductService(product)
      .subscribe(
        (_response) => {
          if (_response.status === 200) {
            alert('Product added');
            this.getAllProduct()
          }
        },
        (_error) => {
          alert('Product added');
        });
  }

  deleteProduct(product_id){
    let products = {
      product_id: product_id
    };

    this.ProductServiceService.deleteProductService(products)
    .subscribe(
      (_response) => {
        if (_response.status === 200) {
          alert('product deleted');
          this.getAllProduct()
        }
      },
      (_error) => {
        alert('product deleted');
      });
  }

  getAllProduct() {
    this.userid = localStorage.getItem('userid');
    let queryParam = `?userid=${this.userid}`
    this.ProductServiceService.getAllProductService(queryParam)
      .subscribe(
        (_response: any) => {
          if (_response.status === 200) {
            this.productAvailable = true;
            this.products = _response.body;
            console.log(_response.body)
          }
        },
        (_error) => {
          this.productAvailable = false;
        });
  }
  getProductDetailByProductid(product_id) {
    let queryParam = `?product_id=${product_id}`
    this.ProductServiceService.getProductDetailByProductid(queryParam)
      .subscribe(
        (_response: any) => {
          if (_response.status === 200) {
            this.name = _response.body.name;
            this.sku_number = _response.body.sku_number;
            this.product_name = _response.body.product_name;
            this.product_description = _response.body.product_description;
            this.product_price = _response.body.product_price;
            this.stock_level = _response.body.stock_level;

            this.ownerForm.controls['name'].setValue(this.name);
            this.ownerForm.controls['sku_number'].setValue(this.sku_number);
            this.ownerForm.controls['product_name'].setValue(this.product_name);
            this.ownerForm.controls['product_description'].setValue(this.product_description);
            this.ownerForm.controls['product_price'].setValue(this.product_price);
            this.ownerForm.controls['stock_level'].setValue(this.stock_level);
            console.log(_response.body)
          }
        },
        (_error) => {
          console.log(_error)
        });
  }


}
