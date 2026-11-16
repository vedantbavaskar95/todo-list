const taskCounter = document.getElementById("taskCounter");
const taskInput = document.getElementById("taskInput");
const addButton = document.getElementById("addTaskButton");
const displayList = document.getElementById("taskList");
    function saveTasks() {

    const tasks = Array.from(displayList.children).map(function(task) {

        return {
            text: task.querySelector("span").textContent,
            completed: task.classList.contains("completed")
        };

    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
}


function loadTasks() {

    const savedTasks = localStorage.getItem("tasks");

    // Check whether saved tasks exist
    if (savedTasks === null) {
        return;
    }

    // Convert JSON string into JavaScript array
    const tasks = JSON.parse(savedTasks);

    tasks.forEach(function(task) {

        // Create task element
        const taskToComplete = document.createElement("li");

        // Create task text
        const taskText = document.createElement("span");
        taskText.textContent = task.text;
        taskToComplete.appendChild(taskText);

        // Restore completed status
        if (task.completed === true) {
            taskToComplete.classList.add("completed");
        }

        // Create Delete button
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        taskToComplete.appendChild(deleteButton);

        deleteButton.addEventListener("click", function(event) {
            event.stopPropagation();
            taskToComplete.remove();
            saveTasks();
            updateTaskCounter();
            updateClearCompletedButton();
            saveTasks();
        });

        // Create Edit button
        const editButton = document.createElement("button");
        editButton.textContent = "Edit";
        taskToComplete.appendChild(editButton);

        editButton.addEventListener("click", function(event) {

            event.stopPropagation();

            const existingInput = taskToComplete.querySelector("input");

            if (existingInput) {
                return;
            }

            const editInput = document.createElement("input");
            editInput.value = taskText.textContent;
            taskToComplete.appendChild(editInput);

            const saveButton = document.createElement("button");
            saveButton.textContent = "Save";
            taskToComplete.appendChild(saveButton);

            const cancelButton = document.createElement("button");
            cancelButton.textContent = "Cancel";
            taskToComplete.appendChild(cancelButton);

            editInput.addEventListener("keydown", function(event) {

                if (event.key === "Enter") {
                    saveButton.click();
                }

                if (event.key === "Escape") {
                    cancelButton.click();
                }

            });

            saveButton.addEventListener("click", function(event) {

                event.stopPropagation();

                if (editInput.value.trim() === "") {
                    return;
                }

                taskText.textContent = editInput.value;
                

                editInput.remove();
                saveButton.remove();
                cancelButton.remove();

                saveTasks();
            });

            cancelButton.addEventListener("click", function(event) {

                event.stopPropagation();

                editInput.remove();
                saveButton.remove();
                cancelButton.remove();

            });

        });

        // Toggle completed status
        taskToComplete.addEventListener("click", function() {

            taskToComplete.classList.toggle("completed");

            updateClearCompletedButton();
            saveTasks();

        });

        // Append task to list
        displayList.appendChild(taskToComplete);

    });

    updateTaskCounter();
    updateClearCompletedButton();

}


function updateTaskCounter() {
const count = displayList.children.length;
                    const label = count === 1 ? "Task" : "Tasks";
                taskCounter.textContent = `${count} ${label}`;
}
addButton.addEventListener("click", function () {
   
   if(taskInput.value.trim() === "")
      {
         return;
      }
      const taskToComplete = document.createElement("li");
     const taskText = document.createElement("span");
           taskText.textContent = taskInput.value;
           taskToComplete.appendChild(taskText);


      const deleteButton = document.createElement("button");
            deleteButton.textContent = "Delete";
            taskToComplete.appendChild(deleteButton);
             deleteButton.addEventListener("click",function(event){
              event.stopPropagation();
             taskToComplete.remove();
                  updateTaskCounter();
                  updateClearCompletedButton();
      })

       const editButton = document.createElement("button");
       editButton.textContent = "Edit";
       taskToComplete.appendChild(editButton);
       editButton.addEventListener("click",function(event)
      {
         event.stopPropagation();
         const existingInput = taskToComplete.querySelector("input"); 
         if (existingInput) {
                              return;
                            }
         const editInput = document.createElement("input");
         editInput.value = taskText.textContent;
         taskToComplete.appendChild(editInput);
         editInput.addEventListener("keydown", function(event) {
        if(event.key === "Enter")
        {
         saveButton.click();
        }
        if (event.key === "Escape")
          {
             cancelButton.click();
          }
});
         
         const saveButton = document.createElement("button");
         saveButton.textContent = "Save";
         taskToComplete.appendChild(saveButton);
         
                  const cancelButton = document.createElement("button");
                  cancelButton.textContent = "Cancel";
                  taskToComplete.appendChild(cancelButton);
         saveButton.addEventListener("click", function(event) {
            event.stopPropagation();
            if(editInput.value.trim() === "")
            {
               return;
            }
         

            
            taskText.textContent = editInput.value;
            editInput.remove();
            saveButton.remove();
            cancelButton.remove();
         });
                  cancelButton.addEventListener("click",function(event){
                     event.stopPropagation();
                     editInput.remove();
                     saveButton.remove();
                     cancelButton.remove();
         
                  })
      })
       
    taskToComplete.addEventListener("click", function () {
    console.log("Task clicked");
    taskToComplete.classList.toggle("completed");
    saveTasks();
    updateClearCompletedButton();
});

       displayList.appendChild(taskToComplete);
       updateTaskCounter();
       saveTasks();
       taskInput.value = "";
});
 ////////

taskInput.addEventListener("keydown",function(event)
{
   if(event.key === "Enter")
   {
      addButton.click();
   }
});



const filterButtons = document.querySelectorAll(".filter-btn");
filterButtons.forEach(function(button) {

    button.addEventListener("click", function() {

       filterTasks(button.dataset.filter);});
    });
    function filterTasks(filter) {

    const tasks = displayList.querySelectorAll("li");

    tasks.forEach(function(task) {

        if (filter === "completed" && !task.classList.contains("completed")) {

            task.style.display = "none";

        }
        else if (filter === "active" && task.classList.contains("completed")) {

            task.style.display = "none";

        }
        else {

            task.style.display = "";

        }

    });

}

function clearCompletedTasks() {
    const completedTasks = displayList.querySelectorAll(".completed");

    completedTasks.forEach(function(task) {
        task.remove();
    });
     updateClearCompletedButton();
    updateTaskCounter();
    saveTasks();
}

const clearCompletedButton = document.getElementById("clearCompletedButton");
clearCompletedButton.addEventListener("click", function() {
    clearCompletedTasks();
});





function updateClearCompletedButton() {
    const completedTasks = displayList.querySelectorAll(".completed");
    clearCompletedButton.disabled = completedTasks.length === 0;
}
    
    updateClearCompletedButton();

loadTasks();
   
