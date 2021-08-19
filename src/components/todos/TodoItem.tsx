import React, { useEffect, useRef, useState } from 'react';
import { useTodos } from '../../providers/todos/todos';
import { Todo } from '../../providers/todos/types';
import styled, { keyframes } from 'styled-components';
import CheckBoxWithLabel from '../widgets/CheckboxWithLabel';
import Svg from '../svgs';
import { testIds } from '../../test/testId';

interface TodoProps {
    todo: Todo;
}

const DeleteIcon = styled(Svg)`
    width: 28px;
    color: #e33118;
    appearance: none;
    background: transparent;
`;

const TodoWrapper = styled.div`
    position: relative;
    display: flex;
    min-height: 60px;
    align-items: center;
    jusitify-items: space-between;
    border-bottom: 1px solid #ccc;
    padding: 15px 0;

    :first-child {
        border-top: 1px solid #ccc;
    }
`;
enum UndoAnimeType {
    ENTRY = 'ENTRY',
    EXIT = 'EXIT',
}

const animationSlideFromLeft = (animeType: UndoAnimeType) => keyframes`
{   
    ${
        animeType === UndoAnimeType.ENTRY
            ? `from {
            width: 0;
        } 
        to {
            width: 100%;
        }`
            : `from {
            width: 100%;
        } 
        to {
            width: 0%;
        }`
    }

}`;

const UndoDeleteWrapper = styled.div<{ animeType: UndoAnimeType }>`
    position: absolute;
    width: 100%;
    display: flex;
    height: 100%;
    align-items: center;
    justify-content: space-between;
    background: #e9e9e9;
    color: #525252;
    padding: 0 30px;
    animation: 0.3s ${({ animeType }) => animationSlideFromLeft(animeType)};
`;

const UndoButton = styled.button`
    appearance: none;
    background: transparent;
    color: #525252;
    text-decoration: underline;
`;

type TimeOutId = NodeJS.Timeout;

const UNDO_GRACE_PERIOD = 4000;

const TodoItem: React.FC<TodoProps> = ({ todo }) => {
    const { deleteTodo, updateTodo } = useTodos();
    const [isConfirmDeleteActive, setConfirmDeleteActive] = useState<boolean>(false);
    const [animeType, setAnimeType] = useState<UndoAnimeType>(UndoAnimeType.ENTRY);

    const timerIdRef = useRef<TimeOutId>();

    const handleDeleteTodo = () => {
        setConfirmDeleteActive(true);
        setAnimeType(UndoAnimeType.ENTRY);
        const timeOutId = setTimeout(() => {
            deleteTodo(todo.id);
        }, UNDO_GRACE_PERIOD);
        if (timerIdRef) timerIdRef.current = timeOutId;
    };

    const undoDelete = () => {
        if (timerIdRef && timerIdRef.current) clearTimeout(timerIdRef.current);
        setAnimeType(UndoAnimeType.EXIT);
    };

    const handleUndoAnimeEnd = () => {
        if (animeType === UndoAnimeType.EXIT) {
            setConfirmDeleteActive(false);
        }
    };

    const handleCheckBoxChange = (isChecked: boolean) => {
        const updatedTodo: Todo = { ...todo, isCompleted: isChecked };
        updateTodo(updatedTodo);
    };

    useEffect(() => {
        return () => {
            timerIdRef.current = undefined;
            setConfirmDeleteActive(false);
        };
    }, []);

    return (
        <TodoWrapper>
            {isConfirmDeleteActive && (
                <UndoDeleteWrapper animeType={animeType} onAnimationEnd={handleUndoAnimeEnd} data-testid={testIds.undoDeleteContainer}>
                    <span>Deleting todo ...</span>
                    <UndoButton onClick={undoDelete} data-testid={testIds.undoDeleteButton}>Undo</UndoButton>
                </UndoDeleteWrapper>
            )}
            <CheckBoxWithLabel isChecked={todo.isCompleted} text={todo.description} onChange={handleCheckBoxChange} />
            <button onClick={handleDeleteTodo} data-testid={testIds.deleteTodoButton}>
                <DeleteIcon type="trashBin" />
            </button>
        </TodoWrapper>
    );
};

export default TodoItem;
