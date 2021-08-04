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
/* eslint no-underscore-dangle: 0 */
const react_1 = __importStar(require('react'));
// gatsby ssr not support Suspense&lazy https://github.com/gatsbyjs/gatsby/issues/11960
const component_1 = __importDefault(require('@loadable/component'));
const gatsby_1 = require('gatsby');
const react_use_1 = require('react-use');
const classnames_1 = __importDefault(require('classnames'));
const antd_1 = require('antd');
const lodash_es_1 = require('lodash-es');
const react_i18next_1 = require('react-i18next');
const standalone_1 = require('@babel/standalone');
const react_split_pane_1 = __importDefault(require('react-split-pane'));
const Toolbar_1 = __importStar(require('./Toolbar'));
const MdPlayGround_module_less_1 = __importDefault(
  require('./MdPlayGround.module.less'),
);
const MonacoEditor = component_1.default(() =>
  Promise.resolve().then(() => __importStar(require('react-monaco-editor'))),
);
const PlayGround = ({
  source,
  babeledSource,
  relativePath = '',
  playground = {},
  location,
  title = '',
  height,
  replaceId = 'container',
}) => {
  const { site } = gatsby_1.useStaticQuery(gatsby_1.graphql`
      query {
        site {
          siteMetadata {
            mdPlayground {
              splitPaneMainSize
            }
            playground {
              extraLib
            }
          }
        }
      }
    `);
  const { extraLib = '' } = site.siteMetadata.playground;
  const splitPaneSize = lodash_es_1.get(
    site.siteMetadata,
    ['mdPlayground', 'splitPaneMainSize'],
    '62%',
  );
  const { t, i18n } = react_i18next_1.useTranslation();
  const playgroundNode = react_1.useRef(null);
  const [error, setError] = react_1.useState();
  const [compiledCode, updateCompiledCode] = react_1.useState(babeledSource);
  const [currentSourceData, updateCurrentSourceData] = react_1.useState(null);
  const editroRef = react_1.useRef(null);
  const comment =
    i18n.language === 'zh'
      ? `// 我们用 insert-css 演示引入自定义样式
// 推荐将样式添加到自己的样式文件中
// 若拷贝官方代码，别忘了 npm install insert-css
insertCss(`
      : `// We use 'insert-css' to insert custom styles
// It is recommended to add the style to your own style sheet files
// If you want to copy the code directly, please remember to install the npm package 'insert-css
insertCss(`;
  const replaceInsertCss = (str) => {
    // 统一增加对 insert-css 的使用注释
    return str.replace(/^insertCss\(/gm, comment);
  };
  const [currentSourceCode, updateCurrentSourceCode] = react_1.useState(
    replaceInsertCss(source),
  );
  if (typeof window !== 'undefined') {
    window.__reportErrorInPlayGround = (e) => {
      console.error(e); // eslint-disable-line no-console
      setError(e);
    };
  }
  const fullscreenNode = react_1.useRef(null);
  const [isFullScreen, updateIsFullScreen] = react_1.useState(false);
  const toggleFullscreen = () => {
    updateIsFullScreen(!isFullScreen);
    if (fullscreenNode.current) {
      if (!isFullScreen && !document.fullscreenElement) {
        fullscreenNode.current.requestFullscreen();
      } else if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };
  const execute = lodash_es_1.debounce((code, node, exampleContainer) => {
    const script = document.createElement('script');
    // replace container id in case of multi demos in document
    const newCode = code.replace(/'container'|"container"/, `'${replaceId}'`);
    script.innerHTML = `
        try {
          ${newCode}
        } catch(e) {
          if (window.__reportErrorInPlayGround) {
            window.__reportErrorInPlayGround(e);
          }
        }
      `;
    // eslint-disable-next-line no-param-reassign
    node.innerHTML = exampleContainer || `<div id=${replaceId} />`;
    node.appendChild(script);
  }, 300);
  const executeCode = () => {
    if (!compiledCode || !playgroundNode || !playgroundNode.current) {
      return;
    }
    execute(compiledCode, playgroundNode.current, playground.container);
  };
  react_1.useEffect(() => {
    executeCode();
  }, [compiledCode, error]);
  react_1.useEffect(() => {
    if (playground.playgroundDidMount) {
      // eslint-disable-next-line no-new-func
      new Function(playground.playgroundDidMount)();
    }
    return () => {
      if (playground.playgroundWillUnmount) {
        // eslint-disable-next-line no-new-func
        new Function(playground.playgroundWillUnmount)();
      }
    };
  }, []);
  const [editorTabs, updateEditorTabs] = react_1.useState([]);
  const [currentEditorTab, updateCurrentEditorTab] = react_1.useState(
    Toolbar_1.EDITOR_TABS.JAVASCRIPT,
  );
  react_1.useEffect(() => {
    const dataFileMatch = currentSourceCode.match(/fetch\('(.*)'\)/);
    if (dataFileMatch && dataFileMatch.length > 0) {
      fetch(dataFileMatch[1])
        .then((response) => response.json())
        .then((data) => {
          updateEditorTabs([
            Toolbar_1.EDITOR_TABS.JAVASCRIPT,
            Toolbar_1.EDITOR_TABS.DATA,
          ]);
          updateCurrentSourceData(data);
        });
    }
  }, []);
  const onCodeChange = (value) => {
    if (currentEditorTab === Toolbar_1.EDITOR_TABS.JAVASCRIPT) {
      updateCurrentSourceCode(value);
      try {
        const { code } = standalone_1.transform(value, {
          filename: relativePath,
          presets: ['react', 'typescript', 'es2015', 'stage-3'],
          plugins: ['transform-modules-umd'],
        });
        updateCompiledCode(code);
      } catch (e) {
        console.error(e); // eslint-disable-line no-console
        setError(e);
        return;
      }
      setError(null);
    }
  };
  react_1.useEffect(() => {
    if (editroRef.current) {
      if (currentEditorTab === Toolbar_1.EDITOR_TABS.JAVASCRIPT) {
        editroRef.current.setValue(currentSourceCode);
      } else if (currentEditorTab === Toolbar_1.EDITOR_TABS.DATA) {
        editroRef.current.setValue(JSON.stringify(currentSourceData, null, 2));
      }
    }
  }, [currentEditorTab]);
  const editor = react_1.default.createElement(MonacoEditor, {
    language:
      currentEditorTab === Toolbar_1.EDITOR_TABS.JAVASCRIPT
        ? 'javascript'
        : 'json',
    value: currentSourceCode,
    options: {
      readOnly: currentEditorTab === Toolbar_1.EDITOR_TABS.DATA,
      automaticLayout: true,
      minimap: {
        enabled: false,
      },
      scrollBeyondLastLine: false,
      fixedOverflowWidgets: true,
      lineNumbersMinChars: 4,
      showFoldingControls: 'always',
      foldingHighlight: true,
    },
    onChange: (value) => onCodeChange(value),
    editorWillMount: (monaco) => {
      monaco.editor.defineTheme('customTheme', {
        base: 'vs',
        inherit: true,
        rules: [],
        colors: {
          'editor.inactiveSelectionBackground': '#ffffff',
        },
      });
      monaco.editor.setTheme('customTheme');
      monaco.languages.typescript.javascriptDefaults.addExtraLib(extraLib, '');
    },
    editorDidMount: (editorInstance) => {
      editroRef.current = editorInstance.getModel();
    },
  });
  const fileExtension =
    relativePath.split('.')[relativePath.split('.').length - 1] || 'js';
  const isWide = react_use_1.useMedia('(min-width: 767.99px)', true);
  const dispatchResizeEvent = () => {
    const e = new Event('resize');
    window.dispatchEvent(e);
  };
  return react_1.default.createElement(
    'div',
    {
      className: MdPlayGround_module_less_1.default.playground,
      ref: fullscreenNode,
      style: height ? { height } : {},
    },
    react_1.default.createElement(
      react_split_pane_1.default,
      {
        split: isWide ? 'vertical' : 'horizontal',
        defaultSize: splitPaneSize,
        minSize: 100,
        onDragFinished: dispatchResizeEvent,
      },
      react_1.default.createElement(
        'div',
        {
          className: classnames_1.default(
            MdPlayGround_module_less_1.default.preview,
            `playground-${relativePath.split('/').join('-')}`,
          ),
        },
        error
          ? react_1.default.createElement(antd_1.Result, {
              status: 'error',
              title: t('演示代码报错，请检查'),
              subTitle: react_1.default.createElement(
                'pre',
                null,
                error && error.message,
              ),
            })
          : react_1.default.createElement('div', {
              ref: playgroundNode,
              className:
                MdPlayGround_module_less_1.default.exampleContainerWrapper,
            }),
      ),
      react_1.default.createElement(
        'div',
        { className: MdPlayGround_module_less_1.default.editor },
        react_1.default.createElement(Toolbar_1.default, {
          fileExtension: fileExtension,
          sourceCode: currentSourceCode,
          playground: playground,
          location: location,
          title: title,
          onExecuteCode: executeCode,
          editorTabs: editorTabs,
          currentEditorTab: currentEditorTab,
          onEditorTabChange: updateCurrentEditorTab,
          isFullScreen: false,
          onToggleFullscreen: toggleFullscreen,
        }),
        react_1.default.createElement(
          'div',
          {
            className: MdPlayGround_module_less_1.default.monaco,
            // toolbar height = 36px
            style: { height: 'calc(100% - 36px)' },
          },
          editor,
        ),
      ),
    ),
  );
};
const MdPlayGround = ({ examples, path, rid, height = 400 }) => {
  if (!examples || !examples.length || !path) return null;
  const example = examples.find((item) => item.relativePath === path);
  if (!example) return null;
  return react_1.default.createElement(PlayGround, {
    source: example.source,
    babeledSource: example.babeledSource,
    playground: example.playground,
    height: height,
    replaceId: rid,
  });
};
class ErrorHandlerMdPlayGround extends react_1.default.Component {
  constructor() {
    super(...arguments);
    this.state = {
      error: undefined,
    };
  }
  static getDerivedStateFromError(error) {
    // 更新 state 使下一次渲染能够显示降级后的 UI
    return { error };
  }
  render() {
    const { t } = this.props;
    const { error } = this.state;
    if (error) {
      // 你可以自定义降级后的 UI 并渲染
      return react_1.default.createElement(antd_1.Result, {
        status: 'error',
        title: t('演示代码报错，请检查'),
        subTitle: react_1.default.createElement(
          'pre',
          null,
          error && error.message,
        ),
      });
    }
    return react_1.default.createElement(MdPlayGround, { ...this.props });
  }
}
exports.default = react_i18next_1.withTranslation()(ErrorHandlerMdPlayGround);
