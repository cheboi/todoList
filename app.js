let form = document.getElementById("modal-1");
let textInput = document.getElementById("textInput");
let dateInput = document.getElementById("dateInput");
let textarea = document.getElementById("descriptionArea");
let msg = document.getElementById("msg");
let tasks = document.getElementById("tasks");
let tasks2 = document.getElementById("tasks2");
let add = document.getElementById("add");
let modal = document.querySelector(".modal");

// todo logic

form.addEventListener("submit", (e) => {
  e.preventDefault();
  formValidation();
});

let formValidation = () => {
  if (textInput.value === "") {
    console.log("failure");
    msg.innerHTML = "Task cannot be blank";
  } else {
    console.log("success");
    msg.innerHTML = "";
    addData();
    add.setAttribute("");
    add.click();

    (() => {
      add.setAttribute("");
    })();
  }
};

// data to display
let todoData = [];

const addData = () => {
  todoData.push({
    text: textInput.value,
    description: textarea.value,
    date: dateInput.value,
  });

  localStorage.setItem("todoData", JSON.stringify(todoData));
  createTasks();
};


const resetForm = () => {
  textInput.value = "";
  textarea.value = "";
  dateInput.value = "";
};


let createTasks = () => {
   tasks.innerHTML = "";
  todoData.forEach((x, y) => {
    return (tasks.innerHTML += `
      <li  id=${y} class='task-list'>
        <input type="checkbox" class="checkBox" onClick="changeListener(this)" >
        <span class="title-text">${x.text}</span>
        <br />
        <p>${x.description}</p>
        <br />
        <span class="date-text">Due date: ${x.date}</span>
        <span class="btn-utils">
          <button onClick= "editTask(this)" class = "open-modal edit" data-target="modal-1"> Edit</button>
          <button onClick ="deleteTask(this);createTasks()" class="btn-delete"> Delete</button>
        </span>
      </li>
    `);
  });
    resetForm();
};

(() => {
  todoData = JSON.parse(localStorage.getItem("todoData")) || [];
  createTasks();
})();

const deleteTask = (e) => {
  e.parentElement.parentElement.remove();
  todoData.splice(e.parentElement.parentElement.id, 1);

  localStorage.setItem("todoData", JSON.stringify(todoData));
  // console.log(todoData);
};

// edit
const editTask = (e) => {
  let selectedTask = e.parentElement.parentElement;
  console.log(selectedTask)

  textInput.value = selectedTask.children[1].innerHTML;
  textarea.value = selectedTask.children[3].innerHTML;
  dateInput.value = selectedTask.children[4].innerHTML;

  deleteTask(e);
};

let Check = document.querySelectorAll(".checkBox");

let completedData = [];

const changeListener = (e) => { 
  let completedDat = todoData.splice(e.parentElement.id, 1);
  localStorage.setItem("todoData", JSON.stringify(todoData));
  completedData.push(...completedDat)
  localStorage.setItem("completedData", JSON.stringify(completedData))
  
  completedTask()
  createTasks()
}

const deleteCompletedTask = (e) => {
  e.parentElement.parentElement.remove();
  completedData.splice(e.parentElement.parentElement.id, 1);

  localStorage.setItem("completedData", JSON.stringify(completedData));
};

const completedTask = () => {  
  console.log(completedData)
  tasks2.innerHTML = "";
  completedData.forEach((x, y) => {
    const dueDate = new Date(x.date);
    let today = new Date();
    let diff = dueDate.getTime() - today.getTime();
    let diffInDays = Math.ceil(diff /(1000*60*60*24));
  
    checkdueDateDIf =() =>{
      if(diffInDays > 0){
        return `you finished the task early by ${diffInDays} days `
      }
      else if(diffInDays < 0){
        console.log(diffInDays);
        return ` <span class="msg"> Late </span> <span> are late by<span class="msg"> ${diffInDays * (-1) } days </span></span>`

      }
      else{
        return `<span>You completed this task on time</span>`
      }
    }
    return (tasks2.innerHTML += `
    <li  id=${y} class='task-list'>
    <span class="warning-dueDate">${checkdueDateDIf()}</span>
    <span class="title-text">${x.text}</span>
    <p>${x.description}</p>
    <span class="date-text">Due date: ${x.date}</span>
    <span class="btn-utils">
      <button onClick ="deleteCompletedTask(this);createTasks()" class="btn-delete"> Delete</button>
    </span>
  </li>
    `);
  });
   resetForm();
};


(() => {
  completedData = JSON.parse(localStorage.getItem("completedData")) || [];
  completedTask();
})();


