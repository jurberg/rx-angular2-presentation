import {bootstrap} from 'angular2/platform/browser';
import {Component} from 'angular2/core';
import {Observable, Subject} from 'rxjs/Rx';

@Component({
  selector: 'main-app',
  template: `
      Clicked {{model$|async}} times
      <button (click)="increment()">+</button>
      <button (click)="decrement()">-</button>
  `
})
export class MainComponent {

  inc$ = new Subject()
  dec$ = new Subject()
  actions$ = Observable.merge(this.inc$, this.dec$)
  model$ = this.actions$.startWith(0).scan((x, y) => x + y)

  increment() { this.inc$.next(1); }
  decrement() { this.dec$.next(-1); }

}

bootstrap(MainComponent);
