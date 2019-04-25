'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Menu = require('material-ui/Menu');

var _Menu2 = _interopRequireDefault(_Menu);

var _MenuItem = require('material-ui/MenuItem');

var _MenuItem2 = _interopRequireDefault(_MenuItem);

var _FontIcon = require('material-ui/FontIcon');

var _FontIcon2 = _interopRequireDefault(_FontIcon);

var _Popover = require('material-ui/Popover/Popover');

var _Popover2 = _interopRequireDefault(_Popover);

var _Paper = require('material-ui/Paper');

var _Paper2 = _interopRequireDefault(_Paper);

var _d2UiCore = require('@dhis2/d2-ui-core');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function TableContextMenu(props, context) {
    var actionList = (0, _keys2.default)(props.actions).filter(function (menuActionKey) {
        return typeof props.actions[menuActionKey] === 'function';
    });

    // Transition and left styles were added to prevent initial rendering in top-left
    // https://github.com/mui-org/material-ui/issues/8040
    var cmStyle = {
        position: 'fixed',
        left: -1000,
        transition: 'left 0s, top 0s'
    };

    var actions = props.actions,
        activeItem = props.activeItem,
        icons = props.icons,
        popoverProps = (0, _objectWithoutProperties3.default)(props, ['actions', 'activeItem', 'icons']);

    return _react2.default.createElement(
        _Popover2.default,
        (0, _extends3.default)({}, popoverProps, {
            open: Boolean(props.activeItem),
            anchorEl: props.target,
            anchorOrigin: { horizontal: 'middle', vertical: 'center' },
            animated: false,
            style: cmStyle,
            animation: _Paper2.default
        }),
        _react2.default.createElement(
            _Menu2.default,
            { className: 'd2-ui-table__context-menu', desktop: true },
            actionList.map(function (action) {
                var iconName = icons && icons[action] ? icons[action] : action;
                var onClick = function onClick() {
                    if (typeof props.onRequestClose === 'function') {
                        props.onRequestClose();
                    }
                    props.actions[action].apply(props.actions, [props.activeItem]);
                };

                return _react2.default.createElement(_MenuItem2.default, {
                    key: action,
                    'data-object-id': activeItem && activeItem.id,
                    className: 'd2-ui-table__context-menu__item',
                    onClick: onClick,
                    primaryText: context.d2.i18n.getTranslation(action),
                    leftIcon: _react2.default.createElement(
                        _FontIcon2.default,
                        { className: 'material-icons' },
                        iconName
                    )
                });
            })
        )
    );
}

TableContextMenu.defaultProps = {
    icons: {},
    actions: {}
};

TableContextMenu.propTypes = {
    actions: _propTypes2.default.objectOf(_propTypes2.default.func),
    activeItem: _propTypes2.default.object,
    icons: _propTypes2.default.object,
    target: _propTypes2.default.object,
    onRequestClose: _propTypes2.default.func
};

exports.default = (0, _d2UiCore.addD2Context)(TableContextMenu);