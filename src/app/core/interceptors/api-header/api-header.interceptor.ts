import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ApiHeaderInterceptor implements HttpInterceptor {
  constructor() { }
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    const token = localStorage.getItem('token');
    const tenantId = localStorage.getItem('tenantId')
    if (token) {
      request = request.clone({
        headers: request.headers.set('X-ASCENT-AUTHTOKEN', token)
      })
    }
    if (tenantId) {
      request = request.clone({
        headers: request.headers.set('tenantId', tenantId)
      })
    }
    return next.handle(request);
  }

}