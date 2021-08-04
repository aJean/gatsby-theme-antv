/// <reference types="react" />
import { WithTranslation } from 'react-i18next';
interface PlayGroundProps {
    exampleSections: any;
    location: Location;
    markdownRemark: any;
    categories: string[];
    allDemos: any;
    examples: any;
    treeData: TreeItem[];
}
export interface TreeItem {
    title?: string;
    value?: string;
    key?: string;
    children?: any;
    icon?: string;
    relativePath?: string;
    filename?: string;
    screenshot?: string;
    node?: any;
}
declare const _default: import("react").ComponentType<Omit<import("react-i18next").Subtract<PlayGroundProps & WithTranslation<"translation">, import("react-i18next").WithTranslationProps>, keyof WithTranslation<N>> & import("react-i18next").WithTranslationProps>;
export default _default;
