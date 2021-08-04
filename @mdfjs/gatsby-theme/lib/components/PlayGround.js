"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint no-underscore-dangle: 0 */
const react_1 = __importStar(require("react"));
const gatsby_1 = require("gatsby");
const classnames_1 = __importDefault(require("classnames"));
const antd_1 = require("antd");
const react_use_1 = require("react-use");
const lodash_es_1 = require("lodash-es");
const icons_1 = require("@ant-design/icons");
const react_i18next_1 = require("react-i18next");
const react_split_pane_1 = __importDefault(require("react-split-pane"));
const standalone_1 = require("@babel/standalone");
const layoutConfig_1 = require("../layoutConfig");
const Toolbar_1 = __importStar(require("./Toolbar"));
const ChartViewSwitcher_1 = __importDefault(require("./ChartViewSwitcher"));
const LayoutSwitcher_1 = __importDefault(require("./LayoutSwitcher"));
const PlayGrounds_1 = __importDefault(require("./PlayGrounds"));
const ThemeSwitcher_1 = __importDefault(require("./ThemeSwitcher"));
const APIDoc_1 = __importDefault(require("./APIDoc"));
const PageLoading_1 = __importDefault(require("./PageLoading"));
const PlayGround_module_less_1 = __importDefault(require("./PlayGround.module.less"));
const document_1 = require("../templates/document");
const { Content, Sider } = antd_1.Layout;
const MonacoEditor = react_1.lazy(() => Promise.resolve().then(() => __importStar(require('react-monaco-editor'))));
const execute = lodash_es_1.debounce((code, node, exampleContainer) => {
    const script = document.createElement('script');
    script.innerHTML = `
      try {
        ${code}
      } catch(e) {
        if (window.__reportErrorInPlayGround) {
          window.__reportErrorInPlayGround(e);
        }
      }
    `;
    // eslint-disable-next-line no-param-reassign
    node.innerHTML = exampleContainer || '<div id="container" />';
    node.appendChild(script);
}, 300);
const PlayGround = ({ exampleSections, location, markdownRemark, allDemos, categories, treeData, examples, }) => {
    const { API, design, description } = exampleSections;
    const { site } = gatsby_1.useStaticQuery(gatsby_1.graphql `
      query {
        site {
          siteMetadata {
            showChartResize
            themeSwitcher
            showAPIDoc
            githubUrl
            playground {
              extraLib
              container
              playgroundDidMount
              playgroundWillUnmount
              dependencies
              devDependencies
              htmlCodeTemplate
            }
          }
        }
      }
    `);
    const { siteMetadata: { githubUrl, playground }, } = site;
    const { extraLib = '' } = site.siteMetadata.playground;
    const isBrowser = typeof window !== 'undefined';
    const localLayout = typeof window !== 'undefined' ? localStorage.getItem('layout') : null;
    const { showChartResize, showAPIDoc, themeSwitcher } = site.siteMetadata;
    const [layout, updateLayout] = react_1.useState(localLayout || 'viewDefault');
    const [codeQuery, updateCodeQuery] = react_1.useState('');
    const { i18n, t } = react_i18next_1.useTranslation();
    const [currentExample, updateCurrentExample] = react_1.useState();
    // 获取路由 用来获取 配置文档
    const [pathname, setPathname] = react_1.useState();
    const [editRef, updateEditRef] = react_1.useState();
    const playgroundNode = react_1.useRef(null);
    const [error, setError] = react_1.useState();
    const [collapsed, updateCollapsed] = react_1.useState(false);
    const [showAPISearch, updateShowAPIsearch] = react_1.useState(true);
    const [compiledCode, updateCompiledCode] = react_1.useState('');
    const [relativePath, updateRelativePath] = react_1.useState('');
    const [fileExtension, updateFileExtension] = react_1.useState('');
    const [title, updateTitle] = react_1.useState('');
    const [view, updateView] = react_1.useState('desktop');
    const [theme, updateTheme] = react_1.useState();
    const [docsEmpty, updateDocsEmpty] = react_1.useState(false);
    const [currentSourceCode, updateCurrentSourceCode] = react_1.useState('');
    const [currentSourceData, updateCurrentSourceData] = react_1.useState(null);
    const editroRef = react_1.useRef(null);
    const isWide = react_use_1.useMedia('(min-width: 767.99px)', true);
    react_1.useEffect(() => {
        if (isBrowser) {
            setPathname(window.location.pathname.replace('/examples', ''));
        }
    }, [isBrowser && window.location.pathname]);
    react_1.useEffect(() => {
        var _a, _b;
        if (!pathname)
            return;
        updateDocsEmpty(!((_a = design === null || design === void 0 ? void 0 : design.node) === null || _a === void 0 ? void 0 : _a.html) && !description && !((_b = API === null || API === void 0 ? void 0 : API.node) === null || _b === void 0 ? void 0 : _b.html));
    }, [pathname]);
    const comment = i18n.language === 'zh'
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
    if (typeof window !== 'undefined') {
        window.__reportErrorInPlayGround = (e) => {
            console.error(e); // eslint-disable-line no-console
            setError(e);
        };
    }
    const updateCurrentExampleParams = (current) => {
        if (!(current === null || current === void 0 ? void 0 : current.relativePath))
            return;
        updateRelativePath(current === null || current === void 0 ? void 0 : current.relativePath);
        updateFileExtension((current === null || current === void 0 ? void 0 : current.relativePath.split('.')[current.relativePath.split('.').length - 1]) || 'js');
        updateTitle(current === null || current === void 0 ? void 0 : current.title);
        updateCompiledCode(current.babeledSource);
        updateCurrentSourceCode(replaceInsertCss(current.source));
    };
    const setLayout = (ifWide, empty) => {
        if (!ifWide) {
            updateLayout('viewTwoRows');
            updateCollapsed(true);
        }
        else if (!showAPIDoc || empty) {
            updateLayout('viewTwoCols');
        }
        else {
            // 恢复至localStorage 选中
            updateLayout(localStorage.getItem('layout') || 'viewDefault');
        }
    };
    react_1.useEffect(() => {
        var _a;
        if (currentExample || !examples)
            return;
        let defaultExample = examples[0];
        for (let i = 0; i < examples.length; i += 1) {
            const item = examples[i];
            const dirname = `${location.pathname.split('/').slice(3).join('/')}`;
            const fullname = `${dirname}/demo/${(_a = location.hash) === null || _a === void 0 ? void 0 : _a.replace('#', '')}`;
            if (item.absolutePath.match(dirname)) {
                defaultExample = item;
            }
            if (!location.hash || item.relativePath.match(fullname)) {
                break;
            }
        }
        updateCurrentExample(defaultExample);
    }, [examples]);
    react_1.useEffect(() => {
        setLayout(isWide, docsEmpty);
    }, [isWide, docsEmpty]);
    react_1.useEffect(() => {
        if (!currentExample || !allDemos)
            return;
        updateView('desktop');
        updateCurrentExampleParams(currentExample);
    }, [currentExample, allDemos]);
    const executeCode = () => {
        if (!compiledCode || !playgroundNode || !playgroundNode.current) {
            return;
        }
        execute(compiledCode, playgroundNode.current, playground === null || playground === void 0 ? void 0 : playground.container);
    };
    react_1.useEffect(() => {
        executeCode();
    }, [compiledCode, error, view]);
    react_1.useEffect(() => {
        if (playground === null || playground === void 0 ? void 0 : playground.playgroundDidMount) {
            // eslint-disable-next-line no-new-func
            new Function(playground === null || playground === void 0 ? void 0 : playground.playgroundDidMount)();
        }
        return () => {
            if (playground === null || playground === void 0 ? void 0 : playground.playgroundWillUnmount) {
                // eslint-disable-next-line no-new-func
                new Function(playground === null || playground === void 0 ? void 0 : playground.playgroundWillUnmount)();
            }
        };
    }, []);
    const [editorTabs, updateEditroTabs] = react_1.useState([]);
    const [currentEditorTab, updateCurrentEditorTab] = react_1.useState(Toolbar_1.EDITOR_TABS.JAVASCRIPT);
    react_1.useEffect(() => {
        const dataFileMatch = currentSourceCode.match(/fetch\('(.*)'\)/);
        if (dataFileMatch && dataFileMatch.length > 0) {
            updateEditroTabs([Toolbar_1.EDITOR_TABS.JAVASCRIPT, Toolbar_1.EDITOR_TABS.DATA]);
            fetch(dataFileMatch[1])
                .then((response) => response.json())
                .then((data) => {
                updateCurrentSourceData(data);
            });
        }
    }, [currentSourceCode]);
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
            }
            catch (e) {
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
            }
            else if (currentEditorTab === Toolbar_1.EDITOR_TABS.DATA) {
                editroRef.current.setValue(JSON.stringify(currentSourceData, null, 2));
            }
        }
    }, [currentEditorTab]);
    const codeEditor = (react_1.default.createElement(MonacoEditor, { height: "calc(100% - 32px)", language: currentEditorTab === Toolbar_1.EDITOR_TABS.JAVASCRIPT ? 'javascript' : 'json', value: currentSourceCode, options: {
            readOnly: currentEditorTab === Toolbar_1.EDITOR_TABS.DATA,
            automaticLayout: true,
            minimap: {
                enabled: false,
            },
            scrollBeyondLastLine: false,
            fixedOverflowWidgets: true,
        }, onChange: (value) => onCodeChange(value), editorWillMount: (monaco) => {
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
        }, editorDidMount: (editor, monaco) => {
            updateEditRef(editor);
            editor.addAction({
                // An unique identifier of the contributed action.
                id: 'search-in-doc',
                // A label of the action that will be presented to the user.
                label: 'search in document',
                contextMenuGroupId: 'navigation',
                // An optional array of keybindings for the action.
                keybindings: [
                    // eslint-disable-next-line no-bitwise
                    monaco.KeyMod.CtrlCmd | monaco.KeyCode.F10,
                ],
                contextMenuOrder: 0,
                run: (ed) => {
                    const val = ed.getModel().getValueInRange(ed.getSelection());
                    updateCodeQuery(val);
                },
            });
            editroRef.current = editor.getModel();
        } }));
    const dispatchResizeEvent = () => {
        const e = new Event('resize');
        window.dispatchEvent(e);
    };
    const toggle = () => {
        updateCollapsed(!collapsed);
    };
    react_1.useEffect(() => {
        dispatchResizeEvent();
        if (isWide && showAPIDoc && !docsEmpty)
            localStorage.setItem('layout', layout);
        const pane = document.getElementsByClassName('ant-layout');
        if (!pane[1])
            return;
        if (layout === 'viewTwoRows') {
            pane[1].setAttribute('style', 'margin-top: 64px');
        }
        else {
            pane[1].setAttribute('style', 'margin-top: 0');
        }
    }, [layout, collapsed]);
    // 图例滚动到当前节点
    react_1.useEffect(() => {
        var _a;
        if (!currentExample || !(currentExample === null || currentExample === void 0 ? void 0 : currentExample.filename) || !layout) {
            return;
        }
        const id = `example-${(_a = currentExample === null || currentExample === void 0 ? void 0 : currentExample.filename) === null || _a === void 0 ? void 0 : _a.split('.')[0]}`;
        const cardNode = document.getElementById(id);
        if (cardNode) {
            cardNode.scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
            });
        }
    }, [currentExample, layout, playground]);
    const getThemeCode = (type, themeString) => {
        const colors = JSON.parse(themeString);
        let res;
        if (type === 'g2') {
            res = {
                styleSheet: {
                    brandColor: colors.colors10[0],
                    paletteQualitative10: colors.colors10,
                    paletteQualitative20: colors.colors20,
                },
            };
        }
        else {
            res = {
                theme: {
                    styleSheet: {
                        brandColor: colors.colors10[0],
                        paletteQualitative10: colors.colors10,
                        paletteQualitative20: colors.colors20,
                    },
                },
            };
        }
        return JSON.stringify(res);
    };
    react_1.useEffect(() => {
        if (!currentSourceCode || !theme || !themeSwitcher)
            return;
        let source = currentSourceCode;
        const render = source.match(/(\S*).render()/);
        if (render && (render === null || render === void 0 ? void 0 : render.length) > 0) {
            const chart = render[1];
            let themeCode;
            let reg;
            if (themeSwitcher === 'g2') {
                themeCode = `${chart}.theme(${getThemeCode('g2', theme)});`;
                reg = new RegExp(`( *)${chart}.theme(.*);*(\n*)`, 'g');
                if (source.match(reg))
                    source = source.replace(reg, '');
            }
            else if (themeSwitcher === 'g2plot') {
                themeCode = `${chart}.update(${getThemeCode('g2plot', theme)});`;
                reg = new RegExp(`( *)${chart}.update(.*);\n`, 'g');
                if (source.match(reg))
                    source = source.replace(reg, '');
            }
            const data = source.replace(`${chart}.render()`, `${themeCode}\n${chart}.render()`);
            onCodeChange(data);
            editRef.getAction('editor.action.formatDocument').run();
        }
    }, [theme]);
    // 根据pane框度及当前视图判断是否需要展示API文档搜索框
    const calcShowSearch = (size) => {
        const clientw = document.body.clientWidth;
        if (size / clientw > 0.668) {
            updateShowAPIsearch(false);
        }
        else {
            updateShowAPIsearch(true);
        }
    };
    // 提取出来获取 唯一value值的 方法
    const getPath = (item) => {
        var _a;
        const demoSlug = (_a = item.relativePath) === null || _a === void 0 ? void 0 : _a.replace(/\/demo\/(.*)\..*/, (_, filename) => {
            return `#${filename}`;
        });
        return `/${i18n.language}/examples/${demoSlug}`;
    };
    // 一级菜单，二级菜单 数据 treeData + 二级菜单，示例 数据 result 写成一个 一级，二级，示例的三层树结构 数据
    const transforNode = (data, result) => data.map((item) => {
        var _a;
        if (item.children && !item.node) {
            return { ...item, children: transforNode(item.children, result) };
        }
        const { frontmatter, fields } = item.node;
        return {
            ...frontmatter,
            value: `secondaryKey-${fields === null || fields === void 0 ? void 0 : fields.slug}`,
            children: (_a = result.find(({ title: k }) => k === frontmatter.title)) === null || _a === void 0 ? void 0 : _a.children,
        };
    });
    const getTreeData = () => {
        const result = [];
        categories.forEach((category) => {
            const root = {
                title: category,
                value: '',
                children: [],
            };
            allDemos[category].forEach((item, index) => {
                const path = getPath(item);
                if (index === 0) {
                    root.value = `root::${path}`;
                }
                const child = {
                    ...item,
                    title: typeof item.title === 'object'
                        ? item.title[i18n.language]
                        : item.title || (item === null || item === void 0 ? void 0 : item.filename),
                    value: path,
                };
                root.children.push(child);
            });
            result.push(root);
        });
        const newTreeData = [];
        // 扁平化 一级菜单中的数据， 示例有些并不是在第三层， 也有在第二层
        treeData.forEach((treeItem) => {
            var _a;
            const slugPieces = (_a = treeItem.value) === null || _a === void 0 ? void 0 : _a.split('/');
            if (!slugPieces)
                return;
            if (slugPieces.length <= 3) {
                newTreeData.push(...treeItem.children);
            }
            else {
                newTreeData.push(treeItem);
            }
        });
        return transforNode(newTreeData, result);
    };
    return playground && currentExample && layout ? (react_1.default.createElement(react_split_pane_1.default, { split: layoutConfig_1.splitPaneMap[layout].outside.split, size: layoutConfig_1.splitPaneMap[layout].outside.size, onDragFinished: dispatchResizeEvent, onChange: (size) => calcShowSearch(size) },
        react_1.default.createElement(react_split_pane_1.default, { split: layoutConfig_1.splitPaneMap[layout].inside.split, size: layoutConfig_1.splitPaneMap[layout].inside.size, onDragFinished: dispatchResizeEvent, className: PlayGround_module_less_1.default.playground, ref: (e) => {
                if (e === null || e === void 0 ? void 0 : e.splitPane) {
                    e.splitPane.scrollTop = 0; // 保证示例永远不会掉下去
                }
            } },
            react_1.default.createElement(antd_1.Layout, { className: PlayGround_module_less_1.default.playgroundCard },
                react_1.default.createElement(Sider, { collapsedWidth: 0, width: 188, trigger: null, collapsible: true, collapsed: collapsed, className: PlayGround_module_less_1.default.menuSider, theme: "light" },
                    react_1.default.createElement(PlayGrounds_1.default, { getPath: getPath, currentExample: currentExample, updateCurrentExample: updateCurrentExample, treeData: getTreeData() })),
                react_1.default.createElement(icons_1.LeftOutlined, { className: PlayGround_module_less_1.default.trigger, type: collapsed ? 'menu-unfold' : 'menu-fold', onClick: toggle, rotate: collapsed ? 180 : 0 }),
                relativePath ? (react_1.default.createElement(antd_1.Layout, null,
                    react_1.default.createElement(antd_1.PageHeader, { ghost: false, title: typeof currentExample.title === 'object'
                            ? currentExample.title[i18n.language]
                            : currentExample.title, subTitle: react_1.default.createElement(antd_1.Tooltip, { title: t('在 GitHub 上编辑') },
                            react_1.default.createElement("a", { href: document_1.getGithubSourceUrl({
                                    githubUrl,
                                    relativePath,
                                    prefix: 'examples',
                                }), target: "_blank", rel: "noopener noreferrer", className: PlayGround_module_less_1.default.editOnGtiHubButton },
                                react_1.default.createElement(icons_1.EditOutlined, null))), extra: react_1.default.createElement(antd_1.Space, { split: react_1.default.createElement(antd_1.Divider, { type: "vertical" }) },
                            showChartResize && layout === 'viewDefault' && (react_1.default.createElement(ChartViewSwitcher_1.default, { updateView: updateView, view: view })),
                            showAPIDoc && !docsEmpty && layout !== 'viewTwoRows' && (react_1.default.createElement(LayoutSwitcher_1.default, { updateLayout: updateLayout })),
                            themeSwitcher && (react_1.default.createElement(ThemeSwitcher_1.default, { updateTheme: updateTheme }))) }),
                    react_1.default.createElement(Content, { className: PlayGround_module_less_1.default.chartContainer },
                        react_1.default.createElement("div", { className: classnames_1.default(PlayGround_module_less_1.default.preview, `playground-${relativePath.split('/').join('-')}`) }, error ? (react_1.default.createElement(antd_1.Result, { status: "error", title: i18n.language === 'zh'
                                ? '演示代码报错，请检查'
                                : 'Demo code error, please check', subTitle: react_1.default.createElement("pre", null, error && error.message) })) : (react_1.default.createElement("div", { ref: playgroundNode, className: PlayGround_module_less_1.default[view] })))))) : (react_1.default.createElement(antd_1.Skeleton, { paragraph: { rows: 8 }, className: PlayGround_module_less_1.default.skeleton }))),
            react_1.default.createElement("div", { className: PlayGround_module_less_1.default.editor },
                title && fileExtension && (react_1.default.createElement(Toolbar_1.default, { fileExtension: fileExtension, sourceCode: currentSourceCode, playground: playground, location: location, title: title, onExecuteCode: executeCode, editorTabs: editorTabs, currentEditorTab: currentEditorTab, onEditorTabChange: updateCurrentEditorTab, onToggleFullscreen: null })),
                !relativePath ? (react_1.default.createElement(antd_1.Skeleton, { paragraph: { rows: 8 }, className: PlayGround_module_less_1.default.skeleton })) : (react_1.default.createElement("div", { className: PlayGround_module_less_1.default.monaco },
                    react_1.default.createElement(react_1.Suspense, { fallback: react_1.default.createElement(PageLoading_1.default, null) }, codeEditor))))),
        relativePath &&
            (layout === 'viewDefault' || layout === 'viewThreeCols') ? (react_1.default.createElement(APIDoc_1.default, { markdownRemark: markdownRemark, githubUrl: githubUrl, relativePath: relativePath, exampleSections: { ...exampleSections, design, API }, description: description || '', codeQuery: codeQuery, showAPISearch: showAPISearch })) : (react_1.default.createElement(react_1.default.Fragment, null)))) : (react_1.default.createElement(react_1.default.Fragment, null));
};
class ErrorHandlerPlayGround extends react_1.default.Component {
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
            return (react_1.default.createElement(antd_1.Result, { status: "error", title: t('演示代码报错，请检查'), subTitle: react_1.default.createElement("pre", null, error && error.message) }));
        }
        return react_1.default.createElement(PlayGround, { ...this.props });
    }
}
exports.default = react_i18next_1.withTranslation()(ErrorHandlerPlayGround);
