import "./styles.css";
import ProjectFactory from "./ProjectFactory.js";
import ProjectPageBuilder from "./ProjectPageBuilder";
import commonBuilders from "./CommonBuilders.js";
import TodosFactory from './Todos-factory.js';

let ProjectBuild = ProjectFactory.ProjectBuild;
let TodoApplication = (function() 
{
    let storage = window.localStorage;

    let load = () =>
    {
        ProjectFactory.currentProject = ProjectFactory.All;
        // load the array of project names.
        if (storage.getItem("projects"))
        {
            
            let projectsArr = JSON.parse(storage.getItem("projects"));
            console.log(projectsArr);
            projectsArr.forEach(project => {
                ProjectPageBuilder.AddProject(project);
            });
        }
        if (storage.getItem("todos"))
        {
            let todos = JSON.parse(storage.getItem("todos"));
            todos.forEach(todo =>
            {
                //console.log(todo);
                Object.setPrototypeOf(todo, TodosFactory.CreateTodo.prototype);
                ProjectFactory.addTodoToProject(todo);
            });
        }
        ProjectFactory.projects.forEach(project =>
        {
            project.todoList.sort((a, b) =>  a.priority - b.priority);
            project.completedList.sort((a, b) => a.priority - b.priority);
        });
        ProjectFactory.currentProject = ProjectFactory.All;
        ProjectPageBuilder.DisplayTodos();

    }
    let initialize = () =>
    {
        // maybe convert to callback
        document.getElementById("All").addEventListener("click", () => {
            ProjectFactory.currentProject = ProjectFactory.All;
            ProjectPageBuilder.DisplayTodos(ProjectFactory.currentProject.todos, ProjectFactory.currentProject.completed_todos);
          });
          ProjectPageBuilder.enterNewTask();
          ProjectPageBuilder.EnterNewFactory();
    }
    
    
    
    return {initialize, load};
})();
TodoApplication.initialize();
TodoApplication.load();






















//function findProj(e){
//    return projects.find(x => x.name == e.target.innerText);
//}