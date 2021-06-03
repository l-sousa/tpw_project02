import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { Brand } from 'src/app/models/Brand';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  constructor(private http: HttpClient) { }

  getBrands(): Observable<any[]> {
    const url = environment.API_BASE_URL + 'brands';
    return this.http.get<any[]>(url);
  }
}
