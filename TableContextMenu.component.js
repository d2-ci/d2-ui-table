import _extends from 'babel-runtime/helpers/extends';
import _objectWithoutProperties from 'babel-runtime/helpers/objectWithoutProperties';
import _Object$keys from 'babel-runtime/core-js/object/keys';
import PropTypes from 'prop-types';
import React from 'react';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import FontIcon from 'material-ui/FontIcon';
import Popover from 'material-ui/Popover/Popover';
import Paper from 'material-ui/Paper';
import { addD2Context } from '@dhis2/d2-ui-core';

function TableContextMenu(props, context) {
    var actionList = _Object$keys(props.actions).filter(function (menuActionKey) {
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
        popoverProps = _objectWithoutProperties(props, ['actions', 'activeItem', 'icons']);

    return React.createElement(
        Popover,
        _extends({}, popoverProps, {
            open: Boolean(props.activeItem),
            anchorEl: props.target,
            anchorOrigin: { horizontal: 'middle', vertical: 'center' },
            animated: false,
            style: cmStyle,
            animation: Paper
        }),
        React.createElement(
            Menu,
            { className: 'd2-ui-table__context-menu', desktop: true },
            actionList.map(function (action) {
                var iconName = icons && icons[action] ? icons[action] : action;
                var onClick = function onClick() {
                    if (typeof props.onRequestClose === 'function') {
                        props.onRequestClose();
                    }
                    props.actions[action].apply(props.actions, [props.activeItem]);
                };

                return React.createElement(MenuItem, {
                    key: action,
                    'data-object-id': activeItem && activeItem.id,
                    className: 'd2-ui-table__context-menu__item',
                    onClick: onClick,
                    primaryText: context.d2.i18n.getTranslation(action),
                    leftIcon: React.createElement(
                        FontIcon,
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
    actions: PropTypes.objectOf(PropTypes.func),
    activeItem: PropTypes.object,
    icons: PropTypes.object,
    target: PropTypes.object,
    onRequestClose: PropTypes.func
};

export default addD2Context(TableContextMenu);