const add_form = document.querySelector("#task_form");
const filter_form = document.querySelector("#task_filter_form");
const filter = document.querySelector("#filter_task");
const new_task = document.querySelector('#new_task');
const tasks_list = document.querySelector("#tasks_list");
const clear_task_button = document.querySelector("#clear_task");

LoadeventListener();
initialize();

function LoadeventListener(){
        add_form.addEventListener("submit", addTask);
        clear_task_button.addEventListener("click", deleteTasks);
        tasks_list.addEventListener("click", deleteTask);
        filter.addEventListener("input", filterTasks);
}

function initialize(){
        let tasks = JSON.parse(localStorage.getItem("tasks"));
        if (tasks === null) {
                localStorage.setItem("tasks", JSON.stringify([]));
        } else {
                tasks.forEach(element => {
                        let li = document.createElement("li");
                        li.className = "collection-item";
                        li.innerHTML = `<div>${element}<a href="#!" class="secondary-content"><i class="material-icons">cancel</i></a></div>`;
                        tasks_list.appendChild(li);  
                });
        }

}

function addTask(e){
        let li = document.createElement("li");
        li.className = "collection-item";
        li.innerHTML = `<div>${new_task.value}<a href="#!" class="secondary-content"><i class="material-icons">cancel</i></a></div>`;
        tasks_list.appendChild(li);
        let tasks = JSON.parse(localStorage.getItem("tasks"));
        tasks.push(new_task.value);
        localStorage.setItem("tasks", JSON.stringify(tasks));
}

function deleteTask(e){
        let item = e.target;
        if (item.className === "material-icons") {
                let task_name = String(item.parentNode.previousSibling.nodeValue);
                let tasks = JSON.parse(localStorage.getItem("tasks"));
                tasks = tasks.filter(task => task.valueOf() != task_name.valueOf());      
                localStorage.setItem("tasks", JSON.stringify(tasks));
                let li = item.parentNode.parentNode.parentNode;
                li.parentNode.removeChild(li);

        }
}

function deleteTasks(e){
        let items = document.querySelectorAll(".collection-item");
        for (let index = 0; index < items.length; index++) {
                items[index].remove(); 
        }
        localStorage.clear();
}

function filterTasks(e){
        let filter_value = filter.value;
        let items = document.querySelectorAll(".collection-item");
        for (let index = 0; index < items.length; index++) {
                let task_name = String(items[index].firstChild.firstChild.nodeValue); 
                if (!task_name.includes(filter_value)) {
                        items[index].style.display = 'none'
                } else {
                        items[index].style.display = 'block'
                }
        }
}
