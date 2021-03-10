import { todoList } from "..";
import { Todo } from "./todo.class";

export class TodoList {
    constructor() {
        // this.todos = [];
        this.cargarLocalStorage();
    }
    nuevoTodo(todo) {
        this.todos.push(todo);
        this.guardarLocalStorage();
    }
    eliminarTodo(id) {
        this.todos = this.todos.filter((todo) => todo.id != id);
        this.guardarLocalStorage();
    }
    toggleCompletado(id) {
        for (const todo of this.todos) {
            if (todo.id == id) {
                todo.completado = !todo.completado;
                this.guardarLocalStorage();
            }
        }
    }
    get getContadorPendientes() {
        let c = 0;
        this.todos.forEach((element) => {
            if (!element.completado) c++;
        });
        return c;
    }
    eliminarCompletados() {
        this.todos = this.todos.filter((todo) => !todo.completado);
        this.guardarLocalStorage();
    }
    guardarLocalStorage() {
        localStorage.setItem("todo", JSON.stringify(this.todos));
    }
    cargarLocalStorage() {
        this.todos = localStorage.getItem("todo") ?
            JSON.parse(localStorage.getItem("todo")) :
            [];
        // this.todos = this.todos.map(obj => Todo.fromJSON(obj)); // Igual a lo de abajo
        this.todos = this.todos.map(Todo.fromJSON); // Convertir de obj JSON a obj Todo
    }
}