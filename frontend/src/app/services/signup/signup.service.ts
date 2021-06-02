import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Customer} from "../../models/Customer";
import {Manager} from "../../models/Manager";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  constructor(private http: HttpClient) {
  }

  signup(user: Customer | Manager): Observable<any> {
    const url = environment.API_BASE_URL + 'signup';
    return this.http.post(url, user, environment.HTTP_OPTIONS);
  }
}
