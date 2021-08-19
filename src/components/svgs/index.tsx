// Use this module if you want to lazy load (split out) SVG icons only! Otherwise directly import them.
import React from 'react';
import TrashBin from './TrashBin';

const Svg = {
    trashBin: TrashBin,
};

export type SvgType = keyof typeof Svg;

export interface SvgProps extends React.SVGProps<SVGSVGElement> {
    type: SvgType;
    className?: string;
}

/** Lazy load a SVG icon. */
export default ({ type, className, ...props }: SvgProps) => <div className={className}>{React.createElement(Svg[type], props)}</div>;
