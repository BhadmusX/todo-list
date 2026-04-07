import { project } from "../logic/project.js";
import { app } from "../logic/app.js";
class projectUi {
     constructor(app, todoui){
        this.app = app;
        this.todoui = todoui;
        this.currentpro = null;
    }
    getcurrentpro(){
        return this.currentpro;
    }
    renderSidebar(){
        const projectcont = document.querySelector(".project-cont");
      const array = this.app.getprojects().map(project => {
            return project.name;
        });
         projectcont.innerHTML = "";
        array.forEach(name => {
            const prodiv = document.createElement("li");
            const projectdiv = document.createElement("div");
            const delpro = document.createElement("button");
            delpro.textContent = "x";
            projectdiv.textContent = name;
            projectdiv.classList.add(name.replace(/\s+/g, "-"));
            projectdiv.classList.add("projectdiv");
            prodiv.classList.add("prodiv");


            projectdiv.addEventListener("click", () => {
               this.rendercurrentproject(name);
               const todos = this.app.gettodos(name);
                this.todoui.rendermaincontent(name, todos);
            });

            projectcont.appendChild(prodiv);
            prodiv.appendChild(projectdiv);
            prodiv.appendChild(delpro);
            delpro.addEventListener("click", () => {
                const id = this.app.findprojectid(name);
                this.app.deleteproject(name,  id);
                prodiv.remove();
            });


        });
        
    }
    rendercurrentproject(name){
    const currentpro = document.querySelector(".current-project");
    currentpro.innerHTML = "";
    const currentname = document.createElement("h1");
    const tasks = document.createElement("p");
    currentname.classList.add("currentname");
    tasks.classList.add("tasks");
    const done = this.app.gettodos(name).filter(t => t.complete).length;
    tasks.textContent = `${this.app.gettodos(name).length} tasks . ${done} completed`;
    this.currentpro = name;
    currentname.textContent = name;
    currentpro.appendChild(currentname);
    currentpro.appendChild(tasks);
}
    projectform(name){

        this.app.createproject(name);
        this.app.saveproject();
       
    };
}
export {projectUi};