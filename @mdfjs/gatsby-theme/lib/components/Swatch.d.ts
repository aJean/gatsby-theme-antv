import { FC } from 'react';
interface SwatchProps {
    title: string;
    darkmode?: boolean;
    colors?: string;
    colornames?: string;
    grid?: 'sudoku';
    descriptions?: string;
}
declare const Swatch: FC<SwatchProps>;
export default Swatch;
