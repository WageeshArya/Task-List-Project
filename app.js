const newTask = document.querySelector("#task");
const addTask = document.querySelector("#addTask");
const ul = document.querySelector("ul");
const clearbtn = document.querySelector(".btn.black");
const filterForm = document.querySelector("#filter");

addTask.addEventListener('click',addNewTask);
ul.addEventListener('click',removeTasks);
clearbtn.addEventListener('click',removeAll);
filterForm.addEventListener('keydown',filterTasks);
document.addEventListener('DOMContentLoaded',getTasks);

function getTasks()
{
    if(localStorage.getItem('tasks') === null)
        tasks = [];
    else
        tasks = JSON.parse(localStorage.getItem('tasks'));

    tasks.forEach(function(task){
        let node = document.createElement("li");
        let newTask = document.createTextNode(task);
        let icon = document.createElement("i");
        icon.className = "fa fa-remove secondary-content";
        node.appendChild(newTask);
        node.appendChild(icon);
        ul.appendChild(node);
        node.classList.add("collection-item");
    })
}

function removeAll(e){
    while(ul.firstChild)
        ul.removeChild(ul.firstChild);
    removeAllFromLS();
    
}
function removeAllFromLS(){
    tasks = [];
    localStorage.setItem('tasks',JSON.stringify(tasks));
};

function removeFromLS(removeTask){
    console.log(removeTask.textContent);
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }
    else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    for(let i=0;i<tasks.length;i++){
        if(tasks[i]===removeTask.textContent){
            tasks.splice(i,i);
            console.log(tasks);
            localStorage.setItem('tasks',JSON.stringify(tasks));
        }
    }
}

function removeTasks(e){ 
    if(e.target.classList.contains("secondary-content")){
        e.target.parentElement.remove();
        removeFromLS(e.target.parentElement);
    }
}

function addNewTask(e){

    if(newTask.value!=='')
    {
        let taskToBeAdded = newTask.value;
        console.log(taskToBeAdded);
        let node = document.createElement("li");
        let task = document.createTextNode(taskToBeAdded);
        let icon = document.createElement("i");
        icon.className = "fa fa-remove secondary-content";
        node.appendChild(task);
        node.appendChild(icon);
        ul.appendChild(node);
        node.classList.add("collection-item");
        newTask.value = '';
        e.preventDefault();
        console.log("addNewTask: " + taskToBeAdded)
        storeTaskInLS(taskToBeAdded);
    }
    e.preventDefault();
}

function storeTaskInLS(task){
    let tasks;
    console.log(task);
    if(localStorage.getItem('tasks') === null)
        tasks = [];
    else
        tasks = JSON.parse(localStorage.getItem('tasks'));
    tasks.push(task);
    localStorage.setItem('tasks',JSON.stringify(tasks));
}

function filterTasks(e){

    // console.log(e.target.value);
    let text=e.target.value.toLowerCase();
    console.log(text);
    let checkText = document.querySelectorAll(".collection-item");
    for(let i=0;i<checkText.length;i++)
    {
        if(checkText[i].textContent.toLowerCase().indexOf(text) != -1){
            checkText[i].style.display = 'block';
        }
        else{
            checkText[i].style.display = 'none';
        }
    }
}