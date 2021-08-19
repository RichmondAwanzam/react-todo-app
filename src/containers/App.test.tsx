import { render } from '@testing-library/react';
import App from './App';
import TodosProvider from '../providers/todos/todos';



  describe('App', () => {
    it('should render', () => {
        const { container } = render(
            <TodosProvider>
                <App />
            </TodosProvider>
        );
        expect(container.querySelector('.mainapp')).toBeInTheDocument();
    });
});

