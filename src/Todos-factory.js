let TodosFactory = (function() {
    let Id = 1;
    // Create an object constructor function that makes a Todo after
    // being given the title, description, due date, and priority.
    let storage = window.localStorage;

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

    CreateTodo.prototype.saveToStorage = function (){
        storage.setItem(`todo-${this.id}`, JSON.stringify(this));
    }

    CreateTodo.prototype.check = function()
    {
        this.checked = true;  
        this.saveToStorage();
    }

    CreateTodo.prototype.uncheck = function()
    {
        this.checked = false;  
        this.saveToStorage();
    }

    CreateTodo.prototype.editTodo = function(title, dueDate, description, priority)
    {
        this.title = title;
        this.dueDate = dueDate;
        this.description = description;
        this.priority = priority;
        this.saveToStorage();
    }

    CreateTodo.prototype.delete = function ()
    {
        storage.removeItem(`todo-${this.id}`);
    }

    
    return {CreateTodo}
})();

export default TodosFactory;