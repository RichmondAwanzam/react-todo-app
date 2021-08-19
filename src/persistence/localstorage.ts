import { Todo } from '../providers/todos/types';
import { v4 as uuidv4 } from 'uuid';

const STORAGE_KEY = 'zooplus-todos-history';

const saveTodos = (items: Todo[]): void => {
    if ('localStorage' in window) {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    }
};

export const getSaveTodos = (): Todo[] => {
    let savedTodos: Todo[] = [];

    if ('localStorage' in window) {
        savedTodos = JSON.parse((window as any).localStorage.getItem(STORAGE_KEY)) || [];
    }
    return savedTodos;
};

export const saveTodoItem = (todoDescription: string): Todo => {
    let todos = getSaveTodos();
    const todo: Todo = { isCompleted: false, description: todoDescription, id: uuidv4() };
    todos.push(todo);
    saveTodos(todos);
    return todo;
};

export const removeTodoItem = (todoId: string): string => {
    const currentTodos = getSaveTodos();
    const index = currentTodos.findIndex((todo) => todo.id === todoId);

    const remainingTodo = currentTodos.filter((todo) => todo.id !== todoId);

    saveTodos(remainingTodo);
    return todoId;
};

export const updateTodoItem = (updatedTodo: Todo): Todo => {
    const currentTodos = getSaveTodos();
    const updatedTodos = currentTodos.map((todo) => todo.id === updatedTodo.id ? updatedTodo : todo);


    saveTodos(updatedTodos);
    return updatedTodo;
};
