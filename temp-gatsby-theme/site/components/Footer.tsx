import React, { useState, useEffect } from 'react';
import { withPrefix } from 'gatsby';
import { default as RCFooter, FooterProps as RcFooterProps } from 'rc-footer';
import { useTranslation } from 'react-i18next';
import {
  GithubOutlined,
  WeiboOutlined,
  ZhihuOutlined,
} from '@ant-design/icons';
import classnames from 'classnames';
import omit from 'omit.js';
import styles from './Footer.module.less';
import 'rc-footer/assets/index.less';

interface FooterProps extends RcFooterProps {
  language?: string;
  githubUrl?: string;
  links?: any;
  location: Location;
}

const Footer: React.FC<FooterProps> = ({
  columns,
  links,
  theme = 'dark',
  language,
  location,
  ...restProps
}) => {
  const [withMenu, setWithMenu] = useState<boolean>(false);
  const { t, i18n } = useTranslation();
  const llinks = Object.assign(
    {
      wb: 'https://online.ai101test.com',
      zh: 'https://online.ai101test.com',
      git: 'https://git.100tal.com/jituan_101_web/101console',
      we: 'https://online.ai101test.com',
    },
    links,
  );

  useEffect(() => {
    // 有 menu 的模版 footer 表现不同，通过 location 判断加载的模版
    const pathPrefix = withPrefix('/').replace(/\/$/, '');
    const path = location.pathname.replace(pathPrefix, '');
    const isExamplePage =
      path.startsWith(`/zh/examples`) || path.startsWith(`/en/examples`);
    const isDocsPage =
      path.startsWith(`/zh/docs`) || path.startsWith(`/en/docs`);
    // examples 页面里目前只有 gallery 是有 footer 的，
    // 且 gallery 会出现 `location.key = 'initial'` 逻辑，所以先统一处理为需要 menu
    if (isExamplePage) {
      setWithMenu(true);
    } else if (isDocsPage) {
      // 文档页为 404 时 footer 没有 menu
      setWithMenu(!((location as any).key === 'initial'));
    } else {
      setWithMenu(false);
    }
  }, [location]);

  return (
    <RCFooter
      maxColumnsPerRow={5}
      theme={theme}
      columns={columns || []}
      className={classnames(styles.footer, {
        [styles.withMenu]: withMenu,
      })}
      bottom={
        <>
          <div className={styles.bottom}>
            <div>
              <a href={llinks.wb} target="_blank" rel="noopener noreferrer">
                <WeiboOutlined />
              </a>
              <a href={llinks.zh} target="_blank" rel="noopener noreferrer">
                <ZhihuOutlined />
              </a>
              <a href={llinks.git} target="_blank" rel="noopener noreferrer">
                <GithubOutlined />
              </a>
              <a href={llinks.we}>{t('关于我们')}</a>
            </div>
            <div>
              © {new Date().getFullYear()} Made with ❤
              <span className={styles.by}>by</span>
              <a href="https://github.com/aJean">qy</a>
            </div>
          </div>
        </>
      }
      {...omit(restProps, ['githubUrl'])}
    />
  );
};

export default Footer;
