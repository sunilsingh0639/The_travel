import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { SpinnerService } from './core/services/spinner/spinner.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'tax-portal';

}
