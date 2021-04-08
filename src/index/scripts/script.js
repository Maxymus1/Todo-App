
const template = document.querySelector("#task-template").content;
const fragment = document.createDocumentFragment();
const entry = document.querySelector('#entry');
const lista = document.querySelector('#list');
document.querySelectorAll('.sort').forEach(ele => ele.onclick = function() {
    sort();
} );




window.onload = reload();

function reload() {
    var archive = [];
    let keys = Object. keys(localStorage);
    if (keys.length === 0 || keys.length === 1 ) {
        create('Make code');
    }
    for (var i = 0; i<keys.length; i++) {
        archive[i] = keys[i];
    }
        for(let tk of archive){
        create(tk);
    }
}

entry.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
      event.preventDefault();
      newTask();
    }
  });

function newTask() {
    create(entry.value);
    entry.value = '';
}

function create(strings) {
    let tasktext = strings.charAt(0).toUpperCase() + strings.slice(1);
    renderPill(tasktext);
    let item = itemsCurrent();
    let currentItem ='item ' + item;
    localStorage.setItem(tasktext , currentItem);
}

function renderPill(texto) {
    template.querySelector('.task-label span').textContent = texto;
    const clone = template.cloneNode(true);
    fragment.appendChild(clone);
    lista.appendChild(fragment);
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

function deletedAll() {
    document.querySelectorAll('.delete').forEach(elem => {
        deleted(elem);
    });
    localStorage.clear();
}

function itemsCurrent() {
    return localStorage.length;
}

function chequeado(inst) {
    if(inst.checked) {  
        inst.parentElement.style.textDecoration = "line-through";
    } 
    else if(!this.checked) {
        inst.parentElement.style.textDecoration = "none";
    } 
};

function deleted(inst) {
    let tx = inst.parentElement.querySelector('span').textContent;
    localStorage.removeItem(tx);

    inst.parentElement.remove();
}







