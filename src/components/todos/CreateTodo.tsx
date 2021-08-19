import { useState } from 'react';
import styled from 'styled-components';
import { useTodos } from '../../providers/todos/todos';

import { forDesktop } from '../../styles/breakpoints';
import { testIds } from '../../test/testId';

const StyledForm = styled.form`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin: auto;
    height: 100%;


    ${forDesktop`
        width: 960px;
        border-radius: 27px;
    `}
`;

const StyledInput = styled.input`
    border: none;
    background: #f6f7fb;
    flex-grow: 1;
    margin: 0 20px 0 0;
    padding: 10px 20px;

    :placeholder: {
        color: #e8e8e8;
    }
`;

const SubmitButton = styled.button`
    background: #90c48f;
    color: #fff;
    padding: 10px 20px;
    :disabled {
        background: #ccc;
    }
`;

const CreateTodo = () => {
    const { add } = useTodos();
    const [todoText, setTodoText] = useState('');

    const onSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
        evt.preventDefault();

        add(todoText);
        setTodoText('');
    };

    return (
        <>
            <StyledForm onSubmit={onSubmit}>
                <StyledInput
                    data-testid={testIds.todoInput}
                    type="text"
                    onChange={(event) => setTodoText(event.target.value)}
                    value={todoText}
                    placeholder="type your todo description here ..."
                />
                <SubmitButton data-testid={testIds.addTodoBtn} type="submit" disabled={!todoText}>
                    Add Todo
                </SubmitButton>
            </StyledForm>
        </>
    );
};

export default CreateTodo;
