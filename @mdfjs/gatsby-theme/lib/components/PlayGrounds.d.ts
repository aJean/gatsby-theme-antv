import React from 'react';
import type { TreeItem } from './PlayGround';
export interface PlayGroundItemProps {
    source: string;
    examples: PlayGroundItemProps[];
    babeledSource: string;
    absolutePath?: string;
    relativePath?: string;
    screenshot?: string;
    recommended?: boolean;
    filename: string;
    title?: string;
    location?: Location;
    playground?: {
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
}
interface PlayGroundsProps {
    getPath: (currentExample: PlayGroundItemProps) => string;
    currentExample: PlayGroundItemProps;
    updateCurrentExample: (val: PlayGroundItemProps) => void;
    treeData: TreeItem[];
}
declare const PlayGrounds: React.FC<PlayGroundsProps>;
export default PlayGrounds;
