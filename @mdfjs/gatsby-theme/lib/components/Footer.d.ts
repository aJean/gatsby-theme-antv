import React from 'react';
import { FooterProps as RcFooterProps } from 'rc-footer';
import 'rc-footer/assets/index.less';
interface FooterProps extends RcFooterProps {
    rootDomain?: string;
    language?: string;
    githubUrl?: string;
    location: Location;
}
declare const Footer: React.FC<FooterProps>;
export default Footer;
