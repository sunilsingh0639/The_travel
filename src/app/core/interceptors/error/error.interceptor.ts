import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, finalize, Observable, tap, throwError } from 'rxjs';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { SpinnerService } from '../../services/spinner/spinner.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  constructor(
    private loader: SpinnerService,
    private _router: Router ,
    private _snackbar: MatSnackBar,
    private _toast: ToastrService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.loader.show();
    return next.handle(request)
      .pipe(
        finalize(() => {
          this.loader.hide();
        }),
        tap(e => {
          if (request.method == "POST" || request.method == "PUT")
            if (e instanceof HttpResponse && e.status == 200) {
              //this._snackbar.open('Saved successfully.', 'Ok', { duration: 5000, panelClass: 'successSnack' });
            }
        }),
        catchError((error: any) => {
          let errorMsg = '';
          if (error && error.error && error.error.length > 0) {
            error.error.forEach((element: any) => {
              this._toast.error(element.message,'Error!');
              // this._snackbar.open(element.message , element.property, {
              //   horizontalPosition: this.horizontalPosition,
              //   verticalPosition: this.verticalPosition,
              //   duration: 5000,
              // });
            });
           
//            errorMsg = `Error: ${error.error.message}`;
          } else {
            if(error.status == 0){
              this._toast.error('Please check your internet connection. Could not able to connect server.','Error!');
            } else if(error.status == 500){
              this._toast.error(error.message,'Error!');
            } 
            else if(error.status == 401){
              this._toast.error('Session Expired','Error!');
              this._router.navigate(['/']);
            } else{
              this._toast.error(error.message,'Error!');
              errorMsg = `Error Code: ${error.status} , Message: ${error.message}`;  
            }
          }
          return throwError(errorMsg);
        })
      )
  }


//   intercept(
//     request: HttpRequest<unknown>,
//     next: HttpHandler
//   ): Observable<HttpEvent<unknown>> {
//     return next
//       .handle(request)
// //      .pipe(catchError((error) => this.customErrorHandler(error)));
//   }

  /**
   * customErrorHandler
   */
  // private customErrorHandler( res: HttpErrorResponse): Observable<HttpEvent<any>> {
  //   this._loader.hide();
  //   this.messageService.clear();
  //   if (res.status === 404) {
  //     this.messageService.add({
  //       severity: 'error',
  //       summary: 'Error',
  //       detail: res.error.message,
  //     });
  //   } else if (res.status === 401) {
  //     this.messageService.add({
  //       severity: 'error',
  //       summary: 'Error',
  //       detail: res.error.message ? res.error.message : 'Session Expired. Please login again'
  //     });
  //     localStorage.removeItem('token');
  //     localStorage.removeItem('userID');
  //     this._router.navigate(['/login']);
  //   } else if (res.status === 500) {
  //     this.messageService.add({
  //       severity: 'error',
  //       summary: 'Error',
  //       detail: res.error.message
  //     });
  //   } else {
  //     this.messageService.add({
  //       severity: 'error',
  //       summary: 'Error',
  //       detail: res.error.message
  //     });
  //   }
  //   throw res;
  // }
}