//Selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

//Event Listener
document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterTodo);


//Functions
function addTodo(event){

    // prevent form from submitting
    event.preventDefault();

    //Todo Div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    //create list
    const newTodo = document.createElement("li");
    newTodo.innerText = todoInput.value;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);

    //Add todo to local Storage
    saveLocalTodos(todoInput.value);

    //Mark Button
    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("complete-button");
    todoDiv.appendChild(completedButton);

    //Trash Button
    const deletedButton = document.createElement("button");
    deletedButton.innerHTML = '<i class="fas fa-trash"></i>';
    deletedButton.classList.add("trash-button");
    todoDiv.appendChild(deletedButton);

    //Append to List
    todoList.appendChild(todoDiv);

    //Clear todo input field
    todoInput.value = "";

}

function deleteCheck(event){
    // console.log(event2.target); (to check in inspect console that is it woking or not.)

    const item = event.target;

    //Delete Todo
    if(item.classList[0] === "trash-button"){
        const todo = item.parentElement;
        //Animation
        todo.classList.add("fall");
        removeLocalStorageTodos(todo);
        todo.addEventListener('transitionend', function(){
            todo.remove();
        });
    }

    //Check Mark
    if(item.classList[0] === 'complete-button'){
        const todo = item.parentElement;
        todo.classList.toggle("completed");
    }

}

function filterTodo(event) {
    const todos = todoList.childNodes;
    todos.forEach(function(todo) {
      switch (event.target.value) {
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

  function saveLocalTodos(todo){
      let todos;
      if(localStorage.getItem("todos") === null){
            todos=[];
      }else{
          todos = JSON.parse(localStorage.getItem("todos"));
      }

      todos.push(todo);
      localStorage.setItem("todos", JSON.stringify(todos));
  }

  function getTodos(){
      let todos;
      if(localStorage.getItem("todos") === null){
            todos=[];
      }else{
          todos = JSON.parse(localStorage.getItem("todos"));
      }
      todos.forEach(function(todo){
            //Todo Div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    //create li
    const newTodo = document.createElement("li");
    newTodo.innerText = todo;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);

    //Mark Button
    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("complete-button");
    todoDiv.appendChild(completedButton);

    //Trash Button
    const deletedButton = document.createElement("button");
    deletedButton.innerHTML = '<i class="fas fa-trash"></i>';
    deletedButton.classList.add("trash-button");
    todoDiv.appendChild(deletedButton);

    //Append to List
    todoList.appendChild(todoDiv);
      });

  }


  function removeLocalStorageTodos(todo){
    let todos;
    if(localStorage.getItem("todos") === null){
          todos=[];
    }else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
    }