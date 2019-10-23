import _Array$from from 'babel-runtime/core-js/array/from';
import _Map from 'babel-runtime/core-js/map';
import _Object$keys from 'babel-runtime/core-js/object/keys';
import _Object$getPrototypeOf from 'babel-runtime/core-js/object/get-prototype-of';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import isArrayOfStrings from 'd2-utilizr/lib/isArrayOfStrings';
import isIterable from 'd2-utilizr/lib/isIterable';

import TableHeader from './TableHeader.component';
import TableRow from './TableRow.component';
import TableContextMenu from './TableContextMenu.component';

var Table = function (_Component) {
    _inherits(Table, _Component);

    function Table() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, Table);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Table.__proto__ || _Object$getPrototypeOf(Table)).call.apply(_ref, [this].concat(args))), _this), _this.state = _this.getStateFromProps(_this.props), _this.handleRowClick = function (event, rowSource) {
            var cmt = event.currentTarget;
            _this.setState(function (state) {
                return {
                    contextMenuTarget: cmt,
                    showContextMenu: true,
                    activeRow: rowSource !== state.activeRow ? rowSource : undefined
                };
            });
        }, _this.hideContextMenu = function () {
            _this.setState({
                activeRow: undefined,
                showContextMenu: false
            });
        }, _this.hasContextMenu = function () {
            return _Object$keys(_this.props.contextMenuActions || {}).length > 1;
        }, _this.hasSingleAction = function () {
            return _Object$keys(_this.props.contextMenuActions || {}).length === 1;
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Table, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(newProps) {
            this.setState(this.getStateFromProps(newProps));
        }
    }, {
        key: 'getStateFromProps',
        value: function getStateFromProps(props) {
            var dataRows = [];

            if (isIterable(props.rows)) {
                dataRows = props.rows instanceof _Map ? _Array$from(props.rows.values()) : props.rows;
            }

            return {
                columns: isArrayOfStrings(props.columns) ? props.columns : ['name', 'lastUpdated'],
                dataRows: dataRows,
                activeRow: undefined
            };
        }
    }, {
        key: 'renderRows',
        value: function renderRows() {
            var _this2 = this;

            return this.state.dataRows.map(function (dataRowsSource, dataRowsId) {
                return React.createElement(TableRow, {
                    key: dataRowsId,
                    dataSource: dataRowsSource,
                    columns: _this2.state.columns,
                    isActive: _this2.state.activeRow === dataRowsId,
                    itemClicked: _this2.handleRowClick,
                    primaryClick: _this2.props.primaryAction || function () {},
                    contextMenuActions: _this2.props.contextMenuActions,
                    contextMenuIcons: _this2.props.contextMenuIcons
                });
            });
        }
    }, {
        key: 'renderHeaders',
        value: function renderHeaders() {
            return this.state.columns.map(function (headerName, index) {
                return React.createElement(TableHeader, { key: headerName, isOdd: Boolean(index % 2), name: headerName });
            });
        }
    }, {
        key: 'renderContextMenu',
        value: function renderContextMenu() {
            var _this3 = this;

            var actionAccessChecker = this.props.isContextActionAllowed && this.props.isContextActionAllowed.bind(null, this.state.activeRow) || function () {
                return true;
            };

            var actionsToShow = _Object$keys(this.props.contextMenuActions || {}).filter(actionAccessChecker).reduce(function (availableActions, actionKey) {
                availableActions[actionKey] = _this3.props.contextMenuActions[actionKey]; // eslint-disable-line
                return availableActions;
            }, {});

            return React.createElement(TableContextMenu, {
                target: this.state.contextMenuTarget,
                onRequestClose: this.hideContextMenu,
                actions: actionsToShow,
                activeItem: this.state.activeRow,
                icons: this.props.contextMenuIcons
            });
        }
    }, {
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                { className: 'd2-ui-table' },
                React.createElement(
                    'div',
                    { className: 'd2-ui-table__headers' },
                    this.renderHeaders(),
                    (this.hasContextMenu() || this.hasSingleAction()) && React.createElement(TableHeader, null)
                ),
                React.createElement(
                    'div',
                    { className: 'd2-ui-table__rows' },
                    this.renderRows()
                ),
                this.hasContextMenu() && this.renderContextMenu()
            );
        }
    }]);

    return Table;
}(Component);

Table.propTypes = {
    contextMenuActions: PropTypes.object,
    contextMenuIcons: PropTypes.object,
    primaryAction: PropTypes.func,
    isContextActionAllowed: PropTypes.func
};

export default Table;