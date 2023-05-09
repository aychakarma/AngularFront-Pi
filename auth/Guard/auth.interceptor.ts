import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, catchError, throwError } from "rxjs";
import { UserAuthService } from "src/app/service/user-auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private userAuthService: UserAuthService,
        private router:Router) {}
    
      intercept(
        req: HttpRequest<any>,
        next: HttpHandler
      ): Observable<HttpEvent<any>> {
        if (req.headers.get('No-Auth') === 'True') {
          return next.handle(req.clone());
        }
    
        const token = this.userAuthService.getToken();
    
        req = this.addToken(req, token);
    
        return next.handle(req).pipe(
            catchError(
                (err:HttpErrorResponse) => {
                    console.log(err.status);
                    if(err.status === 401) {
                        this.router.navigate(['/login']);
                    } else if(err.status === 403) {
                        this.router.navigate(['/forbidden']);
                    }
                    return throwError("Some thing is wrong");
                }
            )
        );
      }
    
    
      private addToken(request:HttpRequest<any>, token:string) {
        let headers=request.headers.set("Authorization", `Bearer ${token}`)
        headers.set("Content-Type","application/json")
          return request.clone(
              {
                headers:headers

            }
          );
      }
    
}