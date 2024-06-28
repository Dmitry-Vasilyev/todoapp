"use strict";

const URL = "http://localhost:3000/todo";

const todoList = document.getElementById("todoList");
const addTodoForm = document.getElementById("addTodoForm");
const addTodoInput = document.getElementById("addTodoInput");
const delTodoForm = document.getElementById("delTodoForm");
const delTodoFormInput = document.getElementById("delTodoFormInput");

loadAllTodos();

addTodoForm.addEventListener("submit",  async (e) => {
    e.preventDefault();
    const todoText = addTodoInput.value.trim();

    if (todoText) {
        await createTodoItem({title: todoText})
        addTodoInput.value = '';
        loadAllTodos();
    }
});

delTodoForm.addEventListener("submit",  async (e) => {
    e.preventDefault();
    const idText = delTodoFormInput.value.trim();
    if (idText) {
        await deleteTodoItem(idText);
        loadAllTodos();
    }
});

async function loadAllTodos() {
    let todos = await fetchAllTodo();
    renderAllTodo(todos);
}

async function fetchAllTodo() {
    let response = await fetch(URL);
    return await response.json();
}

function renderAllTodo(todos) {
    todoList.innerHTML = '';

    todos.forEach(todo => {
        todoList.appendChild(createTodoItemHTML(todo));
    })
}

function createTodoItemHTML(todo) {
    const div = document.createElement("div");
    div.innerHTML = `<span>${todo.id}</span> <span>${todo.title}</span>`;
    return div;
}

async function createTodoItem(todo) {
    await fetch(URL, {
        method: 'POST',
        body: JSON.stringify(todo),
        headers: {"Content-Type": "application/json"}
    });
}

async function deleteTodoItem(todoId) {
    await fetch((URL + '/' + todoId), {method: 'DELETE'});
    loadAllTodos();
}


