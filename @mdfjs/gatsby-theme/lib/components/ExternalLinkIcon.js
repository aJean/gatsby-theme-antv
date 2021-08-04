"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const external_link_svg_1 = __importDefault(require("../images/external-link.svg"));
const ExternalLinkIcon_module_less_1 = __importDefault(require("./ExternalLinkIcon.module.less"));
const ExternalLinkIcon = () => (react_1.default.createElement("i", { className: ExternalLinkIcon_module_less_1.default.export },
    react_1.default.createElement(external_link_svg_1.default, null)));
exports.default = ExternalLinkIcon;
