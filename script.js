window.onload = function () {
    loadTasks();
};

document.querySelector('#add').onclick = function () {
    var taskInput = document.querySelector('#newtask input');
    if (taskInput.value.length === 0) {
        alert("Please Enter a Task");
    } else {
        var tasksContainer = document.querySelector('#tasks');
        tasksContainer.innerHTML += `
            <div class="task">
                <span class="taskname">
                    ${taskInput.value}
                </span>
                <button class="delete">
                    <i class="far fa-trash-alt"></i>
                </button>
            </div>
        `;

        // Save tasks to local storage
        saveTasks();

        var current_tasks = document.querySelectorAll(".delete");
        for (var i = 0; i < current_tasks.length; i++) {
            current_tasks[i].onclick = function () {
                this.parentNode.remove();
                // Save tasks to local storage after deletion
                saveTasks();
            };
        }

        // Clear the input after adding a task
        taskInput.value = "";
    }
};

document.querySelector('#sort').onclick = function () {
    var tasksContainer = document.querySelector('#tasks');
    var tasks = Array.from(tasksContainer.children);
    tasks.sort((a, b) => {
        var textA = a.querySelector('.taskname').textContent.toLowerCase();
        var textB = b.querySelector('.taskname').textContent.toLowerCase();
        return textA.localeCompare(textB);
    });
    tasksContainer.innerHTML = "";
    tasks.forEach(task => tasksContainer.appendChild(task));

    // Save sorted tasks to local storage
    saveTasks();
};

function saveTasks() {
    var tasksContainer = document.querySelector('#tasks');
    localStorage.setItem('tasks', tasksContainer.innerHTML);
}

function loadTasks() {
    var tasksContainer = document.querySelector('#tasks');
    var savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
        tasksContainer.innerHTML = savedTasks;
        attachDeleteHandlers();
    }
}

function attachDeleteHandlers() {
    var current_tasks = document.querySelectorAll(".delete");
    for (var i = 0; i < current_tasks.length; i++) {
        current_tasks[i].onclick = function () {
            this.parentNode.remove();
            saveTasks();
        };
    }
}