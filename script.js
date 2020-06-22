// SELECTORS
const todoInput=document.querySelector(".todo-creator");
const todoButton=document.querySelector(".add-todo-button");
const todoList=document.querySelector(".todo-items")

// EVENTLISTENERS
document.addEventListener("DOMContentLoaded",getTodos)
todoButton.addEventListener("click", addTodo);
todoList.addEventListener('click',deleteCheck)

//FUNCTIONS

function addTodo(e) {
    e.preventDefault();

    const todoDiv=document.createElement("div");
    todoDiv.classList.add("todo");

    const newTodo=document.createElement('li');
    newTodo.innerText=todoInput.value;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);

    // ADD TO LOCALSTORAGE
    saveTodo(todoInput.value)

    const compliteButton=document.createElement('button');
    compliteButton.innerHTML='<i class="fas fa-check"></i>';
    compliteButton.classList.add("complete-button")
    todoDiv.appendChild(compliteButton)

    const deleteButton=document.createElement('button');
    deleteButton.innerHTML='<i class="fas fa-trash"></i>';
    deleteButton.classList.add("trash-button")
    todoDiv.appendChild(deleteButton);

    todoList.appendChild(todoDiv)


    todoInput.value=""
}

function deleteCheck(e) {
    const item=e.target
    // DELETE
    if(item.classList[0]==='trash-button') {
        const todo= item.parentElement
        todo.classList.add('falling')
        removeTodoFromLocalStorage(todo)
        todo.addEventListener("transitionend", function() {
            todo.remove()
        })
    }

    // CHECK
    if(item.classList[0] === 'complete-button'){
        const todo= item.parentElement
        todo.classList.toggle("completed")
    }

}


function saveTodo(todo) {
    let todos;
    if(localStorage.getItem("todos")===null){
        todos=[]
    } else {
        todos=JSON.parse(localStorage.getItem("todos"))
    }
    todos.push(todo)
    localStorage.setItem("todos",JSON.stringify(todos))
}


function getTodos(){
    let todos;
    if(localStorage.getItem("todos")===null){
        todos=[]
    } else {
        todos=JSON.parse(localStorage.getItem("todos"))
    }
todos.forEach(function(todo){
    const todoDiv=document.createElement("div");
    todoDiv.classList.add("todo");

    const newTodo=document.createElement('li');
    newTodo.innerText=todo;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);

    const compliteButton=document.createElement('button');
    compliteButton.innerHTML='<i class="fas fa-check"></i>';
    compliteButton.classList.add("complete-button")
    todoDiv.appendChild(compliteButton)

    const deleteButton=document.createElement('button');
    deleteButton.innerHTML='<i class="fas fa-trash"></i>';
    deleteButton.classList.add("trash-button")
    todoDiv.appendChild(deleteButton);

    todoList.appendChild(todoDiv)
})

}

function removeTodoFromLocalStorage(todo) {
    let todos;
    if(localStorage.getItem("todos")===null){
        todos=[]
    } else {
        todos=JSON.parse(localStorage.getItem("todos"))
    }
    const todoIndex=todo.children[0].innerText
    todos.splice(todos.indexOf(todoIndex),1)    
    localStorage.setItem("todos",JSON.stringify(todos))
}