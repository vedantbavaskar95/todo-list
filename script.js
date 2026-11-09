const taskInput = document.getElementById("taskInput");
const addButton = document.getElementById("addTaskButton");
const displayList = document.getElementById("taskList");
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
});

       displayList.appendChild(taskToComplete);
       updateTaskCounter();
       taskInput.value = "";
});


taskInput.addEventListener("keydown",function(event)
{
   if(event.key === "Enter")
   {
      addButton.click();
   }
});


const taskCounter = document.getElementById("taskCounter");

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