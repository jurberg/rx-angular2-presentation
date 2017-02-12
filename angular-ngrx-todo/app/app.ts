//our root app component
import {Component, ChangeDetectionStrategy} from 'angular2/core'
import {Store} from '@ngrx/store'
import {LogMonitor} from '@ngrx/devtools'

import * as TodoActions from './todos';

import {NewTodoInput} from './components/newTodo';
import {TodoList} from './components/todoList'

@Component({
  selector: 'todo-app',
  providers: [],
  template: `
    <div>
      <log-monitor></log-monitor>
      <h2>Todos</h2>
      <new-todo-input (create)="addTodo($event)"></new-todo-input>
      =========
      <todo-list
        [todos]="todos | async"
        (complete)="completeTodo($event)"
        (delete)="deleteTodo($event)"
      ></todo-list>
      =========
      <div>
        <button (click)="show('ALL')">All</button>
        <button (click)="show('PENDING')">Pending</button>
        <button (click)="show('COMPLETE')">Complete</button>
      </div>
    </div>
  `,
  directives: [LogMonitor, NewTodoInput, TodoList],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class App {
  constructor(private store:Store) {
    this.todos = store.select('todos')
      .combineLatest(store.select('visibilityFilter'), (todos, visibilityFilter) => {
        return todos.filter(visibilityFilter)
      });
  }
  addTodo(newTodo){
    this.store.dispatch({
      type: TodoActions.ADD_TODO,
      payload: newTodo
    });
  }
  completeTodo(todo){
    this.store.dispatch({
      type: TodoActions.COMPLETE_TODO,
      payload: todo
    });
  }
  deleteTodo(todo){
    this.store.dispatch({
      type: TodoActions.DELETE_TODO,
      payload: todo
    });
  }
  show(filter){
    this.store.dispatch({
      type: TodoActions[filter]
    });
  }
}
