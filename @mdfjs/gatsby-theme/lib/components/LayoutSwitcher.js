'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const react_1 = __importDefault(require('react'));
const antd_1 = require('antd');
const icons_1 = require('@ant-design/icons');
const react_i18next_1 = require('react-i18next');
const LayoutIcons_1 = require('./LayoutIcons');
const LayoutSwitcher_module_less_1 = __importDefault(
  require('./LayoutSwitcher.module.less'),
);
let icon;
const curLayout =
  typeof window !== 'undefined' ? localStorage.getItem('layout') : null;
switch (curLayout) {
  case 'viewTwoCols':
    icon = react_1.default.createElement(LayoutIcons_1.TowRowsIcon, null);
    break;
  case 'viewThreeCols':
    icon = react_1.default.createElement(LayoutIcons_1.ThreeRowsIcon, null);
    break;
  default:
    icon = react_1.default.createElement(LayoutIcons_1.DefaultIcon, null);
}
const LayoutSwitcher = ({ updateLayout }) => {
  const { t } = react_i18next_1.useTranslation();
  const menu = react_1.default.createElement(
    antd_1.Menu,
    { className: LayoutSwitcher_module_less_1.default.menu },
    react_1.default.createElement(
      antd_1.Menu.Item,
      {
        icon: react_1.default.createElement(LayoutIcons_1.DefaultIcon, null),
        onClick: () => {
          icon = react_1.default.createElement(LayoutIcons_1.DefaultIcon, null);
          updateLayout('viewDefault');
        },
      },
      t('经典布局'),
    ),
    react_1.default.createElement(
      antd_1.Menu.Item,
      {
        icon: react_1.default.createElement(LayoutIcons_1.TowRowsIcon, null),
        onClick: () => {
          icon = react_1.default.createElement(LayoutIcons_1.TowRowsIcon, null);
          updateLayout('viewTwoCols');
        },
      },
      t('两栏布局'),
    ),
    react_1.default.createElement(
      antd_1.Menu.Item,
      {
        icon: react_1.default.createElement(LayoutIcons_1.ThreeRowsIcon, null),
        onClick: () => {
          icon = react_1.default.createElement(
            LayoutIcons_1.ThreeRowsIcon,
            null,
          );
          updateLayout('viewThreeCols');
        },
      },
      t('三栏布局'),
    ),
  );
  return react_1.default.createElement(
    antd_1.Dropdown,
    { overlay: menu },
    react_1.default.createElement(
      'div',
      { className: LayoutSwitcher_module_less_1.default.dropGroup },
      react_1.default.createElement(antd_1.Button, {
        type: 'link',
        className: LayoutSwitcher_module_less_1.default.switch,
        icon: icon,
      }),
      react_1.default.createElement(icons_1.CaretDownOutlined, {
        className: LayoutSwitcher_module_less_1.default.drop,
      }),
    ),
  );
};
exports.default = LayoutSwitcher;
