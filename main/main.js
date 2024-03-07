const API = "http://localhost:3000/data";

function start() {

    getTasks(renderTasks);    

    handleAddForm();

}

start();

function getTasks(callback) {
    fetch(API)
        .then(response => response.json())
        .then(callback)
}

// CREATE task
function createTask(data, callback) {
    var options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    };

    fetch(API, options)
        .then(response => response.json())
        .then(callback)
}

function handleAddForm() {
    var addBtn = document.querySelector("#addBtn");
    
    var valInput = document.querySelector("#inputTask");
    
    addBtn.onclick = () => {
        var content = document.querySelector('input[name="taskContent"]').value;

        var taskEdit = document.querySelector("#addBtn");

        var getClassOfAddBtn = taskEdit.getAttribute("class");


        // alert(getClassOfAddBtn)
        // return false;
        
        if (getClassOfAddBtn) {
            var newContent = document.querySelector("#inputTask").value;
            if (newContent !== '') {
                var newData = {
                    id: getClassOfAddBtn,
                    taskContent: newContent
                };
                
                editTask(newData)
                
                valInput.value = '';
                 
                } else {
                alert("Please enter your task!!!");
                } 
        } else {
           if (content !== '') {
            var formData = {
            taskContent: content
            };

            createTask(formData, () => {
                
                getTasks(renderTasks);
               
            });
            valInput.value = '';
                     

            } else {
            alert("Please enter your task!!!");
            } 
        }

        
        
    };

    

}

// DELETE Task
function handleDeleteForm(id) {
    var options = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        }
    };

    fetch(API + "/" + id, options)
        .then(response => response.json())
        .then(() => {
            var taskItem = document.querySelector("#taskId-" + id);
            if (taskItem) {
                taskItem.remove();
            }
        })
    
}

//EDIT task
function handleEditForm(id) {
    var getTask_edit = document.querySelector(".p-" + id);
    var valInput = document.querySelector("#inputTask").value = getTask_edit.textContent;

    var addBtn_clickEdit = document.querySelector("#addBtn");
    addBtn_clickEdit.textContent = "Save";
    addBtn_clickEdit.setAttribute("class", id); 
    

}

function editTask(data) {
    var options = {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    };

    fetch(API + "/" + data.id, options)
        .then(response => response.json())
        .then(() => {
            getTasks(renderTasks);
        })
}



// display data
function renderTasks(tasks) {
    var workListBlock = document.querySelector("#work-list");
    var htmls = tasks.map(task => {
        return `
            <li id="taskId-${task.id}">
                <div id="contentTask">
                    <p class="p-${task.id}">${task.taskContent}</p>
                    <div class="divBlock">
                        <div>
                            <button id="dltBtn" onclick="handleDeleteForm(${task.id})">Delete</button>
                        </div>
                        <div>
                            <button id="editBtn" onclick="handleEditForm(${task.id})">Edit</button>
                        </div>  
                        
                    </div>
                    
                </div>            
            </li>
        `;
    });

    workListBlock.innerHTML = htmls.join("");
}
