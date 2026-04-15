import { app } from "../logic/app.js";
import { todo } from "../logic/factory.js";
import { project } from "../logic/project.js";
import { projectUi } from "./projectUI.js";
class todoUi{
    constructor (app){
        this.app = app;
    }
    rendertodos(name){
        return this.app.findproject(name).todos.map(todo => {
            return todo
        });
    }
 rendermaincontent(projectname, todos){
        const todolist = document.querySelector(".todo-list");
        todolist.innerHTML = "";
        if (todos.length === 0) {
        const message = document.createElement("p");
        message.textContent = "No tasks found for this project. Enjoy your free time!";
        message.classList.add("empty-state-message");
        todolist.appendChild(message);
        return; 
    }

        todos.forEach(t => {
            const todoitem = document.createElement("li");
            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            const todoinfocont = document.createElement("div");
            const todoinf_cont = document.createElement("div");
            const todobtncont = document.createElement("div");
            const todoinf = document.createElement("div");
            const todotitle = document.createElement("p");
            const todoinfo = document.createElement("div");
            const duedate  = document.createElement("p");
            const priority = document.createElement("p");
            const deltodo = document.createElement("button");
            const edittodo = document.createElement("button");
            const extendedtodo = document.createElement("div");
            const extendtodobtn = document.createElement("button");
            const desccont = document.createElement("div");
            const desclabel = document.createElement("p");
            const desc = document.createElement("p");
            const checklistcont = document.createElement("div");
            const checklistlabel = document.createElement("p");
            const notecont = document.createElement("div");
            const notelabel = document.createElement("p");
            const notes = document.createElement("p"); 

            
            
            if(t.complete){
    todotitle.classList.add("disabletitle");
    duedate.classList.add("disableduedate");
}

            todolist.appendChild(todoitem);
            todoitem.appendChild(checkbox);
            todoitem.appendChild(todoinf);
            todoinf_cont.appendChild(todotitle);
            todoinf_cont.appendChild(todoinfo);
            todoinfo.appendChild(duedate);
            todoinfo.appendChild(priority);
            todobtncont.appendChild(deltodo);
            todobtncont.appendChild(edittodo);
            todobtncont.appendChild(extendtodobtn);
            todoinf.appendChild(todoinfocont);
            todoinfocont.appendChild(todoinf_cont);
            todoinfocont.appendChild(todobtncont);
            todoinf.appendChild(extendedtodo);
            extendedtodo.appendChild(desccont);
            extendedtodo.appendChild(checklistcont);
            extendedtodo.appendChild(notecont);
            notecont.appendChild(notelabel);
            notecont.appendChild(notes);
            desccont.appendChild(desclabel);
            desccont.appendChild(desc);
            checklistcont.appendChild(checklistlabel);

            todoitem.classList.add("todo-item");
            checkbox.classList.add("checkbox");
            todoinf.classList.add("todo-inf");
            todotitle.classList.add("todo-title");
            todoinfo.classList.add("todo-info");
            duedate.classList.add("todo-date");
            priority.classList.add("todo-priority");
            deltodo.classList.add("deltodo");
            todobtncont.classList.add("todobtncont");
            todoinf_cont.classList.add("todoinf-cont");
            deltodo.classList.add("deltodo");
            edittodo.classList.add("edittodo");
            extendtodobtn.classList.add("extendtodobtn");
            extendedtodo.classList.add("extendedtodo");
            desccont.classList.add("descont");
            desclabel.classList.add("desclabel");
            desc.classList.add("desc");
            checklistcont.classList.add("checklistcont");
            checklistlabel.classList.add("checklistlabel");
            notecont.classList.add("notecont");
            notelabel.classList.add("notelabel");
            notes.classList.add("notes");
            todoinfocont.classList.add("todoinfocont");

            deltodo.innerHTML = `<i class="fa-solid fa-trash"></i>`;
            edittodo.innerHTML = `<i class="fa-solid fa-pen-to-square"></i>`;
            extendtodobtn.innerHTML = `<i class="fa-solid fa-chevron-down"></i>`;
            desclabel.textContent = "Description:";
            checklistlabel.textContent = "Checklist:";
            notelabel.textContent = "Note:";
            extendtodobtn.addEventListener("click", () => {
                extendedtodo.classList.toggle("active");
            });

            if(t.priority === "high"){
                priority.classList.add("high")
            }else if (t.priority === "medium"){
                priority.classList.add("medium");
            }else{
                priority.classList.add("low");
            }

            todoitem.dataset.id = t.id;
            todotitle.textContent = t.title;
            duedate.textContent = t.duedate;
            priority.textContent = t.priority;
            desc.textContent = t.description;
            notes.textContent = t.notes;
            const id = t.id;
            const checklistarray = this.app.getchecklist(projectname, id);
            checklistarray.forEach((check, index) => {
                const checkboxcontent = document.createElement("div");
                const checkbox = document.createElement("input");
                checkbox.type = "checkbox";
                checkbox.dataset.id = index;
                checkbox.classList.add("checkbox");
                const checkboxtext = document.createElement("p");
                checkboxtext.textContent = check.text;
                checkboxcontent.appendChild(checkbox);
                checkboxcontent.appendChild(checkboxtext);
                checklistcont.appendChild(checkboxcontent);
                checkbox.addEventListener("change", (e) => {
                    e.target.this.app.checklistcomplete(projectname, id, index);
                    console.log("checkbox has been toggled");
                })

            });

            

            checkbox.addEventListener("change", () => {
                const id = t.id;
                this.app.setTodoComplete(projectname, id);
                this.app.saveproject();
                this.projectUi.rendercurrentproject(projectname);
                const updatedTodo = this.app.gettodos(projectname).find(todo => todo.id === id);
                if(updatedTodo.complete){
                    todotitle.classList.add("disabletitle");
                    duedate.classList.add("disableduedate");
                }else{
                     todotitle.classList.remove("disabletitle");
                    duedate.classList.remove("disableduedate");
                }
            });
            checkbox.checked = t.complete;
            deltodo.addEventListener("click", () => {
                const id = t.id;
                this.app.deletetodo(projectname, id);
                if(todoitem.dataset.id === id){
                    todoitem.remove();
                }
                this.projectUi.rendercurrentproject(projectname);
            });


        });
    }
    
    formtodo(projectName, title, description, duedate, priority, notes){
         const newtodo = this.app.createtodo(projectName, title, description, duedate, priority, notes);
          this.app.saveproject();
          return newtodo;
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
    completetodo(projectName, id){
        this.app.setTodoComplete(projectName, id);
        this.app.saveproject();
    }
}
export {todoUi};