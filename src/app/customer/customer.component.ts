import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Customers } from '../model/customers';
import { CustomersService } from '../service/customers.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {
// Customer Object to get data from Form
customerDetail!: FormGroup;
custObj: Customers = new Customers();
custData !: any;
custModel ! : Customers;
showAdd !:boolean;
showUpdate !:boolean;
today = new Date();

  constructor(private formBuilder: FormBuilder, private api: CustomersService) { }

  ngOnInit(): void {
    this.getCustomer();
    this.customerDetail = this.formBuilder.group({
      // id: [''],
      fname: [''],
      lname: [''],
      email: [''],
      gender: ['']
    })
  }
  addCustomer() {
    this.customerDetail.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }
  postCustomer() {
    this.custObj.fname = this.customerDetail.value.fname;
    this.custObj.lname = this.customerDetail.value.lname;
    this.custObj.email = this.customerDetail.value.email;
    this.custObj.gender = this.customerDetail.value.gender;
    this.api.postCustomer(this.custObj).subscribe(response => {
      this.getCustomer();
      this.customerDetail.reset();
    })
  }
  getCustomer() {
    this.api.getCustomer().subscribe(res => {
      this.custData = res;
    })
  }
  editCustomer(cust : Customers){
    this.showAdd = false;
    this.showUpdate = true;
    this.custObj.id= cust.id;
    this.customerDetail.controls['fname'].setValue(cust.fname);
    this.customerDetail.controls['lname'].setValue(cust.lname);
    this.customerDetail.controls['email'].setValue(cust.email);
    this.customerDetail.controls['gender'].setValue(cust.gender);
  }
  updateCustomer(){
    this.custObj.fname = this.customerDetail.value.fname;
    this.custObj.lname = this.customerDetail.value.lname;
    this.custObj.email = this.customerDetail.value.email;
    this.custObj.gender = this.customerDetail.value.gender;
    console.log(this.custObj);
    // var aa = this.custData.get('id');
    // let selectedOpt = this.custModel.find(opt => opt.id == value);
    this.api.updateCustomer(this.custObj,this.custObj.id).subscribe(response =>{
      this.getCustomer();
      this.customerDetail.reset();
    })
  }
  deleteCustomer(row:any){
    this.api.deleteCustomer(row.id).subscribe(response=>{
      this.getCustomer();
    })
  }
}
