let form = document.getElementById("modal-1");
let textInput = document.getElementById("textInput");
let dateInput = document.getElementById("dateInput");
// let done = document.getElementsByClassName("doneInput");
let textarea = document.getElementById("descriptionArea");
let msg = document.getElementById("msg");
let tasks = document.getElementById("tasks");
let add = document.getElementById("add");
let modal = document.querySelector(".modal");

// modal
(function () {
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
let todoData = [
  // {
  //   text: "This is title",
  //   description: "title 1 and more",
  //   done: false,
  //   date: "19/10/2022",
  // },
  // {
  //   text: "This is second title",
  //   description: "I am the second task",
  //   done: false,
  //   date: "02/10/2022",
  // },
  // {
  //   text: "This is third title",
  //   description: "title 3 and more",
  //   done: false,
  //   date: "18/10/2022",
  // },
  // {
  //   text: "This is forth title",
  //   description: "title 4 and more",
  //   done: false,
  //   date: "22/02/2022",
  // },
];

let completedData = [];

let addData = () => {
  todoData.push({
    text: textInput.value,
    description: textarea.value,
    done: false,
    date: dateInput.value,
  });

  localStorage.setItem("data", JSON.stringify(todoData));

  // console.log(todoData);
  createTasks();
};

//event listener for todo event
// Select the entire list
const list = document.querySelector(".todo");
// Add a click event listener to the ltist and its children
list.addEventListener("click", (e) => {
  tasks.done = e.target.checked;
  localStorage.setItem("data", JSON.stringify(todoData));

  if (tasks.done) {
    list.classList.add("done");
  } else {
    list.classList.remove("done");
  }
});

let createTasks = () => {
  // const isDone = todoData.done ? "checked" : "";
  // tasks.setAttribute('class', `todo-task${isDone}`)
  tasks.innerHTML = "";
  todoData.forEach((x, y) => {
    return (tasks.innerHTML += `
      <li  id=${y} class='task-list'>
        <input type="checkbox" class="checkBox" >
        <span class="title-text">${x.text}</span>
        
        <span class="date-text">${x.date}</span>
        <p>${x.description}</p>
        <span class="btn-utils">
          <button onClick= "editTask(this)" class = "edit" data-target="modal-1"> Edit</button>
          <button onClick ="deleteTask(this);createTasks()" class="btn-delete"> Delete</button>
        </span>
      </li>
    `);
  });
  // list.append(tasks);
  // resetForm();
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

let resetForm = () => {
  textInput.value = "";
  dateInput.value = "";
  textarea.value = "";
};
console.log(checkbox.nodeName);
let Check = document.querySelectorAll(".checkBox");


Check.forEach ((c) =>{
  c.addEventListener("change",  (e) => {  
    if (e.target.checked === true) {
      console.log(e.target.parentElement.nodeName);
      const completedDat = todoData.splice(e.target.parentElement.id, 1);
      localStorage.setItem("todoData", JSON.stringify(todoData));
      console.log(completedDat);
      createTasks();

    }
  })
}) 

// getting data from local storage
completedData.push(...completedDat)
  localStorage.setItem("completedItem", JSON.stringify(completeData))
  console.log(completeData);  


