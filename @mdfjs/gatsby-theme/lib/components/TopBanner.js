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
const lodash_es_1 = require("lodash-es");
const react_i18next_1 = require("react-i18next");
const TopBanner_module_less_1 = __importDefault(require("./TopBanner.module.less"));
const Announcement_1 = __importDefault(require("./Announcement"));
const BANNER_LOCALSTORAGE_KEY = 'antv_local_banner';
/**
 * @description 顶部公告，用于展示一些更新信息：比如 API 文档更新、版本发布、生态丰富等
 */
const TopBanner = ({ announcement }) => {
    const { i18n } = react_i18next_1.useTranslation();
    /** 公告 id */
    const bannerId = react_1.useMemo(() => {
        return announcement ? announcement.en : '';
    }, [announcement]);
    const content = lodash_es_1.get(announcement, i18n.language);
    return content ? (react_1.default.createElement(Announcement_1.default, { message: react_1.default.createElement("span", { className: TopBanner_module_less_1.default.topBannerAnnouncements }, content), bannerId: bannerId, localStorageId: BANNER_LOCALSTORAGE_KEY, style: { borderRadius: 0, borderWidth: '1px 0' } })) : null;
};
exports.default = TopBanner;
