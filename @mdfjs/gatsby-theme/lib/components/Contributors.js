'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const react_1 = __importDefault(require('react'));
const lodash_es_1 = require('lodash-es');
const antd_1 = require('antd');
const react_i18next_1 = require('react-i18next');
const Contributors_module_less_1 = __importDefault(
  require('./Contributors.module.less'),
);
const Contributors = (props) => {
  const { contributors, style } = props;
  const { t } = react_i18next_1.useTranslation();
  const openGithub = (githubId) => {
    window.open(`https://github.com/${githubId}`);
  };
  return react_1.default.createElement(
    'div',
    {
      className: Contributors_module_less_1.default.docsContributors,
      style: style || {},
    },
    lodash_es_1.map(contributors, ({ author, avatar, github }) => {
      return react_1.default.createElement(
        antd_1.Tooltip,
        { title: `${t('贡献者')}: ${author}` },
        react_1.default.createElement(
          'span',
          { onClick: () => openGithub(github) },
          react_1.default.createElement(antd_1.Avatar, {
            size: 24,
            src: avatar,
          }),
        ),
      );
    }),
  );
};
exports.default = Contributors;
