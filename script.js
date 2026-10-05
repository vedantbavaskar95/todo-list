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
      
      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete";
      taskToComplete.appendChild(deleteButton);
      deleteButton.addEventListener("click",function(event){
         event.stopPropagation();
         taskToComplete.remove();
      })

    taskToComplete.addEventListener("click", function () {
    console.log("Task clicked");
    taskToComplete.classList.toggle("completed");
});

       displayList.appendChild(taskToComplete);
       taskInput.value = "";
});

