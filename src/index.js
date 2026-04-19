import '@fortawesome/fontawesome-free/css/all.min.css';
import './style.css';
import {app} from "./logic/app.js";
import { todoUi } from "./UI/todoUI.js";
import { projectUi } from "./UI/projectUI.js";
const cont = new app();
const rendertodo = new todoUi(cont);
const render = new projectUi(cont, rendertodo);

    const openbtn = document.querySelector("#openpromodal");
    const closebtn = document.querySelector("#closemodal");
    const modal = document.querySelector("#modal-container");

    openbtn.addEventListener("click", () => {
        modal.classList.remove("hidden");
        document.querySelector("#project-input").focus();
    });
    closebtn.addEventListener("click", () => {
         const name = document.querySelector("#project-input").value.trim();
        if(!name) return;
        render.projectform(name);
        document.querySelector("#project-input").value = "";
         modal.classList.add("hidden");
         cont.saveproject();
        render.renderSidebar();
    });
    window.addEventListener("click", (e)=> {
        if(e.target === modal){
            modal.classList.add("hidden");
        }
    });

    const opentodo = document.querySelector("#opentodo-modal");
    const closetodo = document.querySelector("#closetodomodal");
    const todomodal = document.querySelector("#todomodal-container");

    opentodo.addEventListener("click", ()=> {
        todomodal.classList.remove("hidden");
    });
    closetodo.addEventListener("click", ()=> {
        const title = document.querySelector("#title").value.trim();
        const desc = document.querySelector("#desc").value.trim();
        const duedate = document.querySelector("#duedate").value;
        const priority = document.querySelector("#priority-dropdown").value;
        const notes = document.querySelector("#notes").value.trim();
        if(!title || !desc || !duedate || !priority || !notes) return;
       const selectedprior = priority; 
       const projectname = render.getcurrentpro();
       if (!projectname) return;
       const newtodo =  rendertodo.formtodo(projectname, title, desc, duedate, selectedprior, notes);
       checklistitems.forEach(item => {
       cont.addchecklist(projectname, newtodo.id, item)
});
checklistitems.length = 0;

       todomodal.classList.add("hidden");
       document.querySelector("#title").value = "";
       document.querySelector("#desc").value = "";
       document.querySelector("#duedate").value = "";
       document.querySelector("#notes").value = "";
       cont.saveproject();
       const todos = cont.gettodos(projectname);
       rendertodo.rendermaincontent(projectname, todos);
       render.rendercurrentproject(projectname);
       render.renderSidebar();
    });

const checklistitems = [];

const addchecklistbtn = document.querySelector(".add-checklist");
addchecklistbtn.addEventListener("click", () => {
    const checklistinput = document.querySelector("#checklist-input");
    const item = checklistinput.value.trim();
    if(!item)return;
    checklistitems.push(item);
    checklistinput.value = "";
});


    window.addEventListener("click", (e)=> {
        if(e.target === todomodal){
            todomodal.classList.add("hidden");
        }
    });
     const filter = document.querySelector("#filter-dropdown");
    filter.addEventListener("click", () => {
        const name = render.getcurrentpro();
        if(filter.value === "all"){
            const all = cont.gettodos(name)
            rendertodo.rendermaincontent(name, all);
        }
        else if(filter.value === "complete"){
    const completed = cont.gettodos(name).filter(t => t.complete === true);
    rendertodo.rendermaincontent(name, completed);
   }else if (filter.value === "high"){
    const high = cont.gettodos(name).filter(t => t.priority === "high");
    rendertodo.rendermaincontent(name, high);
   }else if(filter.value === "medium"){
    const medium = cont.gettodos(name).filter(t => t.priority === "medium");
    rendertodo.rendermaincontent(name, medium);
   }else if (filter.value === "low"){
    const low = cont.gettodos(name).filter(t => t.priority === "low"
    )
        rendertodo.rendermaincontent(name, low);
   }
   filter.selectedIndex = 0;
    });
    const hamburger = document.getElementById('hamburger');
const sidebar = document.querySelector('.left-sidebar');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    sidebar.classList.toggle('open');
});
document.addEventListener('click', (e) => {
    if (!sidebar.contains(e.target) && !hamburger.contains(e.target)) {
        sidebar.classList.remove('open');
        hamburger.classList.remove('open');
    }
});

    rendertodo.projectUi = render;
render.renderSidebar();
const todos = cont.gettodos("Default")
rendertodo.rendermaincontent("Default", todos);
render.rendercurrentproject("Default");
