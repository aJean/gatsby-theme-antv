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
const lodash_es_1 = require("lodash-es");
const icons_1 = require("@ant-design/icons");
const classnames_1 = __importDefault(require("classnames"));
const Announcement_module_less_1 = __importDefault(require("./Announcement.module.less"));
/**
 * @description 通用公告组件，根据 bannerId 来更新 lcoalStorage
 */
const Announcement = ({ message, bannerId, localStorageId, ...alertProps }) => {
    const isBrowser = typeof window !== 'undefined';
    /** 公告 id 更新，更新下本地缓存 */
    react_1.useEffect(() => {
        try {
            const item = (isBrowser && localStorage.getItem(localStorageId)) || '{}';
            if (lodash_es_1.get(JSON.parse(item), [bannerId]) !== false && isBrowser) {
                localStorage.setItem(localStorageId, JSON.stringify({ [bannerId]: true }));
            }
        }
        catch (e) {
            console.error(e); // eslint-disable-line no-console
        }
    }, [bannerId]);
    return lodash_es_1.get(JSON.parse((isBrowser && localStorage.getItem(localStorageId)) || '{}'), [bannerId]) ? (react_1.default.createElement(antd_1.Alert, { message: message, type: "info", showIcon: true, icon: react_1.default.createElement(icons_1.NotificationFilled, { style: { height: '16px', color: '#4776E8' } }), closable: true, className: classnames_1.default('banner-announcement', Announcement_module_less_1.default.bannerAnnouncement), onClose: () => {
            // 关闭公告
            if (isBrowser) {
                localStorage.setItem(localStorageId, JSON.stringify({ [bannerId]: false }));
            }
        }, ...alertProps })) : null;
};
exports.default = Announcement;
