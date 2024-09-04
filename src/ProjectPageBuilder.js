import commonBuilders from './CommonBuilders.js';
import TodosFactory from './Todos-factory.js';
import ProjectFactory from './ProjectFactory.js';

let ProjectPageBuilder = (function(){

    let DivBuilder = commonBuilders.DivBuilder;
    let TextBuilder = commonBuilders.TextBuilder;
    let ButtonBuilder = commonBuilders.ButtonBuilder;
    let InputBuilder = commonBuilders.InputBuilder;
    let deleteTodo = ProjectFactory.deleteTodo;
    let addTodo = ProjectFactory.addTodo;
    let ProjectBuild = ProjectFactory.ProjectBuild;

    // Create a function to display the todos.
    let DisplayTodos = (todos, completed_todos) =>
    {
        document.getElementById("container").innerHTML = "";
        let listdiv = DivBuilder("class", "lists");
        let ul = document.createElement("ul");
        todos.forEach(todo => 
        {
            // create a function that returns the task li to reduce clutter
            let li = TodoDisplayHelper(todo, todos, completed_todos);
            ul.appendChild(li);
        });
        listdiv.appendChild(ul);
        document.getElementById("container").append(listdiv);
        //listdiv;
    };
    // create the function that returns the li which houses the Task visual representation
    let TodoDisplayHelper = (todo, todos, completed_todos) =>
    {
        // Create a function that handles checking out the task.
        var HandleCheckTask = () =>
        {
            addTodo(completed_todos, todo.description, todo.title, todo.dueDate, todo.priority);
            deleteTodo(todos, todo);
            document.getElementById("container").innerHTML = "";
            DisplayTodos(todos, completed_todos);
        };
        let li = document.createElement("li");
        let task = DivBuilder("class", "todo");
        // because the nav houses the title, due date, the edit and delete buttons, it requires
        // a helper function.
        let nav = TodoNavHelper(todo, todos, completed_todos);
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
    let TodoNavHelper = (todo, todos, completed_todos) =>
    {
        // Create function HandleEditTask that is called when clicking on the Edit button
        var HandleEditTask =  (e) =>
        {
            let li = e.target.closest("li");
            li.append(EditTodoDisplay(todo, todos, completed_todos));
        };
        // Create function HandleDeleteTask that is called when clicking on the delete button        
        var HandleDeleteTask = (e) =>
        {
            deleteTodo(todos, todo);
            let taskToDelete = e.target.closest("li");
            taskToDelete.remove();
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
            DisplayTodos(todos, completed_todos);
        };
        
        // On discard, remove the parallel Task
        form.addEventListener("submit", handleSubmitEdit);
        return task;
    }

    let checkFactory = (e) =>
    {
        return e.target.innerText;
    }
    // Create the modal for creating a new Task, the modal should show up after 
    // clicking the add task button in the sidebar
    let enterNewTask = (projects, project) =>
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
                let modal = document.getElementById("modal");
                modal.style.display = "none";
                let title = document.getElementById("title").value;
                let description = document.getElementById("description").value;
                let dueDate = document.getElementById("dueDate").value;
                let priority = document.getElementById("priority").value;
                addTodo(project.todos, title, description, dueDate, priority);
                if (project.name != "All")
                {
                    addTodo(projects.find(x => x.name == "All").todos, title, description, dueDate, priority);
                }
                document.getElementById("container").innerHTML = "";
                DisplayTodos(project.todos, project.completed_todos);
            }

            // Prevent adding multiple event listeners for 'submit' on the modalForm
            let addTaskForm = document.getElementById("modalForm");
            addTaskForm.removeEventListener("submit", handleSubmit);
            addTaskForm.addEventListener("submit", handleSubmit);
    }
    
    let enterNewFactory = (projects) =>
    {
        function onLiClick(currentProject)
            {
                ProjectPageBuilder.DisplayTodos(currentProject.todos, currentProject.completed_todos);
                enterNewTask(currentProject.todos, currentProject.completed_todos); // add to event listener
            };
        // separate the creation of an li with an event listener into its own function
        function handleSubmit(e) {
            e.preventDefault();
            let projectName = document.getElementById("newProjectName").value;
            let newProject = new ProjectBuild(projectName);
            projects.push(newProject);
            let currentProject = newProject;
            ProjectPageBuilder.DisplayTodos(currentProject.todos, currentProject.completed_todos)
            let projectli = commonBuilders.TextBuilder("li", projectName, null);
            projectli.removeEventListener("click", () => onLiClick(currentProject));
            projectli.addEventListener("click", () => onLiClick(currentProject));
            document.getElementById("projects").append(projectli);
        }
        let projectForm = document.getElementById("projectForm");
        projectForm.removeEventListener("submit", handleSubmit);
        projectForm.addEventListener("submit", handleSubmit);
    }

    //let NewProjectDisplay()
    return {DisplayTodos, enterNewTask, enterNewFactory, enterNewTask};
})();

export default ProjectPageBuilder;