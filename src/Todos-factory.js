let TodosFactory = (function() {

    let CreateTodo = function(title, description, dueDate, priority)
    {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
    };
    

    return {CreateTodo, EditTodo}
})();

export default TodosFactory;