import {Component} from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {Observable} from 'rxjs';
import {map, shareReplay} from 'rxjs/operators';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Emitters} from '../emitters/emitters';
import {Router} from '@angular/router';
import {LogoutService} from '../services/logout/logout.service';
import {CheckAuthUserService} from '../services/check-auth-user/check-auth-user.service';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.css']
})
export class MainContentComponent {
  message = '';

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  authenticated: boolean | undefined;
  error: boolean | undefined;


  constructor(
    private breakpointObserver: BreakpointObserver,
    private http: HttpClient,
    private logoutService: LogoutService,
    private checkAuthUserService: CheckAuthUserService,
    private router: Router) {
  }

  ngOnInit(): void {

    this.checkAuthUserService.check()

    Emitters.authEmitter.subscribe(
      (auth: boolean) => {
        this.authenticated = auth;
      }
    );
  }


  deleteCookie(name: string) {
    console.log("deleting cookies");
    const date = new Date();

    // Set it expire in -1 days
    date.setTime(date.getTime() + (-1 * 24 * 60 * 60 * 1000));

    // Set it
    document.cookie = name + "=; expires=" + date.toUTCString() + "; path=/";
  }

  logout(): void {
    this.logoutService.logout()
      .subscribe((res: any) => {
          this.deleteCookie('jwt');
          this.authenticated = false
          this.router.navigate(['']);
        },
        (err: HttpErrorResponse) => {
          this.error = true;
        });
  }
}
