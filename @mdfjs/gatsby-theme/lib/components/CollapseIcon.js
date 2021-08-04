"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const icons_1 = __importDefault(require("@ant-design/icons"));
const collapse_icon_svg_1 = __importDefault(require("../images/collapse-icon.svg"));
const CollapseIcon = (props) => (react_1.default.createElement(icons_1.default, { component: collapse_icon_svg_1.default, ...props }));
exports.default = CollapseIcon;
