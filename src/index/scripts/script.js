

const template = document.querySelector("#task-template").content;
const fragment = document.createDocumentFragment();
const entry = document.querySelector('#entry');
const lista = document.querySelector('#list');
const form = document.querySelector('.nav-entry');
const taskTemplate = document.getElementById('task-template');

form.addEventListener("submit", (e)=>{
    e.preventDefault();
    newTask();
});

document.querySelectorAll('.sort').forEach(ele => ele.onclick = function() {
    sort();
} );

window.onload = load;

function load() {
    let keys = Object.keys(localStorage);
    if (keys.length === 0 ) {
        create('Make code');
    }
    for(let tk of keys){
        create(tk);
    }
    checked();
    lista.scrollTo(0, 0);
}

function newTask() {
    create(entry.value);
    entry.value = '';
}

function create(strings) {
    let tasktext = strings.charAt(0).toUpperCase() + strings.slice(1);

    let done = (tasktext in localStorage) ? ((localStorage.getItem(tasktext) != "false") ? true : false) : false;
    localStorage.setItem(tasktext , done);
     
    renderPill(tasktext);

    lista.querySelectorAll("input").forEach(el => el.addEventListener( "click" , function() {chequeado(this)} ));
    lista.querySelectorAll(".delete").forEach(el => el.addEventListener( "click" , function() {deleted(this)} ))
    
}

function renderPill(texto) {
    template.querySelector('.task-label span').textContent = texto;
    const clone = template.cloneNode(true);
    fragment.appendChild(clone);
    lista.appendChild(fragment);
}

function checked() {
    let lis = lista.querySelectorAll("li")
    lis.forEach(el => {
        let task = el.querySelector("span").textContent;
        if(localStorage.getItem(task) == "true") {
            el.querySelector("label").click();
        }
    })
}

function sort() {
    let tasks = [];
    let keys = Object.keys(localStorage);
    for (var i = 0; i<keys.length; i++) {
        tasks[i] = keys[i];
    }
    let revertTasks = invert(tasks);
    deletedAll();
    localStorage.clear();
    for(let tk of revertTasks){
        create(tk);
    }
}

function invert(arr) {
    for (var i = 0; i<arr.length/2; i++) {
        let temp =arr[i];
        arr[i] = arr[arr.length - i - 1];
        arr[arr.length - i - 1] = temp;
    }
    return arr;
}

function chequeado(inst) {
    if(inst.checked) {  
        inst.parentElement.style.textDecoration = "line-through";
        localStorage.setItem(inst.parentElement.querySelector("span").textContent,true)
    } 
    else if(!inst.checked) {
        inst.parentElement.style.textDecoration = "none";
        localStorage.setItem(inst.parentElement.querySelector("span").textContent,false)
    } 
};

function deletedAll() {
    document.querySelectorAll('.delete').forEach(elem => {
        deleted(elem);
    });
    localStorage.clear();
}

function deleted(inst) {
    let tx = inst.parentElement.querySelector('span').textContent;
    localStorage.removeItem(tx);
    inst.parentElement.remove();
}
