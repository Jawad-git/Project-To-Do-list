let TodosFactory = (function() {

    // Create an object constructor function that makes a Todo after
    // being given the title, description, due date, and priority.
    let CreateTodo = function(title, description, dueDate, priority)
    {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
    };
    

    return {CreateTodo}
})();

export default TodosFactory;