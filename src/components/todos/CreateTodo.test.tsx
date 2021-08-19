import { render, screen, fireEvent, act } from '@testing-library/react';
import * as TodosContext from '../../providers/todos/todos';
import { testIds } from '../../test/testId';
import CreateTodo from './CreateTodo';

describe('CreateTodo test suite', () => {
    const addTodo = jest.fn();
    jest.spyOn(TodosContext, 'useTodos').mockImplementation(() => ({
        todos: [],
        add: addTodo,
        deleteTodo: jest.fn(),
        updateTodo: jest.fn(),
    }));
    beforeEach(() => {
        render(
            <TodosContext.TodosProvider>
                <CreateTodo />
            </TodosContext.TodosProvider>
        );
    });

    it('Add Todo button should be disable when input is not interacted with', () => {
        const todoBtn = screen.getByTestId(testIds.addTodoBtn) as HTMLButtonElement;
        expect(todoBtn.disabled).toBeTruthy();
    });

    it('Add Todo button should be active when text is typed into Todo input element', () => {
        const todoInput = screen.getByTestId(testIds.todoInput) as HTMLInputElement;

        fireEvent.change(todoInput, {
            target: {
                value: 'create',
            },
        });

        const todoBtn = screen.getByTestId(testIds.addTodoBtn) as HTMLButtonElement;
        expect(todoBtn.disabled).toBeFalsy();
    });

    it('Todo input should be cleared when user  submits/adds current todo', () => {
        const todoInput = screen.getByTestId(testIds.todoInput) as HTMLInputElement;

        fireEvent.change(todoInput, {
            target: {
                value: 'create',
            },
        });
        const todoBtn = screen.getByTestId(testIds.addTodoBtn) as HTMLButtonElement;

        act(() => {
            fireEvent.click(todoBtn);
        });

        expect(todoInput.value).toEqual('');
    });

    it('add todo action should be called when user submits/adds current todo', () => {
    
        const todoInput = screen.getByTestId(testIds.todoInput) as HTMLInputElement;

        fireEvent.change(todoInput, {
            target: {
                value: 'cook',
            },
        });
        const addTodoBtn = screen.getByTestId(testIds.addTodoBtn) as HTMLButtonElement;

        act(() => {
            fireEvent.click(addTodoBtn);
        });

        expect(addTodo).toHaveBeenCalled();
    });
});
