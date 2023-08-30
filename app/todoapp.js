document.addEventListener("DOMContentLoaded", function() {
    const form = document.querySelector(".addTodo");
    const tasksList = document.querySelector(".tasks");
    const deleteCompletedButton = document.querySelector(".itemsleft__btnclear");
    const itemsLeftCounter = document.querySelector(".itemsleft__counter");
    const allActiveButton = document.querySelector(".btnfilter__allactive");
    const activeButton = document.querySelector(".btnfilter__activebtn");
    const completedButton = document.querySelector(".btnfilter__completed");
    const alert = document.querySelector('.alert'); // ALERT

    function updateItemsLeftCounter() {
        const uncheckedItems = tasksList.querySelectorAll("li:not(.completed)");
        itemsLeftCounter.textContent = `${uncheckedItems.length} items left`;
    }

    function saveTasksToLocalStorage() {
        const tasks = [...tasksList.children].map(task => ({
            text: task.textContent,
            completed: task.classList.contains("completed")
        }));
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    function loadTasksFromLocalStorage() {
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks.forEach(task => {
            const taskItem = createTaskItem(task.text, task.completed);
            tasksList.appendChild(taskItem);
        });
        updateItemsLeftCounter();
    }

    function createTaskItem(text, completed) {
        const taskItem = document.createElement("li");
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = completed;

        checkbox.addEventListener("change", function() {
            taskItem.classList.toggle("completed");
            updateItemsLeftCounter();
            saveTasksToLocalStorage();
        });

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "X";
        deleteButton.addEventListener("click", function() {
            tasksList.removeChild(taskItem);
            updateItemsLeftCounter();
            saveTasksToLocalStorage();
        });

        taskItem.textContent = text;
        taskItem.appendChild(checkbox);
        taskItem.appendChild(deleteButton);
        taskItem.classList.toggle("completed", completed);

        return taskItem;
    }

    form.addEventListener("submit", function(event) {
        event.preventDefault();
  
        const input = form.querySelector(".addTodo__addNew");
        const taskText = input.value.trim();
  
        if (taskText !== "") {
            const taskItem = createTaskItem(taskText, false);
            tasksList.appendChild(taskItem);
            updateItemsLeftCounter();
            saveTasksToLocalStorage();
            input.value = "";
        }
    });

    deleteCompletedButton.addEventListener("click", function() {
        const checkedItems = tasksList.querySelectorAll("li input[type='checkbox']:checked");
        checkedItems.forEach(function(item) {
            tasksList.removeChild(item.parentNode);
        });
        updateItemsLeftCounter();
        saveTasksToLocalStorage();
    });

    allActiveButton.addEventListener("click", function() {
        [...tasksList.children].forEach(task => {
            task.style.display = "flex";
        });
    });

    activeButton.addEventListener("click", function() {
        [...tasksList.children].forEach(task => {
            task.style.display = task.classList.contains("completed") ? "none" : "flex";
        });
    });

    completedButton.addEventListener("click", function() {
        [...tasksList.children].forEach(task => {
            task.style.display = task.classList.contains("completed") ? "flex" : "none";
        });
        updateItemsLeftCounter();
    });

    loadTasksFromLocalStorage();
});
