let TodosFactory = (function() {
    let Id = 1;
    // Create an object constructor function that makes a Todo after
    // being given the title, description, due date, and priority.
    let CreateTodo = function(title, dueDate, description, priority, project = "All")
    {
        this.Id = Id++;
        this.title = title;
        this.dueDate = dueDate;
        this.description = description;
        this.priority = priority;
        this.project = project;
        this.checked = false;
    };

    CreateTodo.prototype.check = function()
    {
        this.checked = true;        
    }

    CreateTodo.prototype.uncheck = function()
    {
        this.checked = false;        
    }

    CreateTodo.prototype.editTodo = function(title, dueDate, description, priority)
    {
        this.title = title;
        this.dueDate = dueDate;
        this.description = description;
        this.priority = priority;      
    }

    /*let editTodo = (todo, title, dueDate, description, priority) =>
    {
        todo.title = title;
        todo.dueDate = dueDate;
        todo.description = description;
        todo.priority = priority;
    }*/

    
    return {CreateTodo}
})();

export default TodosFactory;