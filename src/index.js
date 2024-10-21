import "./styles.css";
import ProjectFactory from "./ProjectFactory.js";
import ProjectPageBuilder from "./ProjectPageBuilder";
import commonBuilders from "./CommonBuilders.js";
let ProjectBuild = ProjectFactory.ProjectBuild;
let TodoApplication = (function() 
{
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
    
    
    
    return {initialize};
})();
TodoApplication.initialize();






















//function findProj(e){
//    return projects.find(x => x.name == e.target.innerText);
//}