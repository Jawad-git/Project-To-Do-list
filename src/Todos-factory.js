let TodosFactory = (function() {

    // Create an object constructor function that makes a Todo after
    // being given the title, description, due date, and priority.
    let storage = window.localStorage;
    let Id = storage.getItem('Id') || 1;
    let todoSet = JSON.parse(storage.getItem("todos")) || [];

    let CreateTodo = function(title, dueDate, description, priority, project = "All")
    {
        this.Id = Id++;
        this.title = title;
        this.dueDate = dueDate;
        this.description = description;
        this.priority = priority;
        this.project = project;
        this.checked = false;
        todoSet.push(this);
        saveToStorage();
    };

    function saveToStorage()
    {
        storage.removeItem("todos");
        storage.setItem("todos", JSON.stringify(todoSet));
        storage.setItem(`Id`, Id);
    }

    /*CreateTodo.prototype.saveToStorage = function (){
        storage.setItem("todos", JSON.stringify(todoSet));
        storage.setItem(`Id`, Id);

    }*/

    CreateTodo.prototype.check = function()
    {
        this.checked = true; 
        console.log("come on"); 
        saveToStorage();
    }

    CreateTodo.prototype.uncheck = function()
    {
        this.checked = false;  
        saveToStorage();
    }

    CreateTodo.prototype.editTodo = function(title, dueDate, description, priority)
    {
        this.title = title;
        this.dueDate = dueDate;
        this.description = description;
        this.priority = priority;
        saveToStorage();
    }

    CreateTodo.prototype.delete = function ()
    {
        todoSet = todoSet.filter(item => item !== this);
        saveToStorage();
    }

    
    return {CreateTodo}
})();

export default TodosFactory;