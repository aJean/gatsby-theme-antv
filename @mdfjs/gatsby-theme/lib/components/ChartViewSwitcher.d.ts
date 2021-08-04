import React from 'react';
interface Prop {
    updateView: (val: string) => void;
    view: string;
}
declare const ChartViewSwitcher: React.FC<Prop>;
export default ChartViewSwitcher;
