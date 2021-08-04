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
const icons_1 = require("@ant-design/icons");
const react_i18next_1 = require("react-i18next");
const pallette_json_1 = __importDefault(require("../pallette.json"));
const ThemeSwitcher_module_less_1 = __importDefault(require("./ThemeSwitcher.module.less"));
const watermark_svg_1 = __importDefault(require("../images/watermark.svg"));
const htmlToImage = require('html-to-image');
const Colors = ({ colorStyle = {}, colors = [] }) => {
    if (colors.length === 0) {
        return null;
    }
    return (react_1.default.createElement("div", { className: ThemeSwitcher_module_less_1.default.colors }, colors.map((color, i) => (react_1.default.createElement("div", { className: ThemeSwitcher_module_less_1.default.color, style: {
            ...colorStyle,
            backgroundColor: color,
            color,
        }, key: i })))));
};
const ThemeSwitcher = ({ updateTheme }) => {
    var _a;
    const { t, i18n } = react_i18next_1.useTranslation();
    const defaultColorArr = (_a = pallette_json_1.default.categorical[0].colors20) === null || _a === void 0 ? void 0 : _a.slice(0, 3);
    const [curColor, updateCurColor] = react_1.useState(defaultColorArr);
    const [curPalette, updateCurPalette] = react_1.useState();
    const copyToClipboard = (arr) => {
        const el = document.createElement('textarea');
        el.value = arr;
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
    };
    const download = () => {
        const palette = document.getElementById('palette');
        if (!palette)
            return;
        htmlToImage.toPng(palette).then((dataUrl) => {
            const link = document.createElement('a');
            link.download = 'antv-palette.png';
            link.href = dataUrl;
            link.click();
        });
    };
    react_1.useEffect(() => {
        if (curPalette)
            download();
    }, [curPalette]);
    const menu = (react_1.default.createElement(antd_1.Menu, { className: ThemeSwitcher_module_less_1.default.operateBtns },
        react_1.default.createElement(antd_1.Menu.ItemGroup, { title: t('分类色板') }, pallette_json_1.default.categorical.map((color, key) => {
            return (react_1.default.createElement(antd_1.Menu.Item, { key: key },
                react_1.default.createElement("div", { className: ThemeSwitcher_module_less_1.default.panelContainer, onClick: () => {
                        updateCurColor(color.colors20.slice(0, 3));
                        const themeColors = {
                            colors10: color.colors10,
                            colors20: color.colors20,
                        };
                        updateTheme(JSON.stringify(themeColors));
                    } },
                    react_1.default.createElement(Colors, { colorStyle: {
                            maxWidth: `${100 / color.colors20.length}%`,
                            height: '24px',
                        }, colors: color.colors20 })),
                react_1.default.createElement(antd_1.Space, { className: ThemeSwitcher_module_less_1.default.btnGroup },
                    react_1.default.createElement(icons_1.VerticalAlignBottomOutlined, { onClick: () => updateCurPalette(color.colors20) }),
                    react_1.default.createElement(icons_1.CopyOutlined, { onClick: () => {
                            copyToClipboard(JSON.stringify(color));
                            antd_1.message.success('Copied!');
                        } }))));
        })),
        react_1.default.createElement(antd_1.Menu.ItemGroup, { title: t('顺序色板') }, pallette_json_1.default.continuous.map((color, key) => {
            return (react_1.default.createElement(antd_1.Menu.Item, { key: key },
                react_1.default.createElement("div", { className: ThemeSwitcher_module_less_1.default.panelContainer, onClick: () => {
                        updateCurColor(color.colors20.slice(0, 3));
                        updateTheme(JSON.stringify(color));
                    } },
                    react_1.default.createElement(Colors, { colorStyle: {
                            maxWidth: `${100 / color.colors20.length}%`,
                            height: '24px',
                        }, colors: color.colors20 })),
                react_1.default.createElement(antd_1.Space, { className: ThemeSwitcher_module_less_1.default.btnGroup },
                    react_1.default.createElement(icons_1.VerticalAlignBottomOutlined, { onClick: () => updateCurPalette(color.colors20) }),
                    react_1.default.createElement(icons_1.CopyOutlined, { onClick: () => {
                            copyToClipboard(JSON.stringify(color, null, '\t'));
                            antd_1.message.success('Copied!');
                        } }))));
        })),
        react_1.default.createElement(antd_1.Menu.ItemGroup, { title: t('发散色板') }, pallette_json_1.default.discrete.map((color, key) => {
            return (react_1.default.createElement(antd_1.Menu.Item, { key: key },
                react_1.default.createElement("div", { className: ThemeSwitcher_module_less_1.default.panelContainer, onClick: () => {
                        updateCurColor(color.colors20.slice(0, 3));
                        updateTheme(JSON.stringify(color));
                    } },
                    react_1.default.createElement(Colors, { colorStyle: {
                            maxWidth: `${100 / color.colors20.length}%`,
                            height: '24px',
                        }, colors: color.colors20 })),
                react_1.default.createElement(antd_1.Space, { className: ThemeSwitcher_module_less_1.default.btnGroup },
                    react_1.default.createElement(icons_1.VerticalAlignBottomOutlined, { onClick: () => updateCurPalette(color.colors20) }),
                    react_1.default.createElement(icons_1.CopyOutlined, { onClick: () => {
                            copyToClipboard(JSON.stringify(color));
                            antd_1.message.success('Copied!');
                        } }))));
        })),
        react_1.default.createElement("a", { rel: "noreferrer", className: ThemeSwitcher_module_less_1.default.link, target: "_blank", href: `https://antv.vision/${i18n.language}/docs/specification/language/palette` }, t('查看更多色板用法'))));
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(antd_1.Dropdown, { overlay: menu },
            react_1.default.createElement("div", { className: ThemeSwitcher_module_less_1.default.dropGroup },
                react_1.default.createElement(antd_1.Button, { type: "link", className: ThemeSwitcher_module_less_1.default.switcher },
                    react_1.default.createElement("div", { className: ThemeSwitcher_module_less_1.default.themeBtn },
                        react_1.default.createElement(Colors, { colorStyle: {
                                width: `${100 / curColor.length}%`,
                                height: '100%',
                                display: 'inline-block',
                            }, colors: curColor }))),
                react_1.default.createElement(icons_1.CaretDownOutlined, { className: ThemeSwitcher_module_less_1.default.drop }))),
        curPalette && (react_1.default.createElement("div", { className: ThemeSwitcher_module_less_1.default.palette, id: "palette" },
            react_1.default.createElement(watermark_svg_1.default, null),
            react_1.default.createElement("div", { className: ThemeSwitcher_module_less_1.default.bg },
                react_1.default.createElement(Colors, { colorStyle: {
                        width: `${100 / curPalette.length}%`,
                        height: '100%',
                        display: 'inline-block',
                    }, colors: curPalette }))))));
};
exports.default = ThemeSwitcher;
