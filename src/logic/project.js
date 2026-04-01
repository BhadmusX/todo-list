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
    removetodo(title){
        this.todos = this.todos.filter((todo)=> todo.title !== title);
        console.log(`${title} was removed from ${this.name}`)
    }
    setcomplete(title){
        const foundtodo = this.todos.find(todo => todo.title === title);
        foundtodo.complete = !foundtodo.complete;
    }
    changetodopriority(title, priority){
       const foundtodo = this.todos.find(todo => todo.title === title); 
       foundtodo.priority = priority;
    }
};
export {project};