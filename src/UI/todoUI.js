import { app } from "../logic/app.js";
import { project } from "../logic/project.js";
class todoUi{
    constructor (app){
        this.app = app;
    }
    rendertodos(name){
        return this.app.findproject(name).todos.map(todo => {
            return todo
        });
    }
    formtodo(projectName, title, description, duedate, priority){
         this.app.createtodo(projectName, title, description, duedate, priority);
          console.log(this.rendertodos(projectName));
          this.app.saveproject();
    };
    tododetails( projectName){
        return this.rendertodos(projectName).map(todo => {
            return todo;
        });
    }
    deletetodo(projectName, todoid){
        this.app.deletetodo(projectName, todoid);
        this.app.saveproject();
    }
    completetodo(projectName, title){
        this.app.setTodoComplete(projectName, title);
        this.app.saveproject();
    }
}
export {todoUi};