import { Todo } from "../classes";
import { todoList } from "../index";

//Referencias en el HTML
const divTodoList = document.querySelector(".todo-list");
const inputTodo = document.querySelector(".new-todo");
const btnBorrar = document.querySelector(".clear-completed");
const ulFiltros = document.querySelector(".filters");
const anchorsFiltro = document.querySelectorAll(".filtro");
const contador = document.querySelector(".todo-count").firstElementChild;

export const crearTodoHtml = (todo) => {
    const htmlTodo = `<li class="${
    todo.completado ? "completed" : ""
  }" data-id="${todo.id}">
        <div class="view">
            <input class="toggle" type="checkbox" ${
              todo.completado ? "checked" : ""
            }>
            <label>${todo.tarea}</label>
            <button class="destroy"></button>
        </div>
        <input class="edit" value="Create a TodoMVC template">
    </li>`;

    const div = document.createElement("div");
    div.innerHTML = htmlTodo;
    actualizaContador();
    divTodoList.append(div.firstElementChild);
    return div.firstElementChild;
};

const actualizaContador = () => {
    contador.innerText = todoList.getContadorPendientes;
};

//Eventos
// Crear nuevo todo
inputTodo.addEventListener("keyup", (event) => {
    if (event.keyCode === 13 && inputTodo.value.trim().length > 0) {
        const nuevoTodo = new Todo(inputTodo.value);
        todoList.nuevoTodo(nuevoTodo);
        crearTodoHtml(nuevoTodo);
        inputTodo.value = "";
    }
});
// Completar / Eliminar
divTodoList.addEventListener("click", (event) => {
    const nombreElemento = event.target.localName; // label, button, input
    const todoElementHtml = event.target.parentElement.parentElement;
    const todoId = todoElementHtml.getAttribute("data-id");
    if (nombreElemento.includes("input")) {
        // click en el check
        todoList.toggleCompletado(todoId);
        todoElementHtml.classList.toggle("completed");
    } else if (nombreElemento.includes("button")) {
        // click en boton eliminar
        todoList.eliminarTodo(todoId);
        divTodoList.removeChild(todoElementHtml);
    }
    actualizaContador();
});
// Eliminar los todos completados
btnBorrar.addEventListener("click", () => {
    todoList.eliminarCompletados();
    for (let i = divTodoList.children.length - 1; i >= 0; i--) {
        const element = divTodoList.children[i];
        if (element.classList.contains("completed")) {
            divTodoList.removeChild(element);
        }
    }
});

ulFiltros.addEventListener("click", (event) => {
    const filtro = event.target.text;
    if (!filtro) return; // Se debe elegir un filtro válido
    anchorsFiltro.forEach((elem) => elem.classList.remove("selected")); // Desabilitar todas las pestañas
    event.target.classList.add("selected");
    for (const ele of divTodoList.children) {
        ele.classList.remove("hidden"); // Limpiar efectos de filtros previos
        const completado = ele.classList.contains("completed");
        switch (filtro) {
            case "Pendientes":
                if (completado) {
                    ele.classList.add("hidden");
                }
                break;
            case "Completados":
                if (!completado) {
                    ele.classList.add("hidden");
                }
                break;
        }
    }
});