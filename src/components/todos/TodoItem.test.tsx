import { act, fireEvent, render, screen } from '@testing-library/react';
import * as todoProvider from '../../providers/todos/todos';
import { Todo } from '../../providers/todos/types';
import { testIds } from '../../test/testId';
import TodoItem from './TodoItem';

const todo: Todo = {
    description: 'write unit test',
    id: '1',
    isCompleted: true,
};

describe('Todoitem test suite', () => {
    it('when todo is completed renders todo as checked with crossline', async () => {
        render(
            <todoProvider.TodosProvider>
                <TodoItem todo={todo} />
            </todoProvider.TodosProvider>
        );

        const todoDescriptionStrikeThrough = screen.getByTestId(testIds.todoDescriptionStrikeThrough);
        const todoCheckbox = screen.getByTestId(testIds.todoCheckbox) as HTMLInputElement;

        let todoDescription;
        try {
            todoDescription = screen.getByTestId(testIds.todoDescription);
        } catch (error) {}
        expect(todoDescriptionStrikeThrough).toBeDefined();
        expect(todoCheckbox.checked).toBeTruthy();
        expect(todoDescription).toBeUndefined();
    });

    it('when todo is not completed renders todo normally', async () => {
        render(
            <todoProvider.TodosProvider>
                <TodoItem todo={{ ...todo, isCompleted: false }} />
            </todoProvider.TodosProvider>
        );

        const todoDescription = screen.getByTestId(testIds.todoDescription);
        const todoCheckbox = screen.getByTestId(testIds.todoCheckbox) as HTMLInputElement;

        let todoDescriptionStrikeThrough;
        try {
            todoDescriptionStrikeThrough = screen.getByTestId(testIds.todoDescriptionStrikeThrough);
        } catch (error) {}
        expect(todoDescription).toBeDefined();
        expect(todoCheckbox.checked).toBeFalsy();
        expect(todoDescriptionStrikeThrough).toBeUndefined();
    });

    it('when delete button is not clicked does not render undo component ', async () => {
        render(
            <todoProvider.TodosProvider>
                <TodoItem todo={todo} />
            </todoProvider.TodosProvider>
        );
        let undoContainer;
        try {
            undoContainer = screen.getByTestId(testIds.undoDeleteContainer);
        } catch (error) {}

        expect(undoContainer).toBeUndefined();
    });

    describe('deleting todo functionality', () => {
        it('calls delete action when user click  is delete button to delete a todo', async () => {
            const deleteTodoMock = jest.fn();
            jest.spyOn(todoProvider, 'useTodos').mockImplementation(() => ({
                todos: [],
                add: jest.fn(),
                deleteTodo: deleteTodoMock,
                updateTodo: jest.fn(),
            }));

            jest.useFakeTimers();

            const { getByTestId } = render(
                <todoProvider.TodosProvider>
                    <TodoItem todo={todo} />
                </todoProvider.TodosProvider>
            );

            const deleteTodoButton = getByTestId(testIds.deleteTodoButton);
            fireEvent.click(deleteTodoButton);

            jest.advanceTimersByTime(4001);
            expect(deleteTodoMock).toHaveBeenCalled();
        });

        it('does not calls delete action when user clicks delete button and then click undo', async () => {
            const deleteTodoMock = jest.fn();
            jest.spyOn(todoProvider, 'useTodos').mockImplementation(() => ({
                todos: [],
                add: jest.fn(),
                deleteTodo: deleteTodoMock,
                updateTodo: jest.fn(),
            }));

            jest.useFakeTimers();
            const { getByTestId } = render(
                <todoProvider.TodosProvider>
                    <TodoItem todo={todo} />
                </todoProvider.TodosProvider>
            );

            const deleteTodoButton = getByTestId(testIds.deleteTodoButton);
            act(() => {
                fireEvent.click(deleteTodoButton);
            });
            const undoDeleteButton = getByTestId(testIds.undoDeleteButton);
            fireEvent.click(undoDeleteButton);

            jest.advanceTimersByTime(4001);
            expect(deleteTodoMock).not.toHaveBeenCalled();
        });
    });
});
