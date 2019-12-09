"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var todo_service_1 = require('./todo.service'); //import todo service
//'decorate' this class with a js config obj (with k,v)
// to render to html
var AppComponent = (function () {
    //instantiate/inject this obj with todo service obj
    function AppComponent(todoService) {
        this.todoService = todoService;
    }
    //use todo service obj to fetch the list/[] of todos from server 
    //and update the todos variable above
    AppComponent.prototype.getTodos = function () {
        var _this = this;
        this.todoService.getTodos().then(function (todos) { return _this.todos = todos; });
    };
    //on app init, invoke getTodos function
    AppComponent.prototype.ngOnInit = function () {
        this.getTodos();
    };
    AppComponent = __decorate([
        //import todo service
        core_1.Component({
            selector: 'my-app',
            template: "<h1>NodeTodo</h1>\n  <ul>\n      <li *ngFor=\"let todo of todos\">\n        {{todo.todo}} - {{todo.isDone}}\n      </li>\n    </ul>",
            providers: [todo_service_1.TodoService]
        }), 
        __metadata('design:paramtypes', [todo_service_1.TodoService])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map