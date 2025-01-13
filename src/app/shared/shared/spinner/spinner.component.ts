import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoaderState, SpinnerService } from 'src/app/core/services/spinner/spinner.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit, OnDestroy{

  display: Boolean = false;
  private _loaderStateChnaged!: Subscription;

  constructor(private _service: SpinnerService) { }

  ngOnInit(): void {
    this._loaderStateChnaged = this._service.loaderState
    .subscribe((_state: LoaderState) => {
      this.display = _state.show
    })
  }
  ngOnDestroy(){
    this._loaderStateChnaged.unsubscribe();
  }

}
