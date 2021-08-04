"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const antd_1 = require("antd");
const react_i18next_1 = require("react-i18next");
const icons_1 = require("@ant-design/icons");
const ChartViewSwitcher_module_less_1 = __importDefault(require("./ChartViewSwitcher.module.less"));
const ChartViewSwitcher = ({ updateView, view }) => {
    const { t } = react_i18next_1.useTranslation();
    const onChange = (e) => {
        updateView(e.target.value);
        const resize = new Event('resize');
        window.dispatchEvent(resize);
    };
    return (react_1.default.createElement(antd_1.Radio.Group, { className: ChartViewSwitcher_module_less_1.default.btnBar, value: view, buttonStyle: "solid", onChange: onChange },
        react_1.default.createElement(antd_1.Tooltip, { title: t('切换至电脑视图') },
            react_1.default.createElement(antd_1.Radio.Button, { value: "desktop" },
                react_1.default.createElement(icons_1.DesktopOutlined, null))),
        react_1.default.createElement(antd_1.Tooltip, { title: t('切换至平板视图') },
            react_1.default.createElement(antd_1.Radio.Button, { value: "tablet" },
                react_1.default.createElement(icons_1.TabletOutlined, null))),
        react_1.default.createElement(antd_1.Tooltip, { title: t('切换至移动端视图') },
            react_1.default.createElement(antd_1.Radio.Button, { value: "mobile" },
                react_1.default.createElement(icons_1.MobileOutlined, null)))));
};
exports.default = ChartViewSwitcher;
