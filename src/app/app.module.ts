import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCommonModule, MATERIAL_SANITY_CHECKS, MatNativeDateModule, _MatOptionBase } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ApiHeaderInterceptor } from './core/interceptors/api-header/api-header.interceptor';
import { ApiPerfixInterceptor } from './core/interceptors/api-prefix/api-perfix.interceptor';
import { DownloadNotificationComponent } from './feature/download-notification/download-notification.component';
import { NotificationComponent } from './feature/notification/notification.component';
import { LayoutComponent } from './layout/layout.component';
import { SharedModule } from './shared/shared/shared.module';
import { ErrorInterceptor } from './core/interceptors/error/error.interceptor';
import { ToastrModule } from 'ngx-toastr';
import { FilterPipe } from './shared/shared/pipe/filter-options';
import { PdfComponent } from './feature/pdf/pdf.component';




@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    NotificationComponent,
    DownloadNotificationComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    MatDialogModule,
    BrowserAnimationsModule,
    MatNativeDateModule,
    MatCommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    PdfComponent,
    ToastrModule.forRoot(), // ToastrModule added
  ],
  providers: [ 
  {
    provide: MATERIAL_SANITY_CHECKS,
    useValue: false
  },
  {
    provide:HTTP_INTERCEPTORS ,
    useClass:ApiHeaderInterceptor ,
    multi : true
  },
  {
    provide:HTTP_INTERCEPTORS ,
    useClass: ApiPerfixInterceptor,
    multi : true
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true
  },
  FilterPipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
