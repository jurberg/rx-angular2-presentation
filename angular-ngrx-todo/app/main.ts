import {bootstrap} from 'angular2/platform/browser';
import {provide} from 'angular2/core'
import {App} from './app';
import {createStore, combineReducers, Store} from '@ngrx/store'
import * as devtools from '@ngrx/devtools'
import {todos, visibilityFilter} from './todos';
import 'rxjs/Rx'

let enhanced = devtools.instrument()(createStore);

bootstrap(App, [
  provide(Store, {useValue: enhanced(combineReducers({todos, visibilityFilter})) })
])
.catch(err => console.error(err));
