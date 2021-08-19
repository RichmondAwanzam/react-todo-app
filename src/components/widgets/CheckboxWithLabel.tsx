import React from 'react';
import styled from 'styled-components';
import { testIds } from '../../test/testId';
const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
`;

const StyledCheckbox = styled.input`
    margin-right: 20px;
    appearance: none;
    border: 3px solid #a29c9c;
    height: 23px;
    width: 23px;
    min-width: 23px;
    background: #fff;

    &:checked {
        appearance: none;
        background-color: #90c48f;
    }
`;

interface Props {
    id?: string;
    text: string;
    value?: string;
    isChecked: boolean;
    onChange?: (isChecked: boolean) => void;
    className?: string;
}

const CheckBoxWithLabel: React.FC<Props> = ({ className, id: propId, text, value = '', isChecked, onChange }) =>  (
        <Wrapper className={className}>
            <StyledCheckbox
                data-testid={testIds.todoCheckbox}
                checked={isChecked}
                type="checkbox"
                value={value}
                onChange={() => onChange && onChange(!isChecked)}
            />
            {isChecked ? <s data-testid={testIds.todoDescriptionStrikeThrough}>{text}</s> : <span data-testid={testIds.todoDescription}>{text}</span>}
        </Wrapper>
    );


export default CheckBoxWithLabel;
