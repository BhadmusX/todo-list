class project {
  constructor(name) {
    this.id = crypto.randomUUID();
    this.name = name;
    this.todos = [];
  }
  addtodo(todo) {
    this.todos.push(todo);
  }
  removetodo(id) {
    const findtodo = this.todos.findIndex((todo) => todo.id === id);
    if (findtodo === -1) return;
    if (findtodo === "default") return;
    this.todos.splice(findtodo, 1);
  }
  setcomplete(id) {
    const foundtodo = this.todos.find((todo) => todo.id === id);
    if (!foundtodo) {
      return;
    }
    foundtodo.complete = !foundtodo.complete;
  }
  changetodopriority(id, priority) {
    const foundtodo = this.todos.find((todo) => todo.id === id);
    foundtodo.priority = priority;
  }
  getchecklist(id) {
    const foundtodo = this.todos.find((todo) => todo.id === id);
    return foundtodo.checklist;
  }
  addchecklist(id, text) {
    const foundtodo = this.todos.find((todo) => todo.id === id);
    foundtodo.checklist.push({
      text: text,
      complete: false,
    });
  }
  updatechecklist(id, index, text) {
    const foundtodo = this.todos.find((todo) => todo.id === id);
    foundtodo.checklist[index].text = text;
  }
  setchecklistcomplete(id, index) {
    const foundtodo = this.todos.find((todo) => todo.id === id);
    const foundchecklist = foundtodo.checklist[index];
    foundchecklist.complete = !foundchecklist.complete;
  }
}
export { project };
