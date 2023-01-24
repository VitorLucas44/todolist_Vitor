//SELECTEURS
let todoInput = document.querySelector(".todo-input");
let todoButton = document.querySelector(".todo-button");
let todoList = document.querySelector(".todo-list");
let filterOption = document.querySelector(".filter-todo");
todoList.addEventListener("click", function(event) {
    if (event.target.classList.contains("modify-btn")) {
        modifyTodo(event);
    }
});

//ECOUTEURS
document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("input", filterTodo);
todoDiv.addEventListener("click", modifyTodo);

//FUNCTIONS
function addTodo(event) {
    event.preventDefault();
    //Todo DIV
    let todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    //Créer le Li
    let newTodo = document.createElement("li");
    newTodo.innerText = todoInput.value;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);
    //Ajouter la todo au localstorage
    saveLocalTodos(todoInput.value);
    //Bouton Modifier
    let modifyButton = document.createElement("button");
    modifyButton.innerHTML = '<i class="fas fa-edit"></i>';
    modifyButton.classList.add("modify-btn");
    todoDiv.appendChild(modifyButton);
    modifyButton.addEventListener("click", modifyTodo);
    //Bouton Check
    let completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);
    //Bouton Supprimer
    let trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);
    //AJOUTER NOTRE TODO À TODO-LIST
    todoList.appendChild(todoDiv);
    todoInput.value= "";
}

if (todoText.innerText !== "") {
    let modifyInput = document.createElement("input");
    modifyInput.value = todoText.innerText;
    modifyInput.classList.add("modify-input");
    todo.replaceChild(modifyInput, todoText);
    item.innerHTML = '<i class="fas fa-save"></i>';
    item.classList.remove("modify-btn");
    item.classList.add("save-btn");
    item.removeEventListener("click", modifyTodo);
    item.addEventListener("click", saveTodo);
}

//MODIFY TODO
function modifyTodo(e) {
    let item = e.target;
    if (item.classList[0] === "modify-btn") {
        const todo = item.closest('.todo');
        let todoText = todo.querySelector(".todo-item");
        if (todoText.innerText !== "") {
            let modifyInput = document.createElement("input");
            modifyInput.value = todoText.innerText;
            modifyInput.classList.add("modify-input");
            todo.replaceChild(modifyInput, todoText);
            item.innerHTML = '<i class="fas fa-save"></i>';
            item.classList.remove("modify-btn");
            item.classList.add("save-btn");
            item.removeEventListener("click", modifyTodo);
            item.addEventListener("click", saveTodo);
        }
    }
}

//SAVE MODIFIED TODO
function saveTodo(e) {
    let item = e.target;
    if (item.classList[0] === "save-btn") {
        const todo = item.closest('.todo');
        let modifyInput = todo.querySelector(".modify-input");
        let todoText = todo.querySelector(".todo-item");
        if (modifyInput.value !== "") {
            //update the value in the localstorage
            updateLocalTodo(modifyInput.value,todoText.innerText);
            todoText.innerText = modifyInput.value;
            todo.replaceChild(todoText, modifyInput);
            item.innerHTML = '<i class="fas fa-edit"></i>';
            item.classList.remove("save-btn");
            item.classList.add("modify-btn");
            item.removeEventListener("click", saveTodo);
            item.addEventListener("click", modifyTodo);
        }
    }
}


function updateLocalTodos(todo) {
//Get existing todos from localStorage
let todos;
if (localStorage.getItem("todos") === null) {
todos = [];
} else {
todos = JSON.parse(localStorage.getItem("todos"));
}
//Find the index of the todo being modified
let index = todos.indexOf(todo);
//Update the todo in the array
todos[index] = todo;
//Update localStorage
localStorage.setItem("todos", JSON.stringify(todos));
}

//DELETE TODO
function deleteCheck(e) {
let item = e.target;
    if (item.classList[0] === "trash-btn") {
        const todo = item.parentElement;
        todo.classList.add("fall");
        removeLocalTodos(todo);
        todo.addEventListener("transitionend", function () {
            todo.remove();
    });
}


    //CHECK MARK
    if (item.classList[0] === "complete-btn") {
        const todo = item.parentElement;
        todo.classList.toggle("completed");
    }
}

function filterTodo(e) {
    const todos = todoList.childNodes;
    todos.forEach(function (todo) {
        switch (e.target.value) {
            case "all":
            todo.style.display = "flex";
            break;
            case "completed":
            if (todo.classList.contains("completed")) {
                todo.style.display = "flex";
            } else {
                todo.style.display = "none";
            }
            break;
            case "uncompleted":
            if (!todo.classList.contains("completed")) {
                todo.style.display = "flex";
            } else {
                todo.style.display = "none";
            }
            break;
        }
    });
}


function saveLocalTodos(todo) {
    //Checker si il y a des items existants
        let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
        todos.push(todo);
        localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.forEach(function (todo) {


//Todo DIV
let todoDiv = document.createElement("div");
todoDiv.classList.add("todo");


//Créer le Li
let newTodo = document.createElement("li");
newTodo.innerText = todo;
newTodo.classList.add("todo-item");
todoDiv.appendChild(newTodo);


//Bouton Check
let completedButton = document.createElement("button");
completedButton.innerHTML = '<i class="fas fa-check"></i>';
completedButton.classList.add("complete-btn");
todoDiv.appendChild(completedButton);


//Bouton Supprimer
let trashButton = document.createElement("button");
trashButton.innerHTML = '<i class="fas fa-trash"></i>';
trashButton.classList.add("trash-btn");
todoDiv.appendChild(trashButton);


//AJOUTER NOTRE TODO À TODO-LIST
        todoList.appendChild(todoDiv);
    });
}

function removeLocalTodos(todo) {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
}
updateLocalTodos(modifyInput.value);
