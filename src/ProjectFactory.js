import TodosFactory from "./Todos-factory";
let ProjectFactory = (function (){
    // every project has its own array of todos
    let CreateTodo = TodosFactory.CreateTodo;
    // Create an object constructor function that makes a Project after
    // being given its name, Each project has an array of todos and an array of completed todos.
    function ProjectBuild(name)
    {
        this.name = name;
        this.todos = [];
        this.completed_todos = [];
    }
    // add the task to its respective position in the arrays depending on its priority.
    const addToList = (todos, todo) =>
    {
        let index = todos.findIndex(x => x.priority < todo.priority);
        if (index == -1)
        {
            todos.unshift(todo);
        } else
        {
            todos.splice(index + 1, 0, todo);
        }
    }

    // take the input from the user, create a Todo with them, and run addToList.
    const addTodo = (todos, title, description, dueDate, priority) =>
    {
        let todo = new CreateTodo(title, description, dueDate, priority);
        addToList(todos, todo);
    }
    // Delete a task from the array if found.
    const deleteTodo = (todos, todo) =>
    {
        let index = todos.findIndex(x => x.title == todo.title && x.priority == todo.priority);
        todos.splice(index, 1);
    }

    return {ProjectBuild, addTodo, deleteTodo};
})();

export default ProjectFactory;