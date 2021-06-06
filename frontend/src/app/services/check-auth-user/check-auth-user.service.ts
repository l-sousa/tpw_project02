import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Emitters} from 'src/app/emitters/emitters';
import {environment} from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CheckAuthUserService {

  constructor(private http: HttpClient) {
  }

  getCookie(name: string): string {
    const nameLenPlus = (name.length + 1);
    // @ts-ignore
    return document.cookie.split(';').map(c => c.trim())
      .filter(cookie => {
        return cookie.substring(0, nameLenPlus) === `${name}=`;
      })
      .map(cookie => {
        return decodeURIComponent(cookie.substring(nameLenPlus));
      })[0] || null;
  }

  // @ts-ignore
  check(): Observable<any> {
    console.log("CHECK AUTH SERVICE")
    const url = environment.API_BASE_URL + 'user';
    this.http.get(url, {
      withCredentials: true, headers: new HttpHeaders({

        'jwt': ((this.getCookie('jwt')) ? this.getCookie('jwt').toString() : this.getCookie('jwt')),
      }),
    }).subscribe(
      (res: any) => {
        Emitters.authEmitter.emit(true);
      },
      err => {
        Emitters.authEmitter.emit(false);
      }
    );
  }

}
