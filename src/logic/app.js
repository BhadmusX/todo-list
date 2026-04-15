import {project} from "./project.js";
import {todo} from "./factory.js";
class app {
    constructor () {
        this.projects = [];
        if (!localStorage.getItem("projects")){
    console.log("localStorage is empty, loading default");
    this.getdefaultproject();
} else {
    console.log("localStorage has data, loading from storage");
    this.projects = this.load().map(p => {
    const newProject = new project(p.name);
    newProject.id = p.id;
    newProject.todos = p.todos.map(t => {
        const newTodo = new todo(t.title, t.description, t.duedate, t.priority, t.notes);
        newTodo.id = t.id;
        newTodo.complete = t.complete;
        newTodo.notes = t.notes;
        newTodo.checklist = t.checklist || [];
        return newTodo;
    });
    return newProject;
});
}
    }
        createproject(name){
        const newproject = new project(name);
        this.projects.push(newproject);
        console.log(`${newproject.name} has been added to projects`);
        this.saveproject();
        return newproject;
    }
    createtodo(projectName, title, description, duedate, priority, notes){
    const foundProject = this.projects.find(project => project.name === projectName);
    const newtodo = new todo(title, description, duedate, priority, notes);
    foundProject.addtodo(newtodo);
    this.saveproject();
    return newtodo;
}
    deletetodo(projectName, todoid){
        this.projects;
        const foundProject = this.projects.find(project => project.name === projectName);
        foundProject.removetodo(todoid);
        this.saveproject();
    }
    deleteproject(name, id){
        const foundindex = this.projects.findIndex(project => project.id === id);
        if (foundindex === -1) return;
        if( this.projects[foundindex].id === "default") return console.log("can't delete default");
        this.projects.splice(foundindex, 1);
        console.log(`${name} was removed from project`);
        this.saveproject();
    }
    findproject(projectname){
        const findproject = this.projects.find(project => project.name === projectname);
        return findproject;
    };
    findprojectid(projectname){
       return  this.findproject(projectname).id;
    }
    getprojects(){
        return this.projects
    }
    getdefaultproject(){
        this.createproject("Default");
        const finddefault = this.findproject("Default");
        finddefault.id = "default";
        this.saveproject();
    }
    setTodoComplete(projectname, id){
        const foundProject = this.projects.find(project => project.name === projectname);
        foundProject.setcomplete(id); 
        this.saveproject();
    }
    changepriority(projectname, todoid, priority){
        const foundProject = this.projects.find(project => project.name === projectname);
        foundProject.changetodopriority(todoid, priority);
        this.saveproject();
    }
    gettodos(projectname){
        return this.findproject(projectname).todos;
    };
    getchecklist(projectname, id){
        const foundProject = this.projects.find(project => project.name === projectname);
        return foundProject.getchecklist(id);
    }
    addchecklist(projectname, id, text){
     const foundProject = this.projects.find(project => project.name === projectname);
     foundProject.addchecklist(id, text); 
     this.saveproject();  
    }
    updatechecklist(projectname, id, index, text){
        const foundProject = this.projects.find(project => project.name === projectname);
        foundProject.updatechecklist(id, index, text);
        this.saveproject();
    }
    checklistcomplete(projectname, id, index){
        const foundProject = this.projects.find(project => project.name === projectname);
        foundProject.setchecklistcomplete(id, index);
        this.saveproject();
    }
    saveproject(){
    const projects =  this.projects;
    localStorage.setItem("projects", JSON.stringify(projects));
}
     load(){
        const pro = JSON.parse(localStorage.getItem("projects"));
        return pro;   

    }
}
export {app};