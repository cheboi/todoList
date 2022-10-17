let form = document.getElementById("modal-1");
let textInput = document.getElementById("textInput");
let dateInput = document.getElementById("dateInput");
// let done = document.getElementsByClassName("doneInput");
let textarea = document.getElementById("descriptionArea");
let msg = document.getElementById("msg");
let tasks = document.getElementById("tasks");
let tasks2 = document.getElementById("tasks2");
let add = document.getElementById("add");
let modal = document.querySelector(".modal");

// modal
(function () {
  console.log( document.querySelectorAll(".open-modal"))
  document.querySelectorAll(".open-modal").forEach(function (trigger) {
    trigger.addEventListener("click", function () {
      hideAllModalWindows();
      showModalWindow(this);
    });
  });

  document.querySelectorAll(".modal-hide").forEach(function (closeBtn) {
    closeBtn.addEventListener("click", function () {
      hideAllModalWindows();
    });
  });

  document.querySelector(".modal-fader").addEventListener("click", function () {
    hideAllModalWindows();
  });
})();

function showModalWindow(buttonEl) {
  var modalTarget = "#" + buttonEl.getAttribute("data-target");

  document.querySelector(".modal-fader").className += " active";
  document.querySelector(modalTarget).className += " active";
}

function hideAllModalWindows() {
  var modalFader = document.querySelector(".modal-fader");
  var modalWindows = document.querySelectorAll(".modal-window");

  if (modalFader.className.indexOf("active") !== -1) {
    modalFader.className = modalFader.className.replace("active", "");
  }

  modalWindows.forEach(function (modalWindow) {
    if (modalWindow.className.indexOf("active") !== -1) {
      modalWindow.className = modalWindow.className.replace("active", "");
    }
  });
}
// todo logic

form.addEventListener("submit", (e) => {
  e.preventDefault();
  formValidation();
});

let formValidation = () => {
  if (textInput.value === "" && textInput.date === "") {
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
let todoData = [
  {
    text: "This is title",
    description: "title 1 and more",
    date: "19/10/2022",
  },
  {
    text: "This is second title",
    description: "I am the second task",
    date: "02/10/2022",
  },
  {
    text: "This is third title",
    description: "title 3 and more",
    date: "18/10/2022",
  },
  {
    text: "This is forth title",
    description: "title 4 and more",
    date: "22/02/2022",
  },
];


let addData = () => {
  todoData.push({
    text: textInput.value,
    description: textarea.value,
    date: dateInput.value,
  });

  localStorage.setItem("data", JSON.stringify(todoData));
  createTasks();
};


let resetForm = () => {
  textInput.value = "";
  dateInput.value = "";
  textarea.value = "";
};


let createTasks = () => {
   tasks.innerHTML = "";
  todoData.forEach((x, y) => {
    return (tasks.innerHTML += `
      <li  id=${y} class='task-list'>
        <input type="checkbox" class="checkBox" onclick="changeListener(this)" >
        <span class="title-text">${x.text}</span>
        <br />
        <span class="date-text">Due date: ${x.date}</span>
        <br />

        <p>${x.description}</p>
        <span class="btn-utils">
          <button onClick= "editTask(this)" class = "open-modal edit" data-target="modal-1"> Edit</button>
          <button onClick ="deleteTask(this);createTasks()" class="btn-delete"> Delete</button>
        </span>
      </li>
    `);
  });
    resetForm();
};

let deleteTask = (e) => {
  e.parentElement.parentElement.remove();
  todoData.splice(e.parentElement.parentElement.id, 1);

  localStorage.setItem("data", JSON.stringify(todoData));
  // console.log(todoData);
};

(() => {
  todoData = JSON.parse(localStorage.getItem("data")) || [];
  // console.log(todoData);
  createTasks();
})();

// edit
let editTask = (e) => {
  let selectedTask = e.parentElement.parentElement;

  textInput.value = selectedTask.children[0].innerHTML;
  dateInput.value = selectedTask.children[1].innerHTML;
  textarea.value = selectedTask.children[2].innerHTML;

  deleteTask(e);
};

let Check = document.querySelectorAll(".checkBox");

let completedData = [];

const changeListener = (e) => { 
  let completedDat = todoData.splice(e.target.parentElement.id, 1);
  localStorage.setItem("todoData", JSON.stringify(todoData));
  completedData.push(...completedDat)
  localStorage.setItem("completedItem", JSON.stringify(completedData))

  createTasks()
  completedTask()
}


let completedTask = () => {  
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
    <span class="date-text">Due date: ${x.date}</span>
    <p>${x.description}</p>
    <span class="btn-utils">
      <button onClick ="deleteTask(this);createTasks()" class="btn-delete"> Delete</button>
    </span>
  </li>
    `);
  });
   resetForm();
};



