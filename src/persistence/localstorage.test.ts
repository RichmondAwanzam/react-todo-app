import { getSaveTodos, saveTodoItem, updateTodoItem, removeTodoItem } from './localstorage';


describe('localStorage', () => {
    it('saveTodoItem should at work expected', () => {
        saveTodoItem('exercise');
        saveTodoItem('cook');
        const retrivedTodos = getSaveTodos();
        expect(retrivedTodos.findIndex((todo) => todo.description.trim() === 'exercise')).toBeGreaterThan(-1);
        expect(retrivedTodos.findIndex((todo) => todo.description.trim() === 'cook')).toBeGreaterThan(-1);
    });

    it('updateTodoitem should at expected', () => {
        const todo = getSaveTodos()[0];
        const idToUpdate = todo.id;
        updateTodoItem({ ...todo, isCompleted: true });
        const updatedTodo = getSaveTodos().find((todo) => todo.id === idToUpdate);
        expect(updatedTodo?.isCompleted).toBeTruthy();
    });

    it('removeTodoItem should at expected', () => {
        const todo = getSaveTodos()[0];
        const idToRemove = todo.id;
        removeTodoItem(idToRemove);
        const updatedTodo = getSaveTodos().find((todo) => todo.id === idToRemove);
        expect(updatedTodo).toBeUndefined();
    });
});
