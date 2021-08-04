"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TowRowsIcon = exports.ThreeRowsIcon = exports.DefaultIcon = void 0;
const react_1 = __importDefault(require("react"));
const icons_1 = __importDefault(require("@ant-design/icons"));
const DefaultSvg = ({ style = {} }) => (react_1.default.createElement("svg", { style: { width: 14, height: 14, ...style }, viewBox: "0 0 16 16", version: "1.1" },
    react_1.default.createElement("g", { id: "v1.1", stroke: "none", strokeWidth: "1", fill: "none", fillRule: "evenodd" },
        react_1.default.createElement("g", { id: "icon_jingdian", fill: "#000000", fillRule: "nonzero" },
            react_1.default.createElement("g", { id: "\u7F16\u7EC4" },
                react_1.default.createElement("path", { d: "M14.6666667,0 C15.4030463,0 16,0.596953667 16,1.33333333 L16,14.6666667 C16,15.4030463 15.4030463,16 14.6666667,16 L1.33333333,16 C0.596953667,16 0,15.4030463 0,14.6666667 L0,1.33333333 C0,0.596953667 0.596953667,0 1.33333333,0 L14.6666667,0 Z M14.6666667,1.33333333 L1.33333333,1.33333333 L1.33333333,14.6666667 L14.6666667,14.6666667 L14.6666667,1.33333333 Z", id: "\u77E9\u5F62", fill: "currentColor" }),
                react_1.default.createElement("polygon", { id: "\u8DEF\u5F84", points: "8.66666667 1.21403219 8.66666667 15.36968 7.33333333 15.36968 7.33333333 1.21403219", fill: "currentColor" }),
                react_1.default.createElement("polygon", { id: "\u8DEF\u5F84-2", points: "8 7.62518943 8 8.95852276 0.804248302 8.95852276 0.804248302 7.62518943", fill: "currentColor" }))))));
const ThreeRowsSvg = ({ style = {} }) => (react_1.default.createElement("svg", { style: { width: 14, height: 14, ...style }, viewBox: "0 0 16 16", version: "1.1" },
    react_1.default.createElement("g", { id: "v1.1", stroke: "none", strokeWidth: "1", fill: "none", fillRule: "evenodd" },
        react_1.default.createElement("g", { id: "icon_sanlan", fill: "#000000", fillRule: "nonzero" },
            react_1.default.createElement("g", { id: "\u7F16\u7EC4\u5907\u4EFD" },
                react_1.default.createElement("path", { d: "M14.6666667,0 C15.4030463,0 16,0.596953667 16,1.33333333 L16,14.6666667 C16,15.4030463 15.4030463,16 14.6666667,16 L1.33333333,16 C0.596953667,16 0,15.4030463 0,14.6666667 L0,1.33333333 C0,0.596953667 0.596953667,0 1.33333333,0 L14.6666667,0 Z M14.6666667,1.33333333 L1.33333333,1.33333333 L1.33333333,14.6666667 L14.6666667,14.6666667 L14.6666667,1.33333333 Z", id: "\u77E9\u5F62", fill: "currentColor" }),
                react_1.default.createElement("polygon", { id: "\u8DEF\u5F84", points: "6 1.21403219 6 15.36968 4.66666667 15.36968 4.66666667 1.21403219", fill: "currentColor" }),
                react_1.default.createElement("polygon", { id: "\u8DEF\u5F84\u5907\u4EFD", points: "11.3333333 1.21403219 11.3333333 15.36968 10 15.36968 10 1.21403219", fill: "currentColor" }))))));
const TowRowsSvg = ({ style = {} }) => (react_1.default.createElement("svg", { style: { width: 14, height: 14, ...style }, viewBox: "0 0 16 16", version: "1.1" },
    react_1.default.createElement("title", null, "\u7F16\u7EC4\u5907\u4EFD 2"),
    react_1.default.createElement("g", { id: "v1.1", stroke: "none", strokeWidth: "1", fill: "none", fillRule: "evenodd" },
        react_1.default.createElement("g", { id: "icon_lianglan-", fill: "#000000", fillRule: "nonzero" },
            react_1.default.createElement("g", { id: "\u7F16\u7EC4\u5907\u4EFD-2" },
                react_1.default.createElement("path", { d: "M14.6666667,0 C15.4030463,0 16,0.596953667 16,1.33333333 L16,14.6666667 C16,15.4030463 15.4030463,16 14.6666667,16 L1.33333333,16 C0.596953667,16 0,15.4030463 0,14.6666667 L0,1.33333333 C0,0.596953667 0.596953667,0 1.33333333,0 L14.6666667,0 Z M14.6666667,1.33333333 L1.33333333,1.33333333 L1.33333333,14.6666667 L14.6666667,14.6666667 L14.6666667,1.33333333 Z", id: "\u77E9\u5F62", fill: "currentColor" }),
                react_1.default.createElement("polygon", { id: "\u8DEF\u5F84", points: "8.66666667 1.21403219 8.66666667 15.36968 7.33333333 15.36968 7.33333333 1.21403219", fill: "currentColor" }))))));
const DefaultIcon = () => react_1.default.createElement(icons_1.default, { component: DefaultSvg });
exports.DefaultIcon = DefaultIcon;
const ThreeRowsIcon = () => react_1.default.createElement(icons_1.default, { component: ThreeRowsSvg });
exports.ThreeRowsIcon = ThreeRowsIcon;
const TowRowsIcon = () => react_1.default.createElement(icons_1.default, { component: TowRowsSvg });
exports.TowRowsIcon = TowRowsIcon;
