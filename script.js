const taskInput = document.getElementById("taskInput");
const addButton = document.getElementById("addTaskButton");
const displayList = document.getElementById("taskList");

addButton.addEventListener("click", function () {
   
         if(taskInput.value.trim() === "")
         {
            return;
         }
       const taskToComplete = document.createElement("li");
       taskToComplete.textContent = taskInput.value; 

    taskToComplete.addEventListener("click", function () {
    console.log("Task clicked");
    taskToComplete.classList.toggle("completed");
});

       displayList.appendChild(taskToComplete);
       taskInput.value = "";
});

