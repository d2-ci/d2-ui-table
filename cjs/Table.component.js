'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _from = require('babel-runtime/core-js/array/from');

var _from2 = _interopRequireDefault(_from);

var _map = require('babel-runtime/core-js/map');

var _map2 = _interopRequireDefault(_map);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _isArrayOfStrings = require('d2-utilizr/lib/isArrayOfStrings');

var _isArrayOfStrings2 = _interopRequireDefault(_isArrayOfStrings);

var _isIterable = require('d2-utilizr/lib/isIterable');

var _isIterable2 = _interopRequireDefault(_isIterable);

var _TableHeader = require('./TableHeader.component');

var _TableHeader2 = _interopRequireDefault(_TableHeader);

var _TableRow = require('./TableRow.component');

var _TableRow2 = _interopRequireDefault(_TableRow);

var _TableContextMenu = require('./TableContextMenu.component');

var _TableContextMenu2 = _interopRequireDefault(_TableContextMenu);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Table = function (_Component) {
    (0, _inherits3.default)(Table, _Component);

    function Table() {
        var _ref;

        var _temp, _this, _ret;

        (0, _classCallCheck3.default)(this, Table);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = Table.__proto__ || (0, _getPrototypeOf2.default)(Table)).call.apply(_ref, [this].concat(args))), _this), _this.state = _this.getStateFromProps(_this.props), _this.handleRowClick = function (event, rowSource) {
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
            return (0, _keys2.default)(_this.props.contextMenuActions || {}).length > 1;
        }, _this.hasSingleAction = function () {
            return (0, _keys2.default)(_this.props.contextMenuActions || {}).length === 1;
        }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
    }

    (0, _createClass3.default)(Table, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(newProps) {
            this.setState(this.getStateFromProps(newProps));
        }
    }, {
        key: 'getStateFromProps',
        value: function getStateFromProps(props) {
            var dataRows = [];

            if ((0, _isIterable2.default)(props.rows)) {
                dataRows = props.rows instanceof _map2.default ? (0, _from2.default)(props.rows.values()) : props.rows;
            }

            return {
                columns: (0, _isArrayOfStrings2.default)(props.columns) ? props.columns : ['name', 'lastUpdated'],
                dataRows: dataRows,
                activeRow: undefined
            };
        }
    }, {
        key: 'renderRows',
        value: function renderRows() {
            var _this2 = this;

            return this.state.dataRows.map(function (dataRowsSource, dataRowsId) {
                return _react2.default.createElement(_TableRow2.default, {
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
                return _react2.default.createElement(_TableHeader2.default, { key: headerName, isOdd: Boolean(index % 2), name: headerName });
            });
        }
    }, {
        key: 'renderContextMenu',
        value: function renderContextMenu() {
            var _this3 = this;

            var actionAccessChecker = this.props.isContextActionAllowed && this.props.isContextActionAllowed.bind(null, this.state.activeRow) || function () {
                return true;
            };

            var actionsToShow = (0, _keys2.default)(this.props.contextMenuActions || {}).filter(actionAccessChecker).reduce(function (availableActions, actionKey) {
                availableActions[actionKey] = _this3.props.contextMenuActions[actionKey]; // eslint-disable-line
                return availableActions;
            }, {});

            return _react2.default.createElement(_TableContextMenu2.default, {
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
            return _react2.default.createElement(
                'div',
                { className: 'd2-ui-table' },
                _react2.default.createElement(
                    'div',
                    { className: 'd2-ui-table__headers' },
                    this.renderHeaders(),
                    (this.hasContextMenu() || this.hasSingleAction()) && _react2.default.createElement(_TableHeader2.default, null)
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'd2-ui-table__rows' },
                    this.renderRows()
                ),
                this.hasContextMenu() && this.renderContextMenu()
            );
        }
    }]);
    return Table;
}(_react.Component);

Table.propTypes = {
    contextMenuActions: _propTypes2.default.object,
    contextMenuIcons: _propTypes2.default.object,
    primaryAction: _propTypes2.default.func,
    isContextActionAllowed: _propTypes2.default.func
};

exports.default = Table;