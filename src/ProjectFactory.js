import TodosFactory from "./Todos-factory";
let ProjectFactory = (function (){
    // every project has its own array of todos
    let CreateTodo = TodosFactory.CreateTodo;
    // Create an object constructor function that makes a Project after
    // being given its name, Each project has an array of todos and an array of completed todos.
    const projects = [];
    let storage = window.localStorage;
    // we comment the json parse because we always want to empty the projectNames, 
    // as we add them again during the load, this is to avoid exponential duplication!
    let projectNames = /*JSON.parse(storage.getItem("projects"))|| */ [];
    function ProjectBuild(name)
    {
        this.name = name;
        this.todoList = [];
        this.completedList = [];
    }

    function saveProjects(){
        storage.setItem(`projects`, JSON.stringify(projectNames));
    }
    let All = new ProjectBuild("All");
    let currentProject = All;
    projects.push(All);

    // create a project:

    function createProject(name)
    {
        let newProject = new ProjectBuild(name);
        currentProject = newProject;
        projects.push(newProject);
        projectNames.push(newProject.name);
        saveProjects();
        return newProject;
    }

    function addTodoToProject (todo)
    {
        let projectObject = projects.find(x => x.name == `${todo.project}`);
        if (todo.checked == true)
        {
            addToList(projectObject.completedList, todo);
        }
        else
        {
            addToList(projectObject.todoList, todo);
        }
        if (todo.project != "All") {
            if (todo.checked == true)
            {
                addToList(All.completedList, todo);           
            }
            else
            {
                addToList(All.todoList, todo);           
            }
        }
    }

    // Take the input from the user, create a Todo with them, and run addToList.
    function addTodo(title, dueDate, description, priority, project = currentProject.name) {
        let todo = new CreateTodo(title, dueDate, description, priority, project);
        addTodoToProject(todo);
    }

    // Add the task to its respective position in the arrays depending on its priority.
    function addToList(todoList, todo) {
        let index = todoList.findIndex(x => x.priority < todo.priority);
        if (index == -1) {
            todoList.unshift(todo);
        } else {
            todoList.splice(index + 1, 0, todo);
        }
    }

    function sendTodoFromListToAnother(listA, listB, todo) {
        removeFromList(listA, todo);
        addToList(listB, todo);
    }

    // Mark a todo as checked, move it to the completed list.
    function checkToDo(todo) {
        todo.check();
        let project = projects.find(x => x.name == `${todo.project}`);
        sendTodoFromListToAnother(project.todoList, project.completedList, todo); 
        if (todo.project != "All") {
            sendTodoFromListToAnother(All.todoList, All.completedList, todo);          
        }         
    }

    // Uncheck a todo, move it back to the todo list.
    function uncheckTodo(todo) {
        todo.uncheck();
        let project = projects.find(x => x.name == `${todo.project}`);
        sendTodoFromListToAnother(project.completedList, project.todoList, todo);
        if (todo.project != "All") {
            sendTodoFromListToAnother(All.completedList, All.todoList, todo);          
        }    
    }

    // Remove a todo from a given list.
    function removeFromList(list, todo) {
        let index = list.findIndex(x => x.Id == todo.Id);
        if (index !== -1) {
            list.splice(index, 1);
        }
    }

    // Delete a task from the array if found.
    function deleteTodo(todo) {
        let project = projects.find(x => x.name == `${todo.project}`);
        if (todo.checked) {
            removeFromList(project.completedList, todo);
        } else {
            removeFromList(project.todoList, todo);
        }
        if (todo.project != "All") {
            if (todo.checked) {
                removeFromList(All.completedList, todo);
            } else {
                removeFromList(All.todoList, todo);
            }
        }
        todo.delete();
    }

    /*
    // take the input from the user, create a Todo with them, and run addToList.
    const addTodo = (title, dueDate, description, priority, project = currentProject) =>
    {
        let todo = new CreateTodo(title, dueDate, description, priority, project.name);
        addToList(project.todoList, todo);
        if (project.name != "All")
        {
            addToList(All.todoList, todo);           
        }
    }
    // add the task to its respective position in the arrays depending on its priority.
    const addToList = (todoList, todo) =>
    {
        let index = todoList.findIndex(x => x.priority < todo.priority);
        if (index == -1)
        {
            todoList.unshift(todo);
        } 
        else
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
        */

    return {ProjectBuild, createProject, addTodo, deleteTodo, currentProject, projects,
         All, sendTodoFromListToAnother, checkToDo, uncheckTodo, addTodoToProject};
})();

export default ProjectFactory;