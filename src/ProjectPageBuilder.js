import commonBuilders from './CommonBuilders.js';
import TodosFactory from './Todos-factory.js';
import ProjectFactory from './ProjectFactory.js';
// maybe remove the project and use currentproject to display dom
let ProjectPageBuilder = (function(){

    let DivBuilder = commonBuilders.DivBuilder;
    let TextBuilder = commonBuilders.TextBuilder;
    let ButtonBuilder = commonBuilders.ButtonBuilder;
    let InputBuilder = commonBuilders.InputBuilder;
    let deleteTodo = ProjectFactory.deleteTodo;
    let addTodo = ProjectFactory.addTodo;
    let ProjectBuild = ProjectFactory.ProjectBuild;
    // Create a function to display the todos.
    let DisplayTodos = () =>
    {
        document.getElementById("container").innerHTML = "";
        let listdiv = DivBuilder("class", "lists");
        let ul = document.createElement("ul");
        let ulCompleted = document.createElement("ul");
        todos.forEach(todo => 
        {
            // create a function that returns the task li to reduce clutter
            let li = TodoDisplayHelper(todo);
            ul.appendChild(li);
        });
            
        completed_todos.forEach(todo => 
        {
            // create a function that returns the task li to reduce clutter
            let li = CompletedDisplayHelper(todo);
            ulCompleted.appendChild(li);
        });
        
        listdiv.appendChild(ul);
        listdiv.appendChild(ulCompleted);
        document.getElementById("container").append(listdiv);
        //listdiv;
    };

    // create the function that returns the li which houses the Task visual representation
    let TodoDisplayHelper = (todo) =>
    {
        // Create a function that handles checking out the task.
        var HandleCheckTask = () =>
        {
            ProjectFactory.checkToDo(todo);
            document.getElementById("container").innerHTML = "";
            DisplayTodos(project);
        };
        let li = document.createElement("li");
        let task = DivBuilder("class", "todo");

        // because the nav houses the title, due date, the edit and delete buttons, it requires
        // a helper function.
        let nav = TodoNavHelper(todo, project);
        let taskDescription = TextBuilder("p", todo.description, "taskDescription");
        let taskFooter = DivBuilder("taskFooter");
        let taskPriority = TextBuilder("h6", todo.priority, "taskPriority");
        let completeButton = ButtonBuilder("Check Task", "checkButton", HandleCheckTask);
        taskFooter.append(taskPriority, completeButton);
        task.append(nav, taskDescription, taskFooter);
        li.appendChild(task);
        
        return li;
    };
    // Create function TodoNavHelper that helps in creating the nav of a task    
    let TodoNavHelper = (todo, project) =>
    {
        // Create function HandleEditTask that is called when clicking on the Edit button
        var HandleEditTask =  (e) =>
        {
            let li = e.target.closest("li");
            li.append(EditTodoDisplay(todo, project));
        };
        // Create function HandleDeleteTask that is called when clicking on the delete button        
        var HandleDeleteTask = (e) =>
        {
            ProjectFactory.deleteTodo(todo);
            DisplayTodos(project);
        };
        let nav = DivBuilder("class", "displayNav");
        let taskTitle = TextBuilder("h1", todo.title, "taskTitle");
        let taskDueDate = TextBuilder("h4", todo.dueDate, "taskTDueDate");
        let editButton = ButtonBuilder("Edit Task", "editButton", HandleEditTask);
        let deleteButton = ButtonBuilder("Delete Task", "deleteButton", HandleDeleteTask);
        
        nav.append(taskTitle, taskDueDate, editButton, deleteButton);
        return nav;
    }

    // Create function that creates a "shadow" parallel Task near the one you want to edit
    // And it will be used to edit the real task
    let EditTodoDisplay = (todo, todos, completed_todos) =>
    {
        var handleDiscardEdit = () =>
        {
            task.remove();
        }
        let task = DivBuilder("class", "todoInput");
        let form = document.createElement("form");
        form.setAttribute("id", "editTaskForm");
        let nav = DivBuilder("class", "displayNav");
        let titleInput = InputBuilder("input", "titleInput", "New Title..");
        let dueDateInput = InputBuilder("input", "dueDateInput", "New Due date in the format YYYY-MM-DD.."); // should be date here
        let descriptionInput = InputBuilder("input", "descriptionInput", "New Description..");
        let priorityInput = InputBuilder("input", "priorityInput", "New priority, the smaller the number the higher the priority..");
    
        let taskFooter = DivBuilder("class", "taskFooterInput");
        
        let discardButton = ButtonBuilder("Discard Edit", "discardEdit", handleDiscardEdit);
        discardButton.type ="button";
        let submitButton = ButtonBuilder("Submit Edit", "submitEdit", null);

        nav.append(titleInput, dueDateInput);
        taskFooter.append(priorityInput, discardButton, submitButton);
        form.append(nav, descriptionInput, taskFooter);
        task.appendChild(form);

        // On Submit, realize the edits back into the todos
        var handleSubmitEdit =  (e) => // You make want to fix the submit, event handler on button or form?!
        {
            e.preventDefault();
            deleteTodo(todos, todo);
            addTodo(todos, titleInput.value, dueDateInput.value, descriptionInput.value, priorityInput.value);
            // ---------------
            if (ProjectFactory.currentProject.name != "All")
            {
                deleteTodo(ProjectFactory.projects.find(x => x.name == "All").todos, todo);
                addTodo(ProjectFactory.projects.find(x => x.name == "All").todos, titleInput.value, dueDateInput.value, descriptionInput.value, priorityInput.value);
            }
            else
            {
                ProjectFactory.projects.forEach(project => {
                    let obj = project.todos.find(x => x.title == todo.title && x.description == todo.description);
                    if (obj !== undefined)
                    {
                        deleteTodo(project.todos, todo);
                        addTodo(project.todos, titleInput.value, dueDateInput.value, descriptionInput.value, priorityInput.value);
                    }
                })
            }
            // -------------- fix in this scope            
            DisplayTodos(project);
        };
        
        // On discard, remove the parallel Task
        form.addEventListener("submit", handleSubmitEdit);
        return task;
    }
    
    let CompletedDisplayHelper = (todo, todos, completed_todos) =>
        {
            // Create a function that handles checking out the task.
            var HandleUnCheckTask = () =>
            {
                ProjectFactory.uncheckTodo(todo);
                document.getElementById("container").innerHTML = "";
                DisplayTodos(project);
            };
            var HandleDeleteTask = (e) =>
                {
                    ProjectFactory.deleteTodo(todo);
                    DisplayTodos(todos, completed_todos);
                };
            let li = document.createElement("li");
            let task = DivBuilder("class", "todo");
            // because the nav houses the title, due date, the edit and delete buttons, it requires
            // a helper function.
            let nav = DivBuilder("class", "displayNav");
            let taskTitle = TextBuilder("h1", todo.title, "taskTitle");
            let taskDueDate = TextBuilder("h4", todo.dueDate, "taskTDueDate");
            let deleteButton = ButtonBuilder("Delete Task", "deleteButton", HandleDeleteTask);
            let taskDescription = TextBuilder("p", todo.description, "taskDescription");
            let taskFooter = DivBuilder("taskFooter");
            let taskPriority = TextBuilder("h6", todo.priority, "taskPriority");
            let unCheckButton = ButtonBuilder("Uncheck Task", "checkButton", HandleUnCheckTask);
            nav.append(taskTitle, taskDueDate, deleteButton);
            taskFooter.append(taskPriority, unCheckButton);
            task.append(nav, taskDescription, taskFooter);
            li.appendChild(task);
            return li;
        };


    // Create the modal for creating a new Task, the modal should show up after 
    // clicking the add task button in the sidebar
    let enterNewTask = () =>
    {
            // Assign the openModal function directly to the click event listener
        
            let openModal = () => {
                var modal = document.getElementById("modal");
                var closeBtn = document.querySelector(".closeBtn");
        
                // Show the modal when the addTask button is clicked
                modal.style.display = "block";
        
                // Close the modal when the close button is clicked
                closeBtn.onclick = function() {
                    modal.style.display = "none";
                };
        
        
                // Close the modal if the user clicks outside of it
                window.onclick = function(event) {
                    if (event.target == modal) {
                        modal.style.display = "none";
                    }
                };
        
            }
            document.getElementById("addTask").removeEventListener("click", openModal);
            document.getElementById("addTask").addEventListener("click", openModal);

            function handleSubmit(e) {
                e.preventDefault();
                console.log(ProjectFactory.currentProject);
                let modal = document.getElementById("modal");
                modal.style.display = "none";
                let title = document.getElementById("title").value;
                let description = document.getElementById("description").value;
                let dueDate = document.getElementById("dueDate").value;
                let priority = document.getElementById("priority").value;
                addTodo(ProjectFactory.currentProject.todos, title, description, dueDate, priority);
                if (ProjectFactory.currentProject.name != "All")
                {
                    addTodo(ProjectFactory.projects.find(x => x.name == "All").todos, title, dueDate, description, priority);
                }
                document.getElementById("container").innerHTML = "";
                DisplayTodos(ProjectFactory.currentProject);
            }

            // Prevent adding multiple event listeners for 'submit' on the modalForm
            let addTaskForm = document.getElementById("modalForm");
            addTaskForm.removeEventListener("submit", handleSubmit);
            addTaskForm.addEventListener("submit", handleSubmit);
    }
    
    let EnterNewFactory = () =>
    {
        function onLiClick(newProject)
            {
                ProjectFactory.currentProject = newProject;
                console.log(ProjectFactory.currentProject);
                ProjectPageBuilder.DisplayTodos(ProjectFactory.currentProject.todos, ProjectFactory.currentProject.completed_todos);
            };
        // separate the creation of an li with an event listener into its own function
        function handleSubmit(e) {
            e.preventDefault();
            let projectName = document.getElementById("newProjectName").value;
            let newProject = new ProjectBuild(projectName);
            ProjectFactory.currentProject = newProject;
            ProjectFactory.projects.push(newProject);
            let projectli = commonBuilders.TextBuilder("li", projectName, null);
            projectli.removeEventListener("click", () => onLiClick(newProject));
            projectli.addEventListener("click", () => onLiClick(newProject));
            document.getElementById("projects").append(projectli);
            ProjectPageBuilder.DisplayTodos(ProjectFactory.currentProject.todos, ProjectFactory.currentProject.completed_todos);
        }
        let projectForm = document.getElementById("projectForm");
        projectForm.removeEventListener("submit", handleSubmit);
        projectForm.addEventListener("submit", handleSubmit);
    }

    //let NewProjectDisplay()
    return {DisplayTodos, enterNewTask, EnterNewFactory, enterNewTask};
})();

export default ProjectPageBuilder;