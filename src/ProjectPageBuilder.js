import commonBuilders from './CommonBuilders.js';
import TodosFactory from './Todos-factory.js';
import ProjectFactory from './ProjectFactory.js';
// maybe remove the project and use currentproject to display dom
let ProjectPageBuilder = (function(){
    
    const importanceLevels = ["Critical", "High", "Medium", "Low"];
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
        ProjectFactory.currentProject.todoList.forEach(todo => 
        {
            // create a function that returns the task li to reduce clutter
            let li = TodoDisplayHelper(todo);
            ul.appendChild(li);
        });

        let completed;
        if (ProjectFactory.currentProject.completedList.length > 0)
        {
            completed = commonBuilders.TextBuilder("h1", "Completed Tasks!", "completedTasksHeader");
        }    

        ProjectFactory.currentProject.completedList.forEach(todo => 
        {
            // create a function that returns the task li to reduce clutter
            let li = CompletedDisplayHelper(todo);
            ulCompleted.appendChild(li);
        });
        
        listdiv.appendChild(ul);
        if (completed)
        {
            listdiv.appendChild(completed);
        }
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
            DisplayTodos();
        };
        let li = document.createElement("li");
        let task = DivBuilder("class", "todo");
        task.classList.add(`${importanceLevels[todo.priority]}`);
        // because the nav houses the title, due date, the edit and delete buttons, it requires
        // a helper function.
        let nav = TodoNavHelper(todo);
        let taskDescription = TextBuilder("p", todo.description, "taskDescription");
        let taskFooter = DivBuilder("class", "taskFooter");
        let taskPriority = TextBuilder("h6", importanceLevels[todo.priority], "taskPriority");
        let completeButton = ButtonBuilder("Check Task", "btn confirm", HandleCheckTask);
        taskFooter.append(taskPriority, completeButton);
        task.append(nav, taskDescription, taskFooter);
        li.appendChild(task);
        
        return li;
    };
    // Create function TodoNavHelper that helps in creating the nav of a task    
    let TodoNavHelper = (todo) =>
    {
        // Create function HandleEditTask that is called when clicking on the Edit button
        var HandleEditTask =  (e) =>
        {
            let li = e.target.closest("li");
            let edit = document.querySelector('.todoInput');
            if (edit)
            {
                if (li.contains(edit)){
                    edit.remove();
                    return;
                }
                edit.remove();
            }
            li.append(EditTodoDisplay(todo));
        };
        // Create function HandleDeleteTask that is called when clicking on the delete button        
        var HandleDeleteTask = (e) =>
        {
            ProjectFactory.deleteTodo(todo);
            DisplayTodos();
        };
        let nav = DivBuilder("class", "displayNav");
        let taskTitle = TextBuilder("h1", todo.title, "taskTitle");
        let taskDueDate = TextBuilder("h4", todo.dueDate, "taskDueDate");
        let editButton = ButtonBuilder("Edit Task", "btn edit", HandleEditTask);
        let deleteButton = ButtonBuilder("Delete Task", "btn delete", HandleDeleteTask);
        let titleAndDateWrapper = DivBuilder("class", "titleAndDateWrapper");
        let buttonWrapper = DivBuilder("class", "buttonWrapper");
        titleAndDateWrapper.append(taskTitle, taskDueDate);
        buttonWrapper.append(editButton, deleteButton);
        nav.append(titleAndDateWrapper, buttonWrapper);
        return nav;
    }

    // Create function that creates a "shadow" parallel Task near the one you want to edit
    // And it will be used to edit the real task
    let EditTodoDisplay = (todo) =>
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
        titleInput.setAttribute('value', `${todo.title.slice(0, todo.title.length - 2)}`);
        let dueDateInput = InputBuilder("input", "dueDateInput", "New Due date in the format YYYY-MM-DD..");
        dueDateInput.setAttribute("type", "date"); // should be date here
        dueDateInput.setAttribute("value", `${todo.dueDate}`);
        let descriptionInput = InputBuilder("textarea", "descriptionInput", "New Description..");
        descriptionInput.value = todo.description;
        let priorityInput = document.createElement("select");
        priorityInput.setAttribute("class", "priorityInput");
        let valueCounter = 3;
        importanceLevels.forEach(level => {
            let option = document.createElement("option");
            option.value = valueCounter; // set the value of the option
            option.textContent = importanceLevels[valueCounter];  // set the displayed text
            priorityInput.appendChild(option);  // append option to select
            valueCounter--;      
        });
        //priorityInput.value = todo.priority;

    
        let taskFooter = DivBuilder("class", "taskFooterInput");
        
        let discardButton = ButtonBuilder("Discard Edit", "btn delete", handleDiscardEdit);
        discardButton.type ="button";
        let submitButton = ButtonBuilder("Submit Edit", "btn confirm", null);

        nav.append(titleInput, dueDateInput);
        taskFooter.append(priorityInput, discardButton, submitButton);
        form.append(nav, descriptionInput, taskFooter);
        task.appendChild(form);

        // On Submit, realize the edits back into the todos
        var handleSubmitEdit =  (e) => // You make want to fix the submit, event handler on button or form?!
        {
            e.preventDefault();
            todo.editTodo(titleInput.value + ', ', dueDateInput.value, descriptionInput.value, priorityInput.value);               
            DisplayTodos();
        };
        
        // On discard, remove the parallel Task
        form.addEventListener("submit", handleSubmitEdit);
        return task;
    }
    
    let CompletedDisplayHelper = (todo) =>
        {
        // Create a function that handles checking out the task.
        var HandleUnCheckTask = () =>
        {
            ProjectFactory.uncheckTodo(todo);
            DisplayTodos();
        };
        var HandleDeleteTask = (e) =>
        {
            ProjectFactory.deleteTodo(todo);
            DisplayTodos();
        };
        let li = document.createElement("li");
        let task = DivBuilder("class", "todo");
        // because the nav houses the title, due date, the edit and delete buttons, it requires
        // a helper function.
        let nav = DivBuilder("class", "displayNav");
        let taskTitle = TextBuilder("h1", todo.title, "taskTitle");
        let taskDueDate = TextBuilder("h4", todo.dueDate, "taskTDueDate");
        let deleteButton = ButtonBuilder("Delete Task", "btn delete", HandleDeleteTask);
        let taskDescription = TextBuilder("p", todo.description, "taskDescription");
        let taskFooter = DivBuilder("taskFooter");
        let taskPriority = TextBuilder("h6", importanceLevels[todo.priority], "taskPriority");
        task.classList.add(`${importanceLevels[todo.priority]}`);
        
        let unCheckButton = ButtonBuilder("Uncheck Task", "btn confirm", HandleUnCheckTask);
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
        let openModal = () => 
        {
            var modal = document.getElementById("modal");
            var closeBtn = document.querySelector(".closeBtn");
    
            // Show the modal when the addTask button is clicked
            modal.style.display = "block";
        
            // Close the modal when the close button is clicked
            closeBtn.onclick = function() {
            modal.style.display = "none";
        };
        
        
                // Close the modal if the user clicks outside of it
            window.onclick = function(event) 
            {
                if (event.target == modal) 
                {
                    modal.style.display = "none";
                }
            };
        
        }
        document.getElementById("addTask").removeEventListener("click", openModal);
        document.getElementById("addTask").addEventListener("click", openModal);

        function handleSubmit(e) 
        {
            e.preventDefault();
            console.log(ProjectFactory.currentProject);
            let modal = document.getElementById("modal");
            modal.style.display = "none";
            let title = document.getElementById("title").value;
            let description = document.getElementById("description").value;
            let dueDate = document.getElementById("dueDate").value;
            let priority = document.getElementById("priority").value;
            addTodo(title + ", ", dueDate, description, priority, ProjectFactory.currentProject.name);
            DisplayTodos();
        }

            // Prevent adding multiple event listeners for 'submit' on the modalForm
            let addTaskForm = document.getElementById("modalForm");
            addTaskForm.removeEventListener("submit", handleSubmit);
            addTaskForm.addEventListener("submit", handleSubmit);
    }
    
    function onLiClick(newProject)
    {
        ProjectFactory.currentProject = newProject;
        console.log(ProjectFactory.currentProject);
        ProjectPageBuilder.DisplayTodos();
    };
        
    // separate the creation of an li with an event listener into its own function
    function handleSubmitFactory(e) 
    {
        e.preventDefault();
        let projectName = document.getElementById("newProjectName").value;
        AddProject(projectName);
        ProjectPageBuilder.DisplayTodos();
    }
    function AddProject (projectName) {
        let newProject = ProjectFactory.createProject(projectName);
        let projectli = commonBuilders.TextBuilder("li", projectName, null);
        projectli.removeEventListener("click", () => onLiClick(newProject));
        projectli.addEventListener("click", () => onLiClick(newProject));
        document.getElementById("projects").append(projectli);
    }

    let EnterNewFactory = () =>
        {
                
            let projectForm = document.getElementById("projectForm");
            projectForm.removeEventListener("submit", handleSubmitFactory);
            projectForm.addEventListener("submit", handleSubmitFactory);
        }
        

    //let NewProjectDisplay()
    return {DisplayTodos, enterNewTask, EnterNewFactory, enterNewTask, AddProject};
})();

export default ProjectPageBuilder;