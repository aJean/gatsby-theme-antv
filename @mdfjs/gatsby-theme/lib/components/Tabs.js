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
const classnames_1 = __importDefault(require("classnames"));
const antd_1 = require("antd");
const react_i18next_1 = require("react-i18next");
const icons_1 = __importStar(require("@ant-design/icons"));
const collapse_all_svg_1 = __importDefault(require("../images/collapse-all.svg"));
const Tabs_module_less_1 = __importDefault(require("./Tabs.module.less"));
const Tabs = ({ active, title, updateActive, updateOutsideActiveKeys, updateInsideActiveKeys, updateSearchQuery, updateCollapseData, codeQuery, content, showAPISearch, }) => {
    const [options, updateOptions] = react_1.useState([]);
    const [input, updateInput] = react_1.useState('');
    const [isEmpty, updateIsEmpty] = react_1.useState(null);
    const [list, updateList] = react_1.useState({});
    const getOptionList = (nodes, result, level, parent) => {
        nodes.forEach((node, index) => {
            if (node.title) {
                const key = parent
                    ? `${parent}:${level}-${node.title}`
                    : `${level}-${node.title}-${index}`;
                if (!result[node.title]) {
                    // eslint-disable-next-line no-param-reassign
                    result[node.title] = [key];
                }
                else {
                    result[node.title].push(key);
                }
                if (node.children)
                    getOptionList(node.children, result, 'inside', key);
            }
        });
        return result;
    };
    const showSearchResult = (keys, query) => {
        const outside = [];
        const inside = [];
        const showIndex = [];
        keys.forEach((key) => {
            const temp = key.split(':');
            if (temp[0]) {
                outside.push(temp[0]);
                showIndex.push(temp[0].split('-')[1]);
            }
            if (temp[1])
                inside.push(temp[1]);
        });
        if (outside.length > 0)
            updateOutsideActiveKeys(outside);
        if (inside.length > 0)
            updateInsideActiveKeys(inside);
        if (showIndex.length > 0 && content) {
            const key = query || showIndex[0];
            content.forEach((node) => {
                const element = node;
                const ast = JSON.stringify(element);
                const reg = new RegExp(key, 'gi');
                if (reg.test(ast)) {
                    element.show = true;
                }
                else {
                    element.show = false;
                }
            });
            updateCollapseData(content);
        }
    };
    const searchOptions = () => {
        if (!list)
            return;
        return Object.entries(list).map((item, index) => {
            return {
                value: item[0],
                label: (react_1.default.createElement("div", { key: index, style: {
                        display: 'flex',
                        justifyContent: 'space-between',
                    } },
                    react_1.default.createElement("span", { className: Tabs_module_less_1.default.result }, item[0]),
                    react_1.default.createElement("span", { className: Tabs_module_less_1.default.resultNum }, item[1].length))),
            };
        });
    };
    const { t } = react_i18next_1.useTranslation();
    const hiddenTitleForDocsearch = (react_1.default.createElement("span", { className: Tabs_module_less_1.default.hidden },
        title,
        " - "));
    const empty = react_1.default.createElement(antd_1.Empty, { image: antd_1.Empty.PRESENTED_IMAGE_SIMPLE });
    const handleSearch = (value) => {
        updateInput(value);
        updateOptions(value ? searchOptions() : []);
    };
    const collaspseALL = () => {
        updateOutsideActiveKeys([]);
        updateInsideActiveKeys([]);
    };
    const onSelect = (value) => {
        collaspseALL();
        showSearchResult(list[value]);
        updateSearchQuery(value);
    };
    const getSearchResult = (nodes, query, result, level, parent) => {
        nodes.forEach((node, i) => {
            const key = parent
                ? `${parent}:${level}-${node.title}`
                : `${level}-${node.title}-${i}`;
            const ast = JSON.stringify(node);
            const reg = new RegExp(query, 'gi');
            if (reg.test(ast)) {
                result.push(key);
            }
            if (node.children)
                getSearchResult(node.children, query, result, 'inside', key);
        });
        return result;
    };
    const search = (value) => {
        if (!content)
            return;
        const pattern = new RegExp("[`~!@#$^&*=|{}';',\\[\\]<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、?]");
        let query = '';
        for (let i = 0; i < value.length; i += 1) {
            query += value.substr(i, 1).replace(pattern, '');
        }
        const keys = [];
        if (query) {
            updateSearchQuery(query);
            getSearchResult(content, query, keys, 'outside');
        }
        if (keys.length > 0) {
            collaspseALL();
            showSearchResult(keys, query);
        }
        else {
            collaspseALL();
            updateIsEmpty(empty);
        }
    };
    const onPressEnter = (e) => {
        const { value } = e.target;
        search(value);
    };
    const clearSearch = () => {
        if (!content)
            return;
        updateIsEmpty(null);
        updateSearchQuery('');
        content.forEach((node) => {
            const element = node;
            element.show = true;
        });
        updateCollapseData(content);
        updateOutsideActiveKeys([]);
        updateInsideActiveKeys([]);
    };
    react_1.useEffect(() => {
        if (content)
            updateList(getOptionList(content, list, 'outside'));
    }, [content]);
    react_1.useEffect(() => {
        if (codeQuery) {
            clearSearch();
            updateInput(codeQuery);
            search(codeQuery);
        }
    }, [codeQuery]);
    react_1.useEffect(() => {
        if (!input)
            clearSearch();
    }, [input]);
    return (react_1.default.createElement("div", { className: Tabs_module_less_1.default.tabsBar },
        react_1.default.createElement("ul", { className: Tabs_module_less_1.default.tabs },
            react_1.default.createElement("li", { className: classnames_1.default({
                    [Tabs_module_less_1.default.active]: active === 'API',
                }) },
                react_1.default.createElement("div", { onClick: () => updateActive('API') },
                    hiddenTitleForDocsearch,
                    "API")),
            react_1.default.createElement("li", { className: classnames_1.default({
                    [Tabs_module_less_1.default.active]: active === 'design',
                }) },
                react_1.default.createElement("div", { onClick: () => updateActive('design') },
                    hiddenTitleForDocsearch,
                    t('设计指引')))),
        active === 'API' && showAPISearch && (react_1.default.createElement("div", { className: Tabs_module_less_1.default.tabExtra },
            react_1.default.createElement("div", { className: Tabs_module_less_1.default.tabSearch },
                react_1.default.createElement(antd_1.AutoComplete, { className: Tabs_module_less_1.default.autoComplete, options: options, value: input, onSelect: onSelect, allowClear: true, filterOption: true, backfill: true, dropdownMatchSelectWidth: false, onSearch: handleSearch, notFoundContent: isEmpty },
                    react_1.default.createElement(antd_1.Input, { size: "small", prefix: react_1.default.createElement(icons_1.SearchOutlined, null), className: Tabs_module_less_1.default.input, placeholder: t('搜索'), onPressEnter: onPressEnter }))),
            react_1.default.createElement("div", { className: Tabs_module_less_1.default.collapseAll, onClick: collaspseALL },
                react_1.default.createElement(icons_1.default, { component: collapse_all_svg_1.default }),
                t('收起所有'))))));
};
exports.default = Tabs;
