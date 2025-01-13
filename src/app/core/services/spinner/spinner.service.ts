import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

export interface LoaderState {
  show: boolean
}
@Injectable({
  providedIn: 'root'
})
export class SpinnerService {
  private loaderSubject = new Subject<LoaderState>();
  loaderState = this.loaderSubject.asObservable();

  constructor() { }
  show(){
    this.loaderSubject.next(<LoaderState>{show: true})
  }
  hide(){
    this.loaderSubject.next(<LoaderState>{show: false})
  }
}