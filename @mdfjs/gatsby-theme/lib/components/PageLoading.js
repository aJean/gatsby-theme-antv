'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const react_1 = __importDefault(require('react'));
const CodeLoading_1 = __importDefault(require('./CodeLoading'));
const PageLoading = () =>
  react_1.default.createElement(
    'div',
    { style: { height: '100vh' } },
    react_1.default.createElement(CodeLoading_1.default, null),
  );
exports.default = PageLoading;
