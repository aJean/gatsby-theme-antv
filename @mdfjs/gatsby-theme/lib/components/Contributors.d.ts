import React from 'react';
declare type Props = {
  contributors: Array<{
    author?: string;
    avatar: string;
    github: string;
  }>;
  style?: React.CSSProperties;
};
declare const Contributors: React.FC<Props>;
export default Contributors;
