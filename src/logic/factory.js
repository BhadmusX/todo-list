class todo{
    constructor (title, description, duedate, priority, notes){
        this.id = crypto.randomUUID();
        this.title = title;
        this.description = description;
        this.duedate = duedate;
        this.priority = priority;
        this.complete = false;
        this.notes = notes;
        this.checklist = [];
    }
    addchecklist(text){
    this.checklist.push({
        text: text,
        complete: false
    });
}
};
export {todo};