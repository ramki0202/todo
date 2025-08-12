const taskInput = document.querySelector('input[type="text"]');
const taskList = document.querySelector("ul");
const clearCompletedButton = document.querySelector(".bg-red-500");
const addTaskButton = document.querySelector(".bg-blue-500");

let tasks = [];

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
  renderTasks();
}

function renderTasks() {
  taskList.innerHTML = "";
  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.className =
      "flex items-center justify-between p-2 border-b border-gray-200";
    li.innerHTML = `
            <span class="${
              task.completed ? "line-through text-gray-500" : ""
            }">${task.text}</span>
            <button class="bg-green-500 text-white px-2 py-1 rounded" onclick="toggleTask(${index})">✖</button>
        `;
    taskList.appendChild(li);
  });
}

function deleteTask(index) {
  tasks.splice(index, 1); // Remove 1 item at 'index'
  renderTasks(); // Refresh the UI
}

addTaskButton.addEventListener("click", addTask);

taskInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    addTask();
  }
});
