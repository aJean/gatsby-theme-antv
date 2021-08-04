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
exports.EDITOR_TABS = void 0;
const react_1 = __importStar(require('react'));
const icons_1 = require('@ant-design/icons');
const antd_1 = require('antd');
const path_1 = __importDefault(require('path'));
const define_1 = require('codesandbox/lib/api/define');
const sdk_1 = __importDefault(require('@stackblitz/sdk'));
const react_i18next_1 = require('react-i18next');
const indent_string_1 = __importDefault(require('indent-string'));
const PageLoading_1 = __importDefault(require('./PageLoading'));
const utils_1 = require('../utils');
const Toolbar_module_less_1 = __importDefault(require('./Toolbar.module.less'));
const { Paragraph } = antd_1.Typography;
const MonacoEditor = react_1.lazy(() =>
  Promise.resolve().then(() => __importStar(require('react-monaco-editor'))),
);
var EDITOR_TABS;
(function (EDITOR_TABS) {
  EDITOR_TABS['JAVASCRIPT'] = 'JavaScript';
  EDITOR_TABS['DATA'] = 'Data';
})((EDITOR_TABS = exports.EDITOR_TABS || (exports.EDITOR_TABS = {})));
const Toolbar = ({
  sourceCode,
  fileExtension,
  playground = {},
  location,
  title = '',
  isFullScreen = false,
  editorTabs,
  currentEditorTab,
  onEditorTabChange,
  onToggleFullscreen = null,
  onExecuteCode,
}) => {
  const { t, i18n } = react_i18next_1.useTranslation();
  const requireMatches = sourceCode.match(/require\(['"](.*)['"]\)/g) || [];
  const importMatches = sourceCode.match(/from\s+['"](.*)['"]/g) || [];
  const deps = {};
  [...requireMatches, ...importMatches].forEach((match) => {
    const requireMatch = match.match(/require\(['"](.*)['"]\)/);
    if (requireMatch && requireMatch[1]) {
      deps[requireMatch[1]] = 'latest';
    }
    const importMatch = match.match(/from\s+['"](.*)['"]/);
    if (importMatch && importMatch[1]) {
      deps[importMatch[1]] = 'latest';
    }
  });
  const exmapleTitle = typeof title === 'object' ? title[i18n.language] : title;
  // 使用 playground.dependencies 定义的版本号
  const dependencies = playground.dependencies || {};
  const devDependencies = playground.devDependencies || {};
  Object.keys(dependencies).forEach((name) => {
    deps[name] = dependencies[name];
  });
  const codeSandboxConfig = {
    files: {
      'package.json': {
        content: {
          main: `index.${fileExtension}`,
          dependencies: deps,
          devDependencies,
        },
      },
      [`index.${fileExtension}`]: {
        content: sourceCode,
      },
      'index.html': {
        content: playground.container || '<div id="container" />',
      },
    },
  };
  function replaceFetchUrl(text) {
    const dataFileMatch = sourceCode.match(/fetch\('(.*)'\)/);
    if (
      dataFileMatch &&
      dataFileMatch.length > 0 &&
      !dataFileMatch[1].startsWith('http')
    ) {
      return text.replace(
        dataFileMatch[1],
        path_1.default.join(
          location.origin || '',
          location.pathname || '',
          '..',
          dataFileMatch[1],
        ),
      );
    }
    return text;
  }
  codeSandboxConfig.files[`index.${fileExtension}`].content =
    replaceFetchUrl(sourceCode);
  function getHtmlCodeTemplate() {
    const { htmlCodeTemplate = '', container = '' } = playground;
    const insertCssMatcher = /insertCss\(`\s*(.*)\s*`\);/;
    const code = replaceFetchUrl(sourceCode)
      .replace(/import\s+.*\s+from\s+['"].*['"];?/g, '')
      .replace(insertCssMatcher, '')
      .replace(/^\s+|\s+$/g, '');
    let result = htmlCodeTemplate
      .replace('{{code}}', indent_string_1.default(code, 4))
      .replace('{{title}}', exmapleTitle || 'example');
    const customStyles = sourceCode.match(insertCssMatcher);
    if (customStyles && customStyles[1]) {
      result = result.replace(
        '</head>',
        `  <style>\n${indent_string_1.default(
          customStyles[1],
          4,
        )}\n    </style>\n  </head>`,
      );
    }
    if (container) {
      result = result.replace(
        '<body>',
        `<body>\n${indent_string_1.default(container, 4)}`,
      );
    }
    return result;
  }
  const riddlePrefillConfig = {
    title: exmapleTitle,
    js: sourceCode,
    html: playground.container || '<div id="container" />',
  };
  const stackblitzPrefillConfig = {
    title: exmapleTitle || '',
    description: '',
    template: 'create-react-app',
    dependencies: deps,
    files: {
      [`index.${fileExtension.startsWith('ts') ? 'ts' : 'js'}`]: sourceCode,
      'index.html': playground.container || '<div id="container" />',
    },
  };
  const [riddleVisible, updateRiddleVisible] = react_1.useState(false);
  react_1.useEffect(() => {
    utils_1.ping((status) => {
      updateRiddleVisible(status === 'responded');
    });
  }, []);
  const [htmlModalVisible, updateHtmlModalVisible] = react_1.useState(false);
  return react_1.default.createElement(
    'div',
    { className: Toolbar_module_less_1.default.toolbar },
    react_1.default.createElement(
      'div',
      { className: Toolbar_module_less_1.default.editortabs },
      editorTabs.map((tab, index) =>
        react_1.default.createElement(
          'span',
          {
            key: index,
            className:
              tab === currentEditorTab
                ? Toolbar_module_less_1.default.current
                : '',
            onClick: () => onEditorTabChange(tab),
          },
          tab,
        ),
      ),
    ),
    riddleVisible
      ? react_1.default.createElement(
          'form',
          {
            action: '//riddle.alibaba-inc.com/riddles/define',
            method: 'POST',
            target: '_blank',
          },
          react_1.default.createElement('input', {
            type: 'hidden',
            name: 'data',
            value: JSON.stringify(riddlePrefillConfig),
          }),
          react_1.default.createElement(
            antd_1.Tooltip,
            { title: t('在 Riddle 中打开') },
            react_1.default.createElement('input', {
              type: 'submit',
              value: 'Create New Riddle with Prefilled Data',
              className: Toolbar_module_less_1.default.riddle,
            }),
          ),
        )
      : null,
    react_1.default.createElement(
      antd_1.Tooltip,
      { title: t('在 StackBlitz 中打开') },
      react_1.default.createElement(icons_1.ThunderboltOutlined, {
        className: Toolbar_module_less_1.default.stackblitz,
        onClick: () => {
          sdk_1.default.openProject(stackblitzPrefillConfig);
        },
      }),
    ),
    react_1.default.createElement(
      antd_1.Tooltip,
      { title: t('在 CodeSandbox 中打开') },
      react_1.default.createElement(
        'form',
        {
          action: 'https://codesandbox.io/api/v1/sandboxes/define',
          method: 'POST',
          target: '_blank',
        },
        react_1.default.createElement('input', {
          type: 'hidden',
          name: 'parameters',
          value: define_1.getParameters(codeSandboxConfig),
        }),
        react_1.default.createElement(
          'button',
          {
            type: 'submit',
            className: Toolbar_module_less_1.default.codesandbox,
          },
          react_1.default.createElement(icons_1.CodeSandboxOutlined, {
            style: { marginLeft: 8 },
          }),
        ),
      ),
    ),
    react_1.default.createElement(Paragraph, {
      copyable: { text: sourceCode },
      style: { marginLeft: 6 },
    }),
    playground.htmlCodeTemplate &&
      react_1.default.createElement(
        react_1.default.Fragment,
        null,
        react_1.default.createElement(
          antd_1.Tooltip,
          { title: t('HTML 代码') },
          react_1.default.createElement(icons_1.Html5Outlined, {
            className: Toolbar_module_less_1.default.html,
            onClick: () => updateHtmlModalVisible(true),
          }),
        ),
        react_1.default.createElement(
          antd_1.Modal,
          {
            visible: htmlModalVisible,
            title: t('HTML 代码'),
            onCancel: () => updateHtmlModalVisible(false),
            width: '60vw',
            footer: react_1.default.createElement(
              antd_1.Button,
              { onClick: () => updateHtmlModalVisible(false) },
              t('取消'),
            ),
          },
          react_1.default.createElement(
            'div',
            { className: Toolbar_module_less_1.default.editor },
            react_1.default.createElement(
              react_1.Suspense,
              {
                fallback: react_1.default.createElement(
                  PageLoading_1.default,
                  null,
                ),
              },
              react_1.default.createElement(MonacoEditor, {
                height: '600px',
                language: 'html',
                value: getHtmlCodeTemplate(),
                options: {
                  readOnly: true,
                  automaticLayout: true,
                  minimap: {
                    enabled: false,
                  },
                  scrollBeyondLastLine: false,
                },
              }),
            ),
          ),
        ),
      ),
    onToggleFullscreen
      ? react_1.default.createElement(
          antd_1.Tooltip,
          { title: isFullScreen ? t('离开全屏') : t('进入全屏') },
          isFullScreen
            ? react_1.default.createElement(icons_1.FullscreenExitOutlined, {
                onClick: onToggleFullscreen,
                style: { marginLeft: 12 },
              })
            : react_1.default.createElement(icons_1.FullscreenOutlined, {
                onClick: onToggleFullscreen,
                style: { marginLeft: 12 },
              }),
        )
      : null,
    react_1.default.createElement(
      antd_1.Tooltip,
      { title: t('执行代码') },
      react_1.default.createElement(icons_1.PlayCircleOutlined, {
        onClick: onExecuteCode,
        style: { marginLeft: 12 },
      }),
    ),
  );
};
exports.default = Toolbar;
