import _Object$keys from 'babel-runtime/core-js/object/keys';
import _Object$getPrototypeOf from 'babel-runtime/core-js/object/get-prototype-of';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classes from 'classnames';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import MoreVert from 'material-ui/svg-icons/navigation/more-vert';
import { addD2Context } from '@dhis2/d2-ui-core';
import { findValueRenderer } from './data-value/valueRenderers';

function getD2ModelValueType(dataSource, columnName) {
    return dataSource && dataSource.modelDefinition && dataSource.modelDefinition.modelValidations && dataSource.modelDefinition.modelValidations[columnName] && dataSource.modelDefinition.modelValidations[columnName].type;
}

var TableRow = addD2Context(function (_Component) {
    _inherits(_class2, _Component);

    function _class2() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, _class2);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = _class2.__proto__ || _Object$getPrototypeOf(_class2)).call.apply(_ref, [this].concat(args))), _this), _this.iconMenuClick = function (event) {
            _this.props.itemClicked(event, _this.props.dataSource);
        }, _this.singleActionClick = function () {
            if (_this.hasSingleAction()) {
                _this.singleAction().action(_this.props.dataSource);
            }
        }, _this.handleContextClick = function (event) {
            event && event.preventDefault();
            _this.props.itemClicked(event, _this.props.dataSource);
        }, _this.handleClick = function (event) {
            _this.props.primaryClick(_this.props.dataSource, event);
        }, _this.hasContextMenu = function () {
            return _Object$keys(_this.props.contextMenuActions || {}).length > 1;
        }, _this.hasSingleAction = function () {
            return _Object$keys(_this.props.contextMenuActions || {}).length === 1;
        }, _this.singleAction = function () {
            if (_this.hasSingleAction()) {
                var actionKeys = _Object$keys(_this.props.contextMenuActions || {});
                var label = actionKeys[0];
                var action = _this.props.contextMenuActions[label];
                var icon = _this.props.contextMenuIcons && _this.props.contextMenuIcons[label] ? _this.props.contextMenuIcons[label] : label;
                return {
                    label: label,
                    action: action,
                    icon: icon
                };
            }
            return null;
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(_class2, [{
        key: 'render',
        value: function render() {
            var _this2 = this;

            var classList = classes('d2-ui-table__rows__row', {
                'd2-ui-table__rows__row--even': !this.props.isOdd,
                'd2-ui-table__rows__row--odd': this.props.isOdd
            });

            var columns = this.props.columns.map(function (columnName, index) {
                var valueDetails = {
                    valueType: getD2ModelValueType(_this2.props.dataSource, columnName),
                    value: _this2.props.dataSource[columnName],
                    columnName: columnName
                };

                var Value = findValueRenderer(valueDetails);

                return React.createElement(
                    'div',
                    {
                        key: index,
                        className: 'd2-ui-table__rows__row__column',
                        onContextMenu: _this2.handleContextClick,
                        onClick: _this2.handleClick
                    },
                    React.createElement(Value, valueDetails)
                );
            });

            return React.createElement(
                'div',
                { className: classList },
                columns,
                this.hasContextMenu() && React.createElement(
                    'div',
                    { className: 'd2-ui-table__rows__row__column', style: { width: '1%' } },
                    React.createElement(
                        IconButton,
                        { tooltip: this.context.d2.i18n.getTranslation('actions'), onClick: this.iconMenuClick },
                        React.createElement(MoreVert, null)
                    )
                ),
                this.hasSingleAction() && React.createElement(
                    'div',
                    { className: 'd2-ui-table__rows__row__column', style: { width: '1%' } },
                    React.createElement(
                        IconButton,
                        { tooltip: this.context.d2.i18n.getTranslation(this.singleAction().label), onClick: this.singleActionClick },
                        React.createElement(
                            FontIcon,
                            { className: 'material-icons' },
                            this.singleAction().icon
                        )
                    )
                )
            );
        }
    }]);

    return _class2;
}(Component));

TableRow.propTypes = {
    columns: PropTypes.arrayOf(PropTypes.string).isRequired,
    dataSource: PropTypes.object,
    isEven: PropTypes.bool,
    isOdd: PropTypes.bool,
    itemClicked: PropTypes.func.isRequired,
    primaryClick: PropTypes.func.isRequired,
    contextMenuActions: PropTypes.object,
    contextMenuIcons: PropTypes.object
};

export default TableRow;