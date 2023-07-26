import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Customers } from '../model/customers';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {

  apiURL = "http://localhost:3000/customers";

  constructor(private http: HttpClient) { }

  postCustomer(data: any) {
    console.log("Testing data here:" + data);
    return this.http.post<any>(this.apiURL, data)
      .pipe(map((res: any) => {
        return res;
      }))
  }
  getCustomer() {
    return this.http.get<any>(this.apiURL)
      .pipe(map((res: any) => {
        return res;
      }))
  }
  updateCustomer(data: any, id: number) {
    return this.http.put<any>(this.apiURL + '/' + id, data)
      .pipe(map((res: any) => {
        return res;
      }))
  }
  deleteCustomer(id: number) {
    return this.http.delete<any>(this.apiURL + '/' + id)
      .pipe(map((res: any) => {
        return res;
      }))
  }
}

