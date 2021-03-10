import "./styles.css";
import { Todo, TodoList } from "./classes";
import { crearTodoHtml } from "./js/componentes";

export const todoList = new TodoList();
// todoList.todos.forEach(element => { crearTodoHtml(element);}); Es igual a lo de abajo
todoList.todos.forEach(crearTodoHtml);