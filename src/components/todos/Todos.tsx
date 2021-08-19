import styled from 'styled-components';
import TodoItem from './TodoItem';
import { Todo } from '../../providers/todos/types';
import { useEffect, useRef } from 'react';

interface Props {
    todos: Todo[];
}

const TodoContainer = styled.div`
    overflow-x: hidden;
    overflow-y: auto;
    height: calc(100% - 120px);
`;

const NoTodoContainer = styled.div`
    display: flex;
    height: 100%;
    width: 100%;
    justify-content: center;
    flex-flow: column;
    align-items: center;
    background: #f9f9f9;
    border-radius: 23px;
    color: #3d2f2f;
`;

const Todos: React.FC<Props> = ({ todos }) => {
    const todosAutoScrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (todosAutoScrollRef && todosAutoScrollRef.current && todosAutoScrollRef.current.scrollIntoView) {
            todosAutoScrollRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [todos.length, todosAutoScrollRef]);

    return (
        <TodoContainer>
            {Boolean(todos.length) ? (
                todos.map((todo) => <TodoItem key={todo.id} todo={todo} />)
            ) : (
                <NoTodoContainer>
                    <span>You do not have any todo item.</span>
                    <span>Please create a new todo or take some rest. :)</span>
                </NoTodoContainer>
            )}
            <div ref={todosAutoScrollRef} />
        </TodoContainer>
    );
};

export default Todos;
