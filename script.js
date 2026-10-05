const taskInput = document.getElementById("taskInput");
const addButton = document.getElementById("addTaskButton");
const displayList = document.getElementById("taskList");

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
      })

       const editButton = document.createElement("button");
       editButton.textContent = "Edit";
       taskToComplete.appendChild(editButton);
       editButton.addEventListener("click",function(event)
      {
         event.stopPropagation();
         const editInput = document.createElement("input");
         editInput.value = taskText.textContent;
         taskToComplete.appendChild(editInput);

         const saveButton = document.createElement("button");
         saveButton.textContent = "Save";
         taskToComplete.appendChild(saveButton);
         saveButton.addEventListener("click", function(event) {
           taskText.textContent = editInput.value;
              editInput.remove();
              saveButton.remove();
});
      })
       
    taskToComplete.addEventListener("click", function () {
    console.log("Task clicked");
    taskToComplete.classList.toggle("completed");
});

       displayList.appendChild(taskToComplete);
       taskInput.value = "";
});

