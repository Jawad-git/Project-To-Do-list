import TodosFactory from "./Todos-factory";
let ProjectFactory = (function (){
    // every project has its own array of todos
    let CreateTodo = TodosFactory.CreateTodo;
    // Create an object constructor function that makes a Project after
    // being given its name, Each project has an array of todos and an array of completed todos.
    function ProjectBuild(name)
    {
        this.name = name;
        this.todoList = [];
        this.completedList = [];
    }
    const projects = [];
    let All = new ProjectBuild("All");
    let currentProject = All;
    projects.push(All);


    // add the task to its respective position in the arrays depending on its priority.
    const addToList = (todoList, todo) =>
    {
        let index = todoList.findIndex(x => x.priority < todo.priority);
        if (index == -1)
        {
            todoList.unshift(todo);
        } else
        {
            todoList.splice(index + 1, 0, todo);
        }
    }

    const sendTodoFromListToAnother = (listA, listB, todo) =>
    {
        removeFromList(listA, todo);
        addToList(listB, todo);
    }


    const checkToDo = (todo) =>
    {
        todo.check();
        let project = projects.find(x => x.name == `${todo.project}`);
        sendTodoFromListToAnother(project.todoList, project.completedList, todo); 
        if (todo.project != "All")
        {
            sendTodoFromListToAnother(All.todoList, All.completedList, todo);          
        }         
    }

    const uncheckTodo = (todo) =>
    {
        todo.uncheck();
        let project = projects.find(x => x.name == `${todo.project}`);
        sendTodoFromListToAnother(project.completedList, project.todoList, todo);
        if (todo.project != "All")
        {
            sendTodoFromListToAnother(All.completedList, All.todoList, todo);          
        }    
    }

    // take the input from the user, create a Todo with them, and run addToList.
    const addTodo = (title, description, dueDate, priority, project = currentProject) =>
    {
        let todo = new CreateTodo(title, dueDate, description, priority, project.name);
        addToList(project.todoList, todo);
        if (project.name != "All")
        {
            addToList(All.todoList, todo);           
        }
    }

    const removeFromList = (list, todo) => {
        let index = list.findIndex(x => x.Id == todo.Id);
        if (index !== -1) {
            list.splice(index, 1);
        }
    }
    
    // Delete a task from the array if found.
    const deleteTodo = (todo) => 
    {
        let project = projects.find(x => x.name == `${todo.project}`);
        if (todo.checked)
            {
                removeFromList(project.completedList, todo);
            }
            else
            {
                removeFromList(project.todoList, todo);
            }
        if (todo.project != "All")
        {
            if (todo.checked)
            {
                removeFromList(All.completedList, todo);
            }
            else
            {
                removeFromList(All.todoList, todo);
            }
        }
    }

    return {ProjectBuild, addTodo, deleteTodo, currentProject, projects, All, sendTodoFromListToAnother, checkToDo, uncheckTodo};
})();

export default ProjectFactory;