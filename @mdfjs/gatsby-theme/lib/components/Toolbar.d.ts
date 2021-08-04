import React from 'react';
export declare enum EDITOR_TABS {
  JAVASCRIPT = 'JavaScript',
  DATA = 'Data',
}
interface ToolbarProps {
  sourceCode: string;
  fileExtension: string;
  title:
    | {
        zh?: string;
        en?: string;
      }
    | string;
  location?: Location;
  playground: {
    container?: string;
    playgroundDidMount?: string;
    playgroundWillUnmount?: string;
    dependencies?: {
      [key: string]: string;
    };
    devDependencies?: {
      [key: string]: string;
    };
    htmlCodeTemplate?: string;
  };
  isFullScreen?: boolean;
  editorTabs: EDITOR_TABS[];
  currentEditorTab: EDITOR_TABS;
  onEditorTabChange: (tab: EDITOR_TABS) => void;
  onToggleFullscreen?: null | (() => void);
  onExecuteCode: () => void;
}
declare const Toolbar: React.FC<ToolbarProps>;
export default Toolbar;
