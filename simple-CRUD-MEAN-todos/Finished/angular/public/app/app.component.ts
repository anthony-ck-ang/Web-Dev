import { Component } from '@angular/core';
import { Todo } from './todo';
import { TodoService } from './todo.service'; //import todo service

//'decorate' this class with a js config obj (with k,v)
// to render to html
@Component({
  selector: 'my-app',
  template: `<h1>NodeTodo</h1>
  <ul>
      <li *ngFor="let todo of todos">
        {{todo.todo}} - {{todo.isDone}}
      </li>
    </ul>`,
  providers: [ TodoService ]
})
export class AppComponent  { 

  todos: Todo[];

  //instantiate/inject this obj with todo service obj
  constructor(private todoService: TodoService) { }

  //use todo service obj to fetch the list/[] of todos from server 
  //and update the todos variable above
  getTodos(): void {
    this.todoService.getTodos().then(todos => this.todos = todos);
  }

  //on app init, invoke getTodos function
  ngOnInit(): void {
    this.getTodos();
  }
}
