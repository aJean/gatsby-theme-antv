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
const react_i18next_1 = require("react-i18next");
const icons_1 = require("@ant-design/icons");
const Search_module_less_1 = __importDefault(require("./Search.module.less"));
function initDocSearch({ docsearch, lang, docsearchOptions, }) {
    const { apiKey = '194b1be7fb1254c787f4e036912af3eb', indexName = 'antv' } = docsearchOptions || {};
    docsearch({
        apiKey,
        indexName,
        inputSelector: `.${Search_module_less_1.default.input}`,
        algoliaOptions: { facetFilters: [`tags:${lang}`] },
        transformData(hits) {
            hits.forEach((hit) => {
                /* eslint-disable no-param-reassign */
                hit.url = hit.url.replace('g2.antv.vision', window.location.host);
                hit.url = hit.url.replace('g6.antv.vision', window.location.host);
                hit.url = hit.url.replace('f2.antv.vision', window.location.host);
                hit.url = hit.url.replace('l7.antv.vision', window.location.host);
                hit.url = hit.url.replace('x6.antv.vision', window.location.host);
                hit.url = hit.url.replace('g2plot.antv.vision', window.location.host);
                hit.url = hit.url.replace('graphin.antv.vision', window.location.host);
                hit.url = hit.url.replace('https:', window.location.protocol);
                hit.url = hit.url.replace('#gatsby-focus-wrapper', '');
                /* eslint-enable no-param-reassign */
            });
            return hits;
        },
        debug: false, // Set debug to true if you want to inspect the dropdown
    });
}
const Search = ({ docsearchOptions }) => {
    const { t, i18n } = react_i18next_1.useTranslation();
    react_1.useEffect(() => {
        if (typeof window !== 'undefined') {
            Promise.resolve().then(() => __importStar(require('docsearch.js'))).then(({ default: docsearch }) => {
                initDocSearch({
                    docsearch,
                    lang: i18n.language,
                    docsearchOptions,
                });
            });
        }
    }, []);
    return (react_1.default.createElement("label", { className: Search_module_less_1.default.search, htmlFor: "search" },
        react_1.default.createElement(icons_1.SearchOutlined, { className: Search_module_less_1.default.icon }),
        react_1.default.createElement("input", { className: Search_module_less_1.default.input, id: "search", placeholder: t('搜索…') })));
};
exports.default = Search;
