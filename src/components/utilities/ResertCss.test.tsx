import { render } from '@testing-library/react';
import ResetCss from './ResetCss';

describe('ResetCss', () => {
    it('to match snapshot', () => {
        const { container } = render(<ResetCss />);
        expect(container).toMatchSnapshot();
    });
});
