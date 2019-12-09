import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise'; //async lib

import { Todo } from './todo';

//Injectable Service object that does a task (separate from UI)
@Injectable()
export class TodoService {
  
  private headers = new Headers({'Content-Type': 'application/json'});
  private todosApiUrl = '/api/todos/test'; //get all todos from 'test' user
  
  //instantiate this service obj with Http obj
  constructor(private http: Http) { }
  
  //getTodos function on this service obj that promise to return a list of Todo
  getTodos(): Promise<Todo[]> {
    //GET url -> convert to promise -> return json res and store it as a list of Todo
    return this.http.get(this.todosApiUrl)
               .toPromise()
               .then(response => response.json() as Todo[]);
  }
}