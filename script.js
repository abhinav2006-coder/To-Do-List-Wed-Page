let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

const taskInput = document.getElementById('taskInput');
const addTaskButton = document.getElementById('addTaskButton');
const taskList = document.getElementById('taskList');
const totalTasks = document.getElementById('totalTasks');
const completedTasks = document.getElementById('completedTasks');
const uncompletedTasks = document.getElementById('uncompletedTasks');

addTaskButton.addEventListener('click' || 'enter', addTask);

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function renderTasks() {
    taskList.innerHTML = "";

    let completed = 0;

    tasks.forEach((task, index) => {
        if (task.completed) completed++;

        const li = document.createElement('li');

        li.innerHTML = `
            <input type="checkbox" ${task.completed ? "checked" : ""} onchange="toggleTask(${index})" class="checkbox">
            <span class="${task.completed ? 'completed' : ''}">${task.text}</span>
            <div>
                <button onclick="editTask(${index})" class="edit-btn">Edit</button>
                <button onclick="deleteTask(${index})" class="delete-btn">Delete</button>
            </div>
        `;

        taskList.appendChild(li);
    });

    totalTasks.textContent = tasks.length;
    completedTasks.textContent = completed;
    uncompletedTasks.textContent = tasks.length - completed;
}

function addTask() {
    const text = taskInput.value.trim();
    if (!text) return;

    tasks.push({ text, completed: false });

    taskInput.value = "";
    saveTasks();
    renderTasks();
}

function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    renderTasks();
}

function editTask(index) {
    const newText = prompt("Edit task:", tasks[index].text);
    if (newText && newText.trim() !== "") {
        tasks[index].text = newText;
        saveTasks();
        renderTasks();
    }
}

function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
}

renderTasks();