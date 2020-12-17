let addRead = document.querySelector(".add-read");
let addItem =  document.querySelector(".add-item");
let list = document.querySelector(".list");
let card = document.querySelector(".card");
let filter = document.querySelector(".filter");
let container = document.querySelector(".container");



addItem.addEventListener("click", addListItem)
card.addEventListener("click", general);
filter.addEventListener("keyup", filterList);

window.addEventListener("load",function(){
    let tasks = readLocalStorage();
    for(let i = 0; i < tasks.length; i++){
        createListItem(tasks[i]);
    }
})

function filterList(e){
    let items = Array.from(list.children);
    let value = e.target.value.toUpperCase();

    for(let i = 0; i < items.length; i++){
        if(items[i].textContent.toUpperCase().indexOf(value) > -1){
            items[i].style.display = "";
        }else{
            items[i].style.display = "none";
        }
    }
}

function general(e){

   if(e.target.parentElement.parentElement.classList.contains("list-item")){
        e.target.parentElement.parentElement.remove();
        deleteLocalStorage(e.target.parentElement.parentElement.textContent);
   }

   if(e.target.tagName === "LI"){
       e.target.classList.toggle("completed");
   }

}

function addListItem(){
let value = addRead.value;

if(value === ""){
    alert("Please enter a task")
}else{
    createListItem(value);
    addLocalStorage(value);
    addRead.value = "";
    warning("green","Successfully Added...");
    }
}

function createListItem(x){
    let li = document.createElement("li");
    li.className = "list-item";

    let a = document.createElement("a");
    a.innerHTML = '<i class="fas fa-times"></i>';

    li.appendChild(document.createTextNode(x));
    li.appendChild(a);

   list.appendChild(li);
   
}

function addLocalStorage(x){
    let tasks;

   if(localStorage.getItem("tasks") === null){
        tasks = [];
   }else{
       tasks = JSON.parse(localStorage.getItem("tasks"));
   }

   tasks.push(x);
   localStorage.setItem("tasks",JSON.stringify(tasks));
}

function deleteLocalStorage(x){
    let tasks = readLocalStorage();

    for(let i = 0; i < tasks.length; i++){
        if(tasks[i] === x){
            tasks.splice(i,1);
            localStorage.setItem("tasks",JSON.stringify(tasks));
        }

        if(tasks.length === 0){
           localStorage.clear();
        }
    }

  
}

function readLocalStorage(){
  return JSON.parse(localStorage.getItem("tasks"));  
}

function warning(color,text){
    let div = document.createElement("div");
    div.className = `warning ${color}`;
    div.appendChild(document.createTextNode(text));
    container.appendChild(div);

    setTimeout(function(){
        container.children[1].remove();
     },2500)
}