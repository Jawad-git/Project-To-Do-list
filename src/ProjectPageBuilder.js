import commonBuilders from './path/to/commonBuilders.js';
import TodosFactory from './Todos-factory.js';
import ProjectFactory from './ProjectFactory';

let ProjectPageBuilder = (function(){
    let DivBuilder = commonBuilders.DivBuilder;
    let TextBuilder = commonBuilders.TextBuilder;
    let ButtonBuilder = commonBuilders.ButtonBuilder;
    let deleteTodo = TodosFactory.deleteButton;
    let addTodo = ProjectFactory.addTodo;

    let DisplayTodos = (todos, completed_todos) =>
    {
        let listdiv = DivBuilder("class", "lists");
        let ul = document.createElement("ul");
        todos.forEach(todo => {
            let li = TodoDisplayHelper(todo, todos, completed_todos);
            ul.appendChild(li);
        });
        listdiv.appendChild(ul);
        return listdiv;
    }
    
    let TodoDisplayHelper = (todo, todos, completed_todos) =>
        {
            let li = document.createElement("li");
            let task = DivBuilder("class", "todo");
            let nav = TodoNavHelper(todo, todos, completed_todos);
            let taskDescription = TextBuilder("p", todo.description, "taskDescription");
            let taskFooter = DivBuilder("taskFooter");
            let taskPriority = TextBuilder("h6", todo.priority, "taskPriority");
            let completeButton = document.createElement("button");
            taskFooter.append(taskPriority, completeButton);
            completeButton.addEventListener("click", () =>
            {
                addTodo(completed_todos, todo.description, todo.title, todo.dueDate, todo.priority);
                deleteTodo(todos, todo);
                document.getElementById("container").innerHTML = "";
                DisplayTodos(todos, completed_todos);
            })
            task.append(nav, taskDescription, taskFooter);
            li.appendChild(task);
            return li;
        }
        
        let TodoNavHelper = (todo, todos, completed_todos) =>
        {
            let nav = DivBuilder("class", displayNav);
            let taskTitle = TextBuilder("h1", todo.title, "taskTitle");
            let taskDueDate = TextBuilder("h4", todo.dueDate, "taskTDueDate");
            let editButton = document.createElement("button");
            editButton.className = "editButton";
            let deleteButton = document.createElement("button");
            deleteButton.className = "deleteButton";
            editButton.addEventListener("click", () =>
            {
                li.append(EditTodoDisplay(todo, todos, completed_todos));
            });

            deleteButton.addEventListener("click", (e) =>
            {
                deleteTodo(todos, todo);
                taskToDelete = e.target.closest("li");
                taskToDelete.remove();
            });
            nav.append(taskTitle, taskDueDate, editButton, deleteButton);
            return nav;
        }
    let EditTodoDisplay = (todo, todos, completed_todos) =>
    {
        let task = DivBuilder("class", "todoInput");
        let form = document.createElement("form");
        let nav = DivBuilder("class", displayNav);
        let titleInput = document.createElement("input");
        titleInput.className = "titleInput";
        titleInput.setAttribute("placeholder", "New Title..");

        let dueDateInput = document.createElement("input"); // should be date here
        dueDateInput.className = "dueDateInput";
        dueDateInput.setAttribute("placeholder", "New Due date in the format YYYY-MM-DD..");
        nav.append(titleInput, DueDateInput);

        let descriptionInput = document.createElement("input");
        descriptionInput.className = "descriptionInput";
        descriptionInput.setAttribute("placeholder", "New Description..");


        let priorityInput = document.createElement("input");
        priorityInput.className = "titleInput";
        priorityInput.setAttribute("placeholder", "New priority, the smaller the number the higher the priority..");

        let taskFooter = DivBuilder("class", "taskFooterInput");

        let discardButton = ButtonBuilder("Discard Edit", "discardEdit", handleDiscardEdit);
        let submitButton = ButtonBuilder("Submit Edit", "submitEdit", handleSubmitEdit);

        document.createElement("button");
        submitButton.className = "submitEdit";

        nav.append(titleInput, dueDateInput);
        taskFooter.append(priorityInput, discardButton, submitButton);
        form.append(nav, descriptionInput, taskFooter);
        task.appendChild(form);

        let handleSubmitEdit =  (e) =>
        {
            e.preventDefault();
            deleteTodo(todos, todo);
            addTodo(todos, titleInput.value, dueDateInput.value, descriptionInput.value, priorityInput.value);
            document.getElementById("container").innerHTML = "";
            DisplayTodos(todos, completed_todos);
        };

        let handleDiscardEdit = () =>
        {
            task.remove();
        }

        return task;
    }

    //let NewProjectDisplay()
    return {DisplayTodos}
})();