import React, { ReactElement, useReducer, useContext } from 'react';
import { Todo, TodosActions } from './types';
import { todosReducer } from '../../reducers/reducer';
import { getSaveTodos, removeTodoItem, saveTodoItem, updateTodoItem } from '../../persistence/localstorage';

interface TodoContextProps {
    todos: Todo[];
    add: (todoDescription: string) => void;
    updateTodo: (todo: Todo) => void;
    deleteTodo: (todoId: string) => void;
}

export const TodosContext = React.createContext<TodoContextProps>({
    todos: [],
    add: () => null,
    updateTodo: () => null,
    deleteTodo: () => null,
});

export const TodosProvider: React.FC = ({ children }): ReactElement => {
    const [state, dispatch] = useReducer(todosReducer, { todos: getSaveTodos() });

    const add = (todoDescription: string) => {
        dispatch({ type: TodosActions.addTodo, payload: saveTodoItem(todoDescription) });
    };

    const updateTodo = (todo: Todo) => {
        dispatch({ type: TodosActions.updateTodo, payload: updateTodoItem(todo) });
    };

    const deleteTodo = (todoId: string) => {
        dispatch({ type: TodosActions.deleteTodo, payload: removeTodoItem(todoId) });
    };

    return (
        <TodosContext.Provider
            value={{
                todos: state.todos,
                add,
                deleteTodo,
                updateTodo,
            }}
        >
            {children}
        </TodosContext.Provider>
    );
};

export const useTodos = () => {
    return useContext(TodosContext);
};

export default TodosProvider;
