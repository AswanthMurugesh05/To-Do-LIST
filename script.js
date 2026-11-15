const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

const totalCount = document.getElementById("totalCount");
const completedCount = document.getElementById("completedCount");
const pendingCount = document.getElementById("pendingCount");

const emptyMessage = document.getElementById("emptyMessage");
const taskStatus = document.getElementById("taskStatus");

let tasks = [];

/* Add a new task */
function addTask() {
    const taskText = taskInput.value.trim();

    if (taskText === "") {
        taskInput.focus();
        return;
    }

    const task = {
        id: Date.now(),
        text: taskText,
        completed: false
    };

    tasks.push(task);

    taskInput.value = "";

    renderTasks();
}

/* Delete a task */
function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    renderTasks();
}

/* Toggle task completion */
function toggleTask(id) {
    tasks = tasks.map(task => {
        if (task.id === id) {
            return {
                ...task,
                completed: !task.completed
            };
        }

        return task;
    });

    renderTasks();
}

/* Display all tasks */
function renderTasks() {
    taskList.innerHTML = "";

    if (tasks.length === 0) {
        emptyMessage.style.display = "block";
    } else {
        emptyMessage.style.display = "none";
    }

    tasks.forEach(task => {
        const taskItem = document.createElement("li");

        taskItem.className = "task-item";

        if (task.completed) {
            taskItem.classList.add("completed");
        }

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.className = "task-checkbox";
        checkbox.checked = task.completed;

        checkbox.addEventListener("change", () => {
            toggleTask(task.id);
        });

        const taskText = document.createElement("span");
        taskText.className = "task-text";
        taskText.textContent = task.text;

        const status = document.createElement("span");
        status.className = "task-status";
        status.textContent = task.completed ? "Completed" : "Pending";

        const deleteBtn = document.createElement("button");
        deleteBtn.className = "delete-btn";
        deleteBtn.innerHTML = "×";
        deleteBtn.setAttribute("aria-label", "Delete task");

        deleteBtn.addEventListener("click", () => {
            deleteTask(task.id);
        });

        taskItem.appendChild(checkbox);
        taskItem.appendChild(taskText);
        taskItem.appendChild(status);
        taskItem.appendChild(deleteBtn);

        taskList.appendChild(taskItem);
    });

    updateCounts();
}

/* Update total, completed, and pending counts */
function updateCounts() {
    const total = tasks.length;

    const completed = tasks.filter(task => task.completed).length;

    const pending = total - completed;

    totalCount.textContent = total;
    completedCount.textContent = completed;
    pendingCount.textContent = pending;

    taskStatus.textContent =
        `${total} ${total === 1 ? "task" : "tasks"}`;
}

/* Button click */
addTaskBtn.addEventListener("click", addTask);

/* Add task using Enter key */
taskInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        addTask();
    }
});

/* Initial display */
renderTasks();