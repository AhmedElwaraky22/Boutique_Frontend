import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'environments/environment';
import { AuthenticationService } from 'app/auth/service';
import { tap } from 'rxjs/operators';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  /**
   *
   * @param {AuthenticationService} _authenticationService
   */
  constructor(private _authenticationService: AuthenticationService , private router:Router) {}

  /**
   * Add auth header with jwt if user is logged in and request is to api url
   * @param request
   * @param next
   */
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const currentUser = this._authenticationService.currentUserValue;
    const isLoggedIn = currentUser && currentUser.token;
    const isApiUrl = request.url.startsWith(environment.apiUrl);
    if (isLoggedIn && isApiUrl) {
        request =request.clone({
          headers: new HttpHeaders({ 
              'Accept': 'application/json',
              'Authorization': `Bearer ${currentUser.token}`
            },)
        });
    }

    return next.handle(request)
    .pipe(
      tap(() => {} ,
        (err:any)=>{
          if (err instanceof HttpErrorResponse){
                if(err.status !== 401 && err.status !==500){
                  return;
                }
                  this._authenticationService.logout();
                  this.router.navigate(['/auth//pages/authentication/login-v2']);
              }
        }
      )
    )
  }
}
