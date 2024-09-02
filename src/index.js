import "./styles.css";
import ProjectFactory from "./ProjectFactory";
import ProjectPageBuilder from "./ProjectPageBuilder";
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
        all = new ProjectFactory.ProjectBuild("All");
        projects.push(all);
        currentProject = all;
        ProjectPageBuilder.enterNewTask(currentProject.todos, currentProject.completed_todos);
    }

    return {initialize};
})();
TodoApplication.initialize();
