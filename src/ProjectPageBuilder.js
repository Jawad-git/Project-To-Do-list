import commonBuilders from './CommonBuilders.js';
import TodosFactory from './Todos-factory.js';
import ProjectFactory from './ProjectFactory';

let ProjectPageBuilder = (function(){

    let DivBuilder = commonBuilders.DivBuilder;
    let TextBuilder = commonBuilders.TextBuilder;
    let ButtonBuilder = commonBuilders.ButtonBuilder;
    let InputBuilder = commonBuilders.InputBuilder;
    let deleteTodo = TodosFactory.deleteButton;
    let addTodo = ProjectFactory.addTodo;

    // Create a function to display the todos.
    let DisplayTodos = (todos, completed_todos) =>
    {
        let listdiv = DivBuilder("class", "lists");
        let ul = document.createElement("ul");
        todos.forEach(todo => 
        {
            // create a function that returns the task li to reduce clutter
            let li = TodoDisplayHelper(todo, todos, completed_todos);
            ul.appendChild(li);
        });
        listdiv.appendChild(ul);
        return listdiv;
    };
    // create the function that returns the li which houses the Task visual representation
    let TodoDisplayHelper = (todo, todos, completed_todos) =>
    {
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
        
        // Create a function that handles checking out the task.
        var HandleCheckTask = () =>
        {
            addTodo(completed_todos, todo.description, todo.title, todo.dueDate, todo.priority);
            deleteTodo(todos, todo);
            document.getElementById("container").innerHTML = "";
            DisplayTodos(todos, completed_todos);
        };
        return li;
    };
    // Create function TodoNavHelper that helps in creating the nav of a task    
    let TodoNavHelper = (todo, todos, completed_todos) =>
    {
        let nav = DivBuilder("class", "displayNav");
        let taskTitle = TextBuilder("h1", todo.title, "taskTitle");
        let taskDueDate = TextBuilder("h4", todo.dueDate, "taskTDueDate");
        let editButton = ButtonBuilder("Edit Task", "editButton", HandleEditTask);
        let deleteButton = ButtonBuilder("Delete Task", "deleteButton", HandleDeleteTask);
        
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
            taskToDelete = e.target.closest("li");
            taskToDelete.remove();
        };
        nav.append(taskTitle, taskDueDate, editButton, deleteButton);
        return nav;
    }
    // Create function that creates a "shadow" parallel Task near the one you want to edit
    // And it will be used to edit the real task
    let EditTodoDisplay = (todo, todos, completed_todos) =>
    {
        let task = DivBuilder("class", "todoInput");
        let form = document.createElement("form");
        form.setAttribute("id", "editTaskForm");
        let nav = DivBuilder("class", displayNav);
        let titleInput = InputBuilder("input", "titleInput", "New Title..");
        let dueDateInput = InputBuilder("input", "dueDateInput", "New Due date in the format YYYY-MM-DD.."); // should be date here
        let descriptionInput = InputBuilder("input", "descriptionInput", "New Description..");
        let priorityInput = InputBuilder("input", "priorityInput", "New priority, the smaller the number the higher the priority..");
    
        let taskFooter = DivBuilder("class", "taskFooterInput");

        let discardButton = ButtonBuilder("Discard Edit", "discardEdit", handleDiscardEdit);
        let submitButton = ButtonBuilder("Submit Edit", "submitEdit", handleSubmitEdit);

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
            document.getElementById("container").innerHTML = "";
            DisplayTodos(todos, completed_todos);
        };

        // On discard, remove the parallel Task
        var handleDiscardEdit = () =>
        {
            task.remove();
        }

        return task;
    }
    // Create the modal for creating a new Task, the modal should show up after 
    // clicking the add task button in the sidebar
    let enterNewTask = (todos, completed_todos) =>
    {
        document.addEventListener('DOMContentLoaded', () => {
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
        
                var addTaskForm = document.getElementById("modalForm");
                addTaskForm.addEventListener("submit", (e) =>
                {
                    e.preventDefault();
                    let title = document.getElementById("title");
                    let description = document.getElementById("description");
                    let dueDate = document.getElementById("dueDate");
                    let priority = document.getElementById("priority");
                    addTodo(todos, title.value, dueDate.value, description.value, priority.value);
                    document.getElementById("container").innerHTML = "";
                    DisplayTodos(todos, completed_todos);
                })
            }
        
            document.getElementById("addTask").addEventListener("click", openModal);
        });
    }
    //let NewProjectDisplay()
    return {DisplayTodos, enterNewTask}
})();

export default ProjectPageBuilder;