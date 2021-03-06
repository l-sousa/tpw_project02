import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class LoginService {


  constructor(private http: HttpClient) {
  }

  login(data: {}): Observable<any> {
    const url = environment.API_BASE_URL + 'login';

    return this.http.post(url, data, {withCredentials: true})
  }
}
