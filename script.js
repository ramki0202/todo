const taskInput = document.querySelector('input[type="text"]');
const taskList = document.querySelector("ul");
const clearCompletedButton = document.querySelector(".bg-red-500");
const addTaskButton = document.querySelector(".bg-blue-500");

let tasks = [];
let currentFilter = "all"; // all | active | completed

//add task
function addTask() {
  const taskItems = taskInput.value.trim();
  if (taskItems === "") {
    return;
  }
  tasks.push({
    text: taskItems,
    completed: false,
  });
  taskInput.value = "";
  saveTasks();
  renderTasks();
}

console.log("Tasks:", currentFilter);

//trigger filter buttons
document.getElementById("filter-all").addEventListener("click", () => {
  currentFilter = "all";
  renderTasks();
  setActiveButton("all");
});

document.getElementById("filter-active").addEventListener("click", () => {
  currentFilter = "active";
  renderTasks();
  setActiveButton("active");
});

document.getElementById("filter-completed").addEventListener("click", () => {
  currentFilter = "completed";
  renderTasks();
  setActiveButton("completed");
});
document.getElementById("clear-completed").addEventListener("click", () => {
  tasks = tasks.filter((task) => !task.completed); // Keep only active tasks
  saveTasks();
  renderTasks();
});

function renderTasks() {
  let filteredTasks = tasks;
  if (currentFilter === "active") {
    filteredTasks = tasks.filter((task) => !task.completed);
  } else if (currentFilter === "completed") {
    filteredTasks = tasks.filter((task) => task.completed);
  }
  taskList.innerHTML = "";

  filteredTasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.classList.add(
      "flex",
      "justify-between",
      "items-center",
      "bg-gray-100",
      "p-2",
      "rounded",
      "mb-2",
      "fade-in" // 👈 here
    );
    li.className =
      "flex items-center justify-between p-2 border-b border-gray-200";
    li.innerHTML = `
    <span onclick="toggleTask(${index})" class="${
      task.completed ? "line-through text-gray-500" : ""
    }">${task.text}</span>
      <button class="bg-green-500 text-white px-2 py-1 rounded" onclick="deleteTask(${index})">✖</button>
      `;
    taskList.appendChild(li);
  });
}

//strike through
function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
  renderTasks(); // Toggle the completed state
}

// enter key to add task
taskInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    addTask();
  }
});

addTaskButton.addEventListener("click", addTask);

// delete tasks
function deleteTask(index) {
  const li = taskList.children[index];
  li.classList.add("fade-out");

  setTimeout(() => {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
  }, 300); // matches animation time
}

// save to local storage
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
// load tasks from local storage
function loadTasks() {
  const storedTasks = localStorage.getItem("tasks");
  if (storedTasks) {
    tasks = JSON.parse(storedTasks); // Convert string back to array
  }
}

function setActiveButton(filter) {
  document.querySelectorAll(".filter-btn").forEach((btn) => {
    btn.classList.remove("bg-blue-500", "text-white");
    btn.classList.add("bg-gray-200", "text-black");
  });

  const activeBtn = document.getElementById(`filter-${filter}`);
  activeBtn.classList.remove("bg-gray-200", "text-black");
  activeBtn.classList.add("bg-blue-500", "text-white");
}

loadTasks(); // Get tasks from storage
renderTasks(); // Show them on the page
