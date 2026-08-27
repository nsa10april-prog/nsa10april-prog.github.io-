const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const emptyState = document.getElementById("emptyState");
const totalCount = document.getElementById("totalCount");
const doneCount = document.getElementById("doneCount");
const clearCompleted = document.getElementById("clearCompleted");
const today = document.getElementById("today");

let tasks = JSON.parse(localStorage.getItem("taskflow-tasks")) || [];
let currentFilter = "all";

// Set tanggal hari ini
today.textContent = new Date().toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric"
});

function saveTasks() {
    localStorage.setItem("taskflow-tasks", JSON.stringify(tasks));
}

function addTask() {
    const text = taskInput.value.trim();

    if (!text) {
        taskInput.focus();
        return;
    }

    tasks.push({
        id: Date.now(),
        text: text,
        completed: false
    });

    taskInput.value = "";
    saveTasks();
    renderTasks();
    taskInput.focus();
}

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

    saveTasks();
    renderTasks();
}

function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    saveTasks();
    renderTasks();
}

function getFilteredTasks() {
    if (currentFilter === "active") {
        return tasks.filter(task => !task.completed);
    }
    if (currentFilter === "completed") {
        return tasks.filter(task => task.completed);
    }
    return tasks;
}

function renderTasks() {
    taskList.innerHTML = "";
    const filteredTasks = getFilteredTasks();

    filteredTasks.forEach(task => {
        const li = document.createElement("li");
        li.className = `task ${task.completed ? "completed" : ""}`;

        const checkButton = document.createElement("button");
        checkButton.className = "check";
        checkButton.textContent = task.completed ? "✓" : "";
        checkButton.addEventListener("click", () => toggleTask(task.id));

        const text = document.createElement("span");
        text.className = "task-text";
        text.textContent = task.text;

        const deleteButton = document.createElement("button");
        deleteButton.className = "delete-btn";
        deleteButton.textContent = "Hapus";
        deleteButton.addEventListener("click", () => deleteTask(task.id));

        li.append(checkButton, text, deleteButton);
        taskList.appendChild(li);
    });

    const completed = tasks.filter(task => task.completed).length;

    totalCount.textContent = `${tasks.length} tugas`;
    doneCount.textContent = `${completed} selesai`;
    emptyState.style.display = filteredTasks.length === 0 ? "block" : "none";
}

// Event listeners
addBtn.addEventListener("click", addTask);

taskInput.addEventListener("keydown", event => {
    if (event.key === "Enter") {
        addTask();
    }
});

document.querySelectorAll(".filter").forEach(button => {
    button.addEventListener("click", () => {
        document.querySelectorAll(".filter").forEach(btn => {
            btn.classList.remove("active");
        });
        button.classList.add("active");
        currentFilter = button.dataset.filter;
        renderTasks();
    });
});

clearCompleted.addEventListener("click", () => {
    tasks = tasks.filter(task => !task.completed);
    saveTasks();
    renderTasks();
});

renderTasks();