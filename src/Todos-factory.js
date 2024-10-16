let TodosFactory = (function() {

    // Create an object constructor function that makes a Todo after
    // being given the title, description, due date, and priority.
    let CreateTodo = function(title, dueDate, description, priority)
    {
        this.title = title;
        this.dueDate = dueDate;
        this.description = description;
        this.priority = priority;
    };
    

    return {CreateTodo}
})();

export default TodosFactory;