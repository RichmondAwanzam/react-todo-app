export enum TodosActions {
    addTodo = 'add_todo',
    updateTodo = 'update_todo',
    deleteTodo = 'delete_todo',
}

export type TodoActionTypes =
    | { type: TodosActions.addTodo; payload: Todo }
    | { type: TodosActions.deleteTodo; payload: string }
    | { type: TodosActions.updateTodo; payload: Todo };

export interface Todo {
    id: string;
    description: string;
    isCompleted: boolean;
}

export interface TodosState {
    todos: Array<Todo>;
}
