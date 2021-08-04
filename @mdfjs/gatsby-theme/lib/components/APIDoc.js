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
const react_1 = __importStar(require("react"));
const antd_1 = require("antd");
const icons_1 = __importDefault(require("@ant-design/icons"));
const mark_js_1 = __importDefault(require("mark.js"));
const react_i18next_1 = require("react-i18next");
const Tabs_1 = __importDefault(require("./Tabs"));
const empty_svg_1 = __importDefault(require("../images/empty.svg"));
const APIDoc_module_less_1 = __importDefault(require("./APIDoc.module.less"));
const markdown_module_less_1 = __importDefault(require("../templates/markdown.module.less"));
const { Panel } = antd_1.Collapse;
const APIDoc = ({ markdownRemark, exampleSections, codeQuery, description, showAPISearch, }) => {
    var _a, _b, _c, _d;
    const { t } = react_i18next_1.useTranslation();
    const [collapseData, updateCollapseData] = react_1.useState([]);
    const [searchQuery, updateSearchQuery] = react_1.useState('');
    const { frontmatter } = markdownRemark;
    const [outsideActiveKeys, updateOutsideActiveKeys] = react_1.useState([]);
    const [insideActiveKeys, updateInsideActiveKeys] = react_1.useState([]);
    const [active, updateActive] = react_1.useState('API');
    const outsideHandleChange = (activeKey) => {
        updateOutsideActiveKeys(activeKey);
    };
    const insideHandleChange = (activeKey) => {
        updateInsideActiveKeys(activeKey);
    };
    const createApiStructure = (html) => {
        const div = document.createElement('div');
        div.innerHTML = html;
        let nodes = div.childNodes;
        if (nodes.length === 1 && nodes[0].nodeName === 'DIV') {
            // 当md中出现注释，会在最外层包一层div
            nodes = nodes[0].childNodes;
        }
        const result = [];
        let htmlList = [];
        let item = null;
        let depth = 0;
        let firstDepth = 0;
        const getHeading = (node) => {
            if (/[hH]\d/.test(node.nodeName)) {
                return {
                    depth: +node.nodeName.slice(1),
                    name: node.innerText,
                };
            }
            return null;
        };
        const isExpandable = (level) => {
            if (firstDepth === 0) {
                // 第一个标题能展开
                return true;
            }
            // 最多展开2级
            return level < firstDepth + 2;
        };
        const getDescription = (node) => {
            const childs = node.childNodes;
            if (childs.length > 0 && childs[0]) {
                const first = childs[0];
                if (first.nodeName === 'DESCRIPTION') {
                    const res = {};
                    first.childNodes.forEach((c) => {
                        const text = c.innerText;
                        if (c.nodeName === 'STRONG') {
                            res.require = text;
                        }
                        else if (c.nodeName === 'EM') {
                            if (text !== 'default:') {
                                res.type = text;
                            }
                        }
                        else if (c.nodeName === 'CODE') {
                            res.default = text;
                        }
                    });
                    return res;
                }
            }
            return null;
        };
        const recordResult = (node, level) => {
            if (level === firstDepth) {
                result.push(node);
            }
            if (level === firstDepth + 1 && result.length) {
                result[result.length - 1].children.push(node);
            }
        };
        for (let i = 0, len = nodes.length; i < len; i += 1) {
            const heading = getHeading(nodes[i]);
            if (heading && isExpandable(heading.depth)) {
                item = {
                    title: heading.name,
                    options: {},
                    children: [],
                    content: '',
                };
                depth = heading.depth;
                firstDepth = firstDepth || depth;
                htmlList = [];
            }
            else {
                htmlList.push(nodes[i].outerHTML);
                const des = getDescription(nodes[i]);
                if (item && des) {
                    item.options = des;
                }
            }
            const isLast = i === len - 1;
            let isBoundary = false;
            if (!isLast) {
                const nextHeading = getHeading(nodes[i + 1]);
                isBoundary = !!nextHeading && isExpandable(nextHeading.depth);
            }
            if (item && (isLast || isBoundary)) {
                item.content = htmlList.length > 0 ? htmlList.join('') : '';
                recordResult(item, depth);
            }
        }
        return result;
    };
    react_1.useEffect(() => {
        var _a, _b, _c;
        if (!(exampleSections === null || exampleSections === void 0 ? void 0 : exampleSections.API)) {
            updateActive('design');
            return;
        }
        const initData = createApiStructure((_b = (_a = exampleSections === null || exampleSections === void 0 ? void 0 : exampleSections.API) === null || _a === void 0 ? void 0 : _a.node) === null || _b === void 0 ? void 0 : _b.html);
        initData.forEach((node) => {
            const element = node;
            if (element.title) {
                element.show = true;
            }
        });
        const defaultKey = (_c = initData[0]) === null || _c === void 0 ? void 0 : _c.title;
        if (defaultKey)
            updateOutsideActiveKeys([`outside-${defaultKey}-0`]);
        updateCollapseData(initData);
        if (initData.length <= 0) {
            updateActive('design');
        }
    }, [exampleSections]);
    react_1.useEffect(() => {
        if (!collapseData)
            return;
        const context = document.getElementById('apiStructure');
        if (context) {
            const instance = new mark_js_1.default(context);
            if (searchQuery) {
                const reg = new RegExp(searchQuery, 'gi');
                instance.markRegExp(reg);
            }
            else {
                instance.unmark();
            }
        }
    }, [searchQuery]);
    const genExtra = (options) => (react_1.default.createElement(react_1.default.Fragment, null,
        (options === null || options === void 0 ? void 0 : options.require) && (react_1.default.createElement("span", { className: APIDoc_module_less_1.default.require }, options === null || options === void 0 ? void 0 : options.require)),
        (options === null || options === void 0 ? void 0 : options.type) && react_1.default.createElement("span", { className: APIDoc_module_less_1.default.type }, options === null || options === void 0 ? void 0 : options.type),
        (options === null || options === void 0 ? void 0 : options.default) && (react_1.default.createElement("span", { className: APIDoc_module_less_1.default.default }, options === null || options === void 0 ? void 0 : options.default))));
    const empty = (react_1.default.createElement("div", { className: APIDoc_module_less_1.default.emptyContainer },
        react_1.default.createElement("div", { className: APIDoc_module_less_1.default.empty },
            react_1.default.createElement(icons_1.default, { component: empty_svg_1.default }),
            react_1.default.createElement("div", null, t('正在施工中...')))));
    const renderCollapse = () => {
        return (react_1.default.createElement("div", { id: "apiStructure", className: markdown_module_less_1.default.markdown },
            react_1.default.createElement(antd_1.Collapse, { className: APIDoc_module_less_1.default.rootCollapse, activeKey: outsideActiveKeys, onChange: outsideHandleChange }, collapseData.map((data, i) => {
                var _a;
                return (react_1.default.createElement(Panel, { key: `outside-${data.title}-${i}`, header: data.title, className: data.show ? APIDoc_module_less_1.default.rootItem : APIDoc_module_less_1.default.hidden },
                    data.content && (react_1.default.createElement("div", { 
                        /* eslint-disable-next-line react/no-danger */
                        dangerouslySetInnerHTML: {
                            __html: data.content,
                        } })), (_a = data === null || data === void 0 ? void 0 : data.children) === null || _a === void 0 ? void 0 :
                    _a.map((child, index) => (react_1.default.createElement(antd_1.Collapse, { bordered: false, activeKey: insideActiveKeys, onChange: insideHandleChange, key: `collapse-${child.title}-${index}` },
                        react_1.default.createElement(Panel, { header: child.title, key: `inside-${child.title}-${i}`, extra: genExtra(child.options) }, child.content && (react_1.default.createElement("div", { 
                            /* eslint-disable-next-line react/no-danger */
                            dangerouslySetInnerHTML: {
                                __html: child.content,
                            } }))))))));
            }))));
    };
    return (react_1.default.createElement("div", { className: APIDoc_module_less_1.default.docPane },
        react_1.default.createElement(Tabs_1.default, { title: frontmatter.title, active: active, updateActive: updateActive, updateOutsideActiveKeys: updateOutsideActiveKeys, updateInsideActiveKeys: updateInsideActiveKeys, updateSearchQuery: updateSearchQuery, updateCollapseData: updateCollapseData, content: collapseData, codeQuery: codeQuery, showAPISearch: showAPISearch }),
        !exampleSections ? (react_1.default.createElement(antd_1.Skeleton, { className: APIDoc_module_less_1.default.skeleton, paragraph: { rows: 16 } })) : (react_1.default.createElement("div", { className: APIDoc_module_less_1.default.docContent },
            active === 'API' && collapseData.length > 0 && renderCollapse(),
            collapseData.length <= 0 && active === 'API' && empty,
            active === 'design' ? (react_1.default.createElement("div", { className: APIDoc_module_less_1.default.designContent },
                react_1.default.createElement("div", { 
                    /* eslint-disable-next-line react/no-danger */
                    dangerouslySetInnerHTML: {
                        __html: description,
                    } }),
                react_1.default.createElement("div", { 
                    /* eslint-disable-next-line react/no-danger */
                    dangerouslySetInnerHTML: {
                        __html: (_b = (_a = exampleSections === null || exampleSections === void 0 ? void 0 : exampleSections.design) === null || _a === void 0 ? void 0 : _a.node) === null || _b === void 0 ? void 0 : _b.html,
                    } }),
                !((_d = (_c = exampleSections === null || exampleSections === void 0 ? void 0 : exampleSections.design) === null || _c === void 0 ? void 0 : _c.node) === null || _d === void 0 ? void 0 : _d.html) && !description && empty,
                ' ')) : null))));
};
exports.default = APIDoc;
