/// <reference types="react" />
import { WithTranslation } from 'react-i18next';
interface PlayGroundProps {
    source: string;
    babeledSource: string;
    relativePath?: string;
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
    height?: number;
    replaceId?: string;
}
interface MdPlaygroundProps {
    examples: PlayGroundProps[];
    path: string;
    height?: number;
    rid?: string;
}
declare const _default: import("react").ComponentType<Omit<import("react-i18next").Subtract<MdPlaygroundProps & WithTranslation<"translation">, import("react-i18next").WithTranslationProps>, keyof WithTranslation<N>> & import("react-i18next").WithTranslationProps>;
export default _default;
