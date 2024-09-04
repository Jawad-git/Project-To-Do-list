import "./styles.css";
import ProjectFactory from "./ProjectFactory.js";
import ProjectPageBuilder from "./ProjectPageBuilder";
import commonBuilders from "./CommonBuilders.js";
let ProjectBuild = ProjectFactory.ProjectBuild;
let TodoApplication = (function() 
{
    // make a Current Project variable to know in which project we're in
    let currentProject;
    let all;

    // make an array of all Projects, and an array for all tasks
    const projects = [];
    //currentProjects.push(all); make the object "all".

    let initialize = () =>
    {
        all = new ProjectBuild("All");
        projects.push(all);
        currentProject = all;


        ProjectPageBuilder.enterNewFactory(projects);
        ProjectPageBuilder.enterNewTask(projects, currentProject);

        document.getElementById("All").addEventListener("click", () => {
            ProjectPageBuilder.DisplayTodos(all.todos, all.completed_todos)
            ProjectPageBuilder.enterNewTask(projects, all);
          });

        /* (e) => 
            {console.log (e.target.innerText); ProjectPageBuilder.DisplayTodos(all.todos, all.completed_todos)});

        
        // separate the creation of an li with an event listener into its own function
        function handleSubmit(e) {
            e.preventDefault();
            let projectName = document.getElementById("newProjectName").value;
            let newProject = new ProjectBuild(projectName);
            projects.push(newProject);
            currentProject = newProject;
            let projectli = commonBuilders.TextBuilder("li", projectName, null);
            projectli.addEventListener("click", (e) => ProjectPageBuilder.DisplayTodos(currentProject.todos, currentProject.completed_todos));
            document.getElementById("projects").append(projectli);
            //ProjectPageBuilder.enterNewTask(currentProject.todos, currentProject.completed_todos);
            
        }
        let projectForm = document.getElementById("projectForm");
        projectForm.removeEventListener("submit", handleSubmit);
        projectForm.addEventListener("submit", handleSubmit);*/
        
    }
    
    
    
    return {initialize};
})();
TodoApplication.initialize();






















function findProj(e){
    return projects.find(x => x.name == e.target.innerText);
}