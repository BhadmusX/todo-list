import {project} from "./project.js";
import {todo} from "./factory.js";
class app {
    constructor () {
        this.projects = [];
        this.getdefaultproject();
    }
        createproject(name){
        const newproject = new project(name);
        this.projects.push(newproject);
        console.log(`${newproject.name} has been added to projects`);
        return newproject;
    }
    createtodo(projectName, title, description, duedate, priority){
    const foundProject = this.projects.find(project => project.name === projectName);
    foundProject.addtodo(new todo(title, description, duedate, priority));
}
    deletetodo(projectName, todoid){
        this.projects;
        const foundProject = this.projects.find(project => project.name === projectName);
        foundProject.removetodo(todoid);
    }
    deleteproject(name){
        this.projects = this.projects.filter((project)=> project.name !== name);
        console.log(`${name} was removed from project`)
    }
    findproject(projectname){
        const findproject = this.projects.find(project => project.name === projectname);
        return findproject;
    };
    getprojects(){
        return this.projects
    }
    getdefaultproject(){
        this.createproject("Default");
    }
    setTodoComplete(projectname, todotitle){
        const foundProject = this.projects.find(project => project.name === projectname);
        foundProject.setcomplete(todotitle); 
    }
    changepriority(projectname, todotitle, priority){
        const foundProject = this.projects.find(project => project.name === projectname);
        foundProject.changetodopriority(todotitle, priority);
    }
}
export {app};