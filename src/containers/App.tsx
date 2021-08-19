import Todos from '../components/todos/Todos';
import styled from 'styled-components';
import ResetCss from '../components/utilities/ResetCss';
import { useTodos } from '../providers/todos/todos';
import CreateTodo from '../components/todos/CreateTodo';
import { forDesktop } from '../styles/breakpoints';

const AppWrapper = styled.main`
    width: 100%;
    height: 100vh;
    display: grid;
    grid-template-rows: 28px 72px 66px 1fr 30px 100px;
`;

const TaintStrip = styled.div`
    background: #c4e5b4;
    grid-row: 1/2;
    grid-column: 1/-1;
`;

const Backdrop = styled.div`
    background: #90c48f;
    grid-row: 2/4;
    grid-column: 1/-1;
`;

const AppContent = styled.div`
    grid-row: 3/5;
    grid-column: 1/-1;
    width: 100%;
    margin: 0 auto;
    background: #fff;
    padding: 20px;
    box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.25);
    border-radius: 0;

    ${forDesktop`
        width: 960px;
        border-radius: 27px;
        padding: 20px 30px;
    `}
`;

const AddTodoWrapper = styled.div`
    grid-row: 6/7;
    grid-column: 1/-1;
    background: #f1f1f1;
    padding: 30px 10px;

    ${forDesktop`
    flex-flow: row;
    align-items: center;
    padding: 30px;
  `}
`;

const Header = styled.div`
    display: flex;
    flex-flow: column;
    justify-content: space-between;
    align-items: flex-start;

    ${forDesktop`
      flex-flow: row;
      align-items: center;
    `}
`;

const AppTitle = styled.h1`
    color: #525252;
    font-size: 18px;
    margin-bottom: 20px;

    ${forDesktop`
      font-size: 24px;
      margin: 0;
    `}
`;
const InfoText = styled.h3`
    padding: 20px 0;
    font-weight: normal;
    color: #727272;
`;

const App = () => {
    const { todos } = useTodos();

    const completedTodoCount = todos.filter((todo) => todo.isCompleted).length;
    return (
        <>
            <ResetCss />
            <AppWrapper className="mainapp">
                <TaintStrip />
                <Backdrop />
                <AppContent>
                    <Header>
                        <AppTitle className="child">Zooplus Todo App</AppTitle>
                        <div className="child">
                            <span>Total of items: {todos.length}</span> | <span>Completed: {completedTodoCount}</span>
                        </div>
                    </Header>
                    <InfoText>What to do next</InfoText>

                    <Todos todos={todos} />
                </AppContent>
                <AddTodoWrapper>
                    <CreateTodo />
                </AddTodoWrapper>
            </AppWrapper>
        </>
    );
};

export default App;
