import React from 'react';
export interface CollapseDataProp {
  title?: string;
  show?: boolean;
  content?: string;
  children?: CollapseDataProp[];
  options: {
    require?: string;
    type?: string;
    default?: string;
  };
}
declare const Tabs: React.FC<{
  active: 'API' | 'design';
  examplesCount?: number;
  title?: string;
  updateActive: (val: 'API' | 'design') => void;
  updateOutsideActiveKeys: (val: string[]) => void;
  updateInsideActiveKeys: (val: string[]) => void;
  updateSearchQuery: (val: string) => void;
  updateCollapseData: (val: CollapseDataProp[]) => void;
  codeQuery: string;
  content?: CollapseDataProp[];
  showAPISearch: boolean;
}>;
export default Tabs;
