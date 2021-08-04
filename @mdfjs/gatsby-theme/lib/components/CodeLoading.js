'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const react_1 = __importDefault(require('react'));
const CodeLoading = () =>
  react_1.default.createElement(
    'div',
    {
      style: {
        position: 'relative',
        height: '100%',
      },
    },
    react_1.default.createElement(
      'div',
      { className: 'code-loading' },
      react_1.default.createElement(
        'div',
        null,
        react_1.default.createElement(
          'div',
          { className: 'loader' },
          react_1.default.createElement(
            'svg',
            { viewBox: '0 0 80 80' },
            react_1.default.createElement(
              'defs',
              null,
              react_1.default.createElement(
                'linearGradient',
                {
                  id: 'gradient',
                  x1: '.004%',
                  x2: '100.131%',
                  y1: '49.993%',
                  y2: '49.993%',
                },
                react_1.default.createElement('stop', {
                  offset: '0%',
                  stopColor: '#6500FF',
                }),
                react_1.default.createElement('stop', {
                  offset: '16%',
                  stopColor: '#6A09FF',
                }),
                react_1.default.createElement('stop', {
                  offset: '43%',
                  stopColor: '#7623FF',
                }),
                react_1.default.createElement('stop', {
                  offset: '77%',
                  stopColor: '#8A4CFF',
                }),
                react_1.default.createElement('stop', {
                  offset: '99%',
                  stopColor: '#996BFF',
                }),
              ),
            ),
            react_1.default.createElement('circle', {
              id: 'test',
              cx: '40',
              cy: '40',
              r: '32',
              stroke: 'url(#gradient)',
            }),
          ),
        ),
        react_1.default.createElement(
          'div',
          { className: 'loader triangle' },
          react_1.default.createElement(
            'svg',
            { viewBox: '0 0 86 80' },
            react_1.default.createElement('polygon', {
              points: '43 8 79 72 7 72',
              stroke: 'url(#gradient)',
            }),
          ),
        ),
        react_1.default.createElement(
          'div',
          { className: 'loader' },
          react_1.default.createElement(
            'svg',
            { viewBox: '0 0 80 80' },
            react_1.default.createElement('rect', {
              x: '8',
              y: '8',
              width: '64',
              height: '64',
              stroke: 'url(#gradient)',
            }),
          ),
        ),
        react_1.default.createElement(
          'div',
          { className: 'loading-text' },
          react_1.default.createElement('p', null, 'Loading...'),
        ),
      ),
    ),
  );
exports.default = CodeLoading;
