import { todosReducer } from './reducer';
import { Todo, TodosActions } from '../providers/todos/types';

const testTodos: Todo[] = [
    { description: 'do grocery shopping', id: '3', isCompleted: false },
    { description: 'write test', id: '1', isCompleted: true },
    { description: 'exercise', id: '6', isCompleted: true },
];

describe('Todos Reducer', () => {
    it('reduces properly  when addTodo action is fired with a todo', () => {
        const state = todosReducer(undefined, {
            type: TodosActions.addTodo,
            payload: { description: 'write test', id: '1', isCompleted: true },
        });
        expect(state.todos.length).toEqual(1);
        expect(state.todos).toEqual([{ description: 'write test', id: '1', isCompleted: true }]);
    });

    it('reduces properly  when deleteTodo action is fired with a todo', () => {
        const state = todosReducer(
            { todos: testTodos },
            {
                type: TodosActions.deleteTodo,
                payload: '3',
            }
        );
        expect(state.todos.length).toEqual(2);
        expect(state.todos).toEqual(testTodos.filter((todo) => todo.id !== '3'));
    });

    it('reduces properly  when updateTodo action is fired with a todo', () => {
        const state = todosReducer(
            { todos: testTodos },
            {
                type: TodosActions.updateTodo,
                payload: { description: 'exercise', id: '6', isCompleted: false },
            }
        );
        expect(state.todos.length).toEqual(3);
        expect(state.todos).toEqual([
            { description: 'do grocery shopping', id: '3', isCompleted: false },
            { description: 'write test', id: '1', isCompleted: true },
            { description: 'exercise', id: '6', isCompleted: false },
        ]);
    });
});
