import { css } from 'styled-components';

const breakpoints = {
    breakpointTablet: '767px',
    breakpointDesktop: '1024px',
};

export type ScreenType = keyof typeof breakpoints;

export const getBreakPointValue = (breakpoint: ScreenType) => parseInt(breakpoints[breakpoint].replace('px', ''), 10);

const generateMediaQueries = (screenType: ScreenType) => (...args: Parameters<typeof css>) => css`
    @media all and (min-width: ${breakpoints[screenType]}) {
        ${css(...args)}
    }
`;

export const forTablet = generateMediaQueries('breakpointTablet');
export const forDesktop = generateMediaQueries('breakpointDesktop');


export const forIE = (...args: Parameters<typeof css>) => css`
    @media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {
        ${css(...args)}
    }
`;


export default breakpoints;
