const todoText = document.querySelector(".todo-input-text");
const addBtn = document.querySelector(".add");
const todoAdded = document.querySelector(".todo-Added");
const selectTodo = document.getElementById("todo-selection");

// after a reload we need check if stored value exists if yes we put them in the todoAdded
if (localStorage.getItem("todoAddedHTML")) {
  todoAdded.innerHTML = localStorage.getItem("todoAddedHTML");
}

addBtn.addEventListener("click", () => {
  todoAdded.innerHTML += `<div class="todo-box Uncompleted">
  <p>${todoText.value}</p>
  <ion-icon class="complete-btn" name="checkmark-circle-outline"></ion-icon>
  <ion-icon class="delete-btn" name="close-circle-outline"></ion-icon>
</div>`;
  // to add the code to a localstorage so if we reload we still have the data but if we delete the tab is gones
  localStorage.setItem("todoAddedHTML", todoAdded.innerHTML);
});

todoText.addEventListener("keydown", (event) => {
  if (event.keyCode === 13) {
    // to prevent the default behavior of browser when you clicked enter
    event.preventDefault();
    // simulates a mouse click on the addBtn element
    addBtn.click();
  }
});

// completeBtn.addEventListener("click", () => {});
todoAdded.addEventListener("click", (event) => {
  // Check if the clicked element has class "delete-btn"
  if (event.target.classList.contains("delete-btn")) {
    // Remove the parent element of the clicked element
    event.target.parentElement.remove();
    // Update the localStorage
    localStorage.setItem("todoAddedHTML", todoAdded.innerHTML);
  }
  if (event.target.classList.contains("complete-btn")) {
    event.target.parentElement.style.backgroundColor = "#FADCD9";
    event.target.parentElement.classList.remove("Uncompleted");
    event.target.parentElement.classList.add("Completed");
    localStorage.setItem("todoAddedHTML", todoAdded.innerHTML);
  }
});

selectTodo.addEventListener("change", (event) => {
  const todoBoxes = document.querySelectorAll(".todo-box");
  todoBoxes.forEach((todoBox) => {
    if (
      event.target.value === "Completed" &&
      !todoBox.classList.contains("Completed")
    ) {
      todoBox.style.display = "none";
    } else if (
      event.target.value === "Uncompleted" &&
      todoBox.classList.contains("Completed")
    ) {
      todoBox.style.display = "none";
    } else {
      todoBox.style.display = "flex";
    }
  });
});

window.addEventListener("load", () => {
  const todoBoxes = document.querySelectorAll(".todo-box");
  todoBoxes.forEach((todoBox) => {
    todoBox.style.display = "flex"; // show all todo boxes by default
  });
});
