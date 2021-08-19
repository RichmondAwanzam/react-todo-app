import { TodosActions, TodoActionTypes, TodosState } from '../providers/todos/types';

const initialState: TodosState = {
    todos: [],
};

export const todosReducer = (state = initialState, action: TodoActionTypes): TodosState => {
    switch (action.type) {
        case TodosActions.addTodo:
            const todo = action.payload;
            return { ...state, todos: [...state.todos, todo] };

        case TodosActions.updateTodo:
            const updatedTodo = action.payload;
            const todos = state.todos.map((todo) => (todo.id === updatedTodo.id ? updatedTodo : todo));
            return { ...state, todos };

        case TodosActions.deleteTodo:
            const todoId = action.payload;
            const remainingTodos = state.todos.filter((todo) => todo.id !== todoId);
            return { ...state, todos: remainingTodos };

        default:
            return state;
    }
};
