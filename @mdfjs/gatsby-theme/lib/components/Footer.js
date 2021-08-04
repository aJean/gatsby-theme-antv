'use strict';
var __createBinding =
  (this && this.__createBinding) ||
  (Object.create
    ? function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        Object.defineProperty(o, k2, {
          enumerable: true,
          get: function () {
            return m[k];
          },
        });
      }
    : function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        o[k2] = m[k];
      });
var __setModuleDefault =
  (this && this.__setModuleDefault) ||
  (Object.create
    ? function (o, v) {
        Object.defineProperty(o, 'default', { enumerable: true, value: v });
      }
    : function (o, v) {
        o['default'] = v;
      });
var __importStar =
  (this && this.__importStar) ||
  function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null)
      for (var k in mod)
        if (k !== 'default' && Object.prototype.hasOwnProperty.call(mod, k))
          __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const react_1 = __importStar(require('react'));
const gatsby_1 = require('gatsby');
const rc_footer_1 = __importDefault(require('rc-footer'));
const react_i18next_1 = require('react-i18next');
const icons_1 = require('@ant-design/icons');
const classnames_1 = __importDefault(require('classnames'));
const omit_js_1 = __importDefault(require('omit.js'));
const Footer_module_less_1 = __importDefault(require('./Footer.module.less'));
require('rc-footer/assets/index.less');
const Footer = ({
  columns,
  bottom,
  theme = 'dark',
  language,
  rootDomain = '',
  location,
  ...restProps
}) => {
  const [withMenu, setWithMenu] = react_1.useState(false);
  const { t, i18n } = react_i18next_1.useTranslation();
  const lang = language || i18n.language;
  react_1.useEffect(() => {
    // 有 menu 的模版 footer 表现不同，通过 location 判断加载的模版
    const pathPrefix = gatsby_1.withPrefix('/').replace(/\/$/, '');
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
      setWithMenu(!(location.key === 'initial'));
    } else {
      setWithMenu(false);
    }
  }, [location]);
  return react_1.default.createElement(rc_footer_1.default, {
    maxColumnsPerRow: 5,
    theme: theme,
    columns: columns || [],
    className: classnames_1.default(Footer_module_less_1.default.footer, {
      [Footer_module_less_1.default.withMenu]: withMenu,
    }),
    bottom:
      bottom ||
      react_1.default.createElement(
        react_1.default.Fragment,
        null,
        react_1.default.createElement(
          'div',
          { className: Footer_module_less_1.default.bottom },
          react_1.default.createElement(
            'div',
            null,
            react_1.default.createElement(
              'a',
              {
                href: 'https://online.ai101test.com',
                target: '_blank',
                rel: 'noopener noreferrer',
              },
              react_1.default.createElement(icons_1.WeiboOutlined, null),
            ),
            react_1.default.createElement(
              'a',
              {
                href: 'https://online.ai101test.com',
                target: '_blank',
                rel: 'noopener noreferrer',
              },
              react_1.default.createElement(icons_1.ZhihuOutlined, null),
            ),
            react_1.default.createElement(
              'a',
              {
                href: 'https://git.100tal.com/jituan_101_web/101console',
                target: '_blank',
                rel: 'noopener noreferrer',
              },
              react_1.default.createElement(icons_1.GithubOutlined, null),
            ),
            react_1.default.createElement(
              'a',
              { href: 'https://online.ai101test.com' },
              t('关于我们'),
            ),
            react_1.default.createElement(
              'a',
              {
                href: 'https://fe.ai101test.com',
                target: '_blank',
                rel: 'noopener noreferrer',
              },
              t('测试地址'),
            ),
          ),
          react_1.default.createElement(
            'div',
            null,
            '\u00A9 ',
            new Date().getFullYear(),
            ' Made with \u2764 by ',
            ' ',
            react_1.default.createElement(
              'a',
              { href: 'https://github.com/aJean' },
              'qy',
            ),
          ),
        ),
      ),
    ...omit_js_1.default(restProps, ['githubUrl']),
  });
};
exports.default = Footer;
