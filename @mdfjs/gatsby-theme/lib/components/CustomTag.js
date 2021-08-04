"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const antd_1 = require("antd");
const react_1 = __importDefault(require("react"));
const CustomTag = ({ color, text }) => {
    const colorValue = color;
    return react_1.default.createElement(antd_1.Tag, { color: colorValue },
        " ",
        text);
};
exports.default = CustomTag;
