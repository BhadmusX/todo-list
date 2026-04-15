class project{
    constructor (name){
        this.id = crypto.randomUUID();
        this.name = name;
        this.todos = [];
    }
    addtodo(todo){
        this.todos.push(todo);
        console.log(`${todo.title} was added to ${this.name}`)
    }
    removetodo(id){
        const findtodo = this.todos.findIndex(todo => todo.id === id);
        if (findtodo === -1) return;
        if (findtodo === "default") return;
        this.todos.splice(findtodo, 1);
        console.log(`${id} was removed from ${this.name}`)
    }
    setcomplete(id){
        const foundtodo = this.todos.find(todo => todo.id === id);
        if (!foundtodo) {
            console.error('Todo not found with id:', id, 'in project:', this.name);
            return;
        }
        foundtodo.complete = !foundtodo.complete;
    }
    changetodopriority(id, priority){
       const foundtodo = this.todos.find(todo => todo.id === id); 
       foundtodo.priority = priority;
    }
    getchecklist(id){
      const foundtodo = this.todos.find(todo => todo.id === id);
      return foundtodo.checklist;  
    }
    addchecklist(id, text){
      const foundtodo = this.todos.find(todo => todo.id === id);  
    foundtodo.checklist.push({
        text: text,
        complete: false
    });
}
     updatechecklisttext(id, index, text){
         const foundtodo = this.todos.find(todo => todo.id === id);
        foundtodo.checklist[index].text = text;
    }
    setchecklistcomplete(id, index){
         const foundtodo = this.todos.find(todo => todo.id === id);
        const foundchecklist = foundtodo.checklist[index];
        foundchecklist.complete = !foundchecklist.complete;
    }
};
export {project};