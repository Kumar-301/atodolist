let enterList = document.getElementById("list-container");
let saveTodoButton = document.getElementById("saveTodoButton");



function getTodoListFromLocalStorage() {
  let stringifiedTodoList = localStorage.getItem("todoList");
  let parsedTodoList = JSON.parse(stringifiedTodoList);
  if (parsedTodoList === null) {
    return [];
  } else {
    return parsedTodoList;
  }
}

let todoList = getTodoListFromLocalStorage();
let todosCount = todoList.length;
saveTodoButton.onclick = function () {
  localStorage.setItem("todoList", JSON.stringify(todoList));
};
  

function onTodoStyleChange(checkboxId,labelId,todoId){
    let checkboxElement = document.getElementById(checkboxId);
    let labelElement = document.getElementById(labelId);
    labelElement.classList.toggle('checked');   
    
    let todoObjectIndex = todoList.findIndex(function(eachTodo) {
      let eachTodoId = "todo" + eachTodo.uniqueNumber;
  
      if (eachTodoId === todoId) {
        return true;
      } else {
        return false;
      }
    });
  
    let todoObject = todoList[todoObjectIndex];
  
    if(todoObject.isChecked === true){
      todoObject.isChecked = false;
    } else {
      todoObject.isChecked = true;
    }
  

}
  function onDeleteList(todoId) {
    let todoElement = document.getElementById(todoId);
    
    enterList.removeChild(todoElement);
    let deleteElementIndex = todoList.findIndex(function(eachTodo) {
      let eachTodoId = "todo" + eachTodo.uniqueNumber;
      if (eachTodoId === todoId) {
        return true;
      } else {
        return false;
      }
    });
  
    todoList.splice(deleteElementIndex, 1);
  
  }


  function createAndAppendTodo(todo) {
    let todoId = 'todo' + todo.uniqueNumber;
    let checkboxId = 'checkbox' + todo.uniqueNumber;
    let labelId = 'label' + todo.uniqueNumber;

    let todoElement = document.createElement("li");
    todoElement.classList.add("todo-item-container","d-flex", "flex-row","m-2");
    todoElement.id = todoId;
    enterList.appendChild(todoElement);
  
    let inputElement = document.createElement("input");
    inputElement.type = "checkbox";
    inputElement.id = checkboxId;
    inputElement.checked = todo.isChecked;
    inputElement.classList.add("checkbox-input");
    inputElement.onclick = function() {
        onTodoStyleChange(checkboxId, labelId,todoId);
      }  
  
    todoElement.appendChild(inputElement);
  
    let labelContainer = document.createElement("div");
    labelContainer.classList.add("label-container");
    todoElement.appendChild(labelContainer);
  
    let labelElement = document.createElement("label");
    labelElement.setAttribute("for", checkboxId);
    labelElement.id= labelId;
    labelElement.classList.add("checkbox-label");
    labelElement.textContent = todo.text;
    if (todo.isChecked === true) {
      labelElement.classList.add("checked");
    }
    labelContainer.appendChild(labelElement);
  

  
    let deleteButton = document.createElement("button");
    deleteButton.classList.add("btn" ,"btn-danger");
    deleteButton.textContent = "delete";
    deleteButton.onclick = function () {
        onDeleteList(todoId);
      };
    todoElement.appendChild(deleteButton);
    

  }
  for (let todo of todoList) {
    createAndAppendTodo(todo);
  }
  function addTask(){
    let inputValue = document.getElementById("entervalue");
    userValue = inputValue.value;
    if(userValue == ""){
        alert("enter valid text")
        return;
    }
   todosCount = todosCount + 1;
   let newTodo = {
    text: userValue,
    uniqueNumber: todosCount,
    isChecked:false
  };
  todoList.push(newTodo);
  createAndAppendTodo(newTodo);
  inputValue.value = "";
    
}

 