import { project } from "../logic/project.js";
import { app } from "../logic/app.js";
class projectUi {
     constructor(app){
        this.app = app;
    }
    renderSidebar(){
      return  this.app.getprojects().map(project => {
            return project.name;
        });
    }
    projectform(name){
       return this.app.createproject(name);
    };
}
export {projectUi};