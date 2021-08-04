import React from 'react';
interface APIDocProps {
    markdownRemark: any;
    githubUrl: string;
    relativePath: string;
    exampleSections: any;
    description: string;
    codeQuery: string;
    showAPISearch: boolean;
}
declare const APIDoc: React.FC<APIDocProps>;
export default APIDoc;
