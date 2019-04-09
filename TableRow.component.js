'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

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

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _IconButton = require('material-ui/IconButton');

var _IconButton2 = _interopRequireDefault(_IconButton);

var _FontIcon = require('material-ui/FontIcon');

var _FontIcon2 = _interopRequireDefault(_FontIcon);

var _moreVert = require('material-ui/svg-icons/navigation/more-vert');

var _moreVert2 = _interopRequireDefault(_moreVert);

var _d2UiCore = require('@dhis2/d2-ui-core');

var _valueRenderers = require('./data-value/valueRenderers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getD2ModelValueType(dataSource, columnName) {
    return dataSource && dataSource.modelDefinition && dataSource.modelDefinition.modelValidations && dataSource.modelDefinition.modelValidations[columnName] && dataSource.modelDefinition.modelValidations[columnName].type;
}

var TableRow = (0, _d2UiCore.addD2Context)(function (_Component) {
    (0, _inherits3.default)(_class2, _Component);

    function _class2() {
        var _ref;

        var _temp, _this, _ret;

        (0, _classCallCheck3.default)(this, _class2);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = _class2.__proto__ || (0, _getPrototypeOf2.default)(_class2)).call.apply(_ref, [this].concat(args))), _this), _this.iconMenuClick = function (event) {
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
            return (0, _keys2.default)(_this.props.contextMenuActions || {}).length > 1;
        }, _this.hasSingleAction = function () {
            return (0, _keys2.default)(_this.props.contextMenuActions || {}).length === 1;
        }, _this.singleAction = function () {
            if (_this.hasSingleAction()) {
                var actionKeys = (0, _keys2.default)(_this.props.contextMenuActions || {});
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
        }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
    }

    (0, _createClass3.default)(_class2, [{
        key: 'render',
        value: function render() {
            var _this2 = this;

            var classList = (0, _classnames2.default)('d2-ui-table__rows__row', {
                'd2-ui-table__rows__row--even': !this.props.isOdd,
                'd2-ui-table__rows__row--odd': this.props.isOdd
            });

            var columns = this.props.columns.map(function (columnName, index) {
                var valueDetails = {
                    valueType: getD2ModelValueType(_this2.props.dataSource, columnName),
                    value: _this2.props.dataSource[columnName],
                    columnName: columnName
                };

                var Value = (0, _valueRenderers.findValueRenderer)(valueDetails);

                return _react2.default.createElement(
                    'div',
                    {
                        key: index,
                        className: 'd2-ui-table__rows__row__column',
                        onContextMenu: _this2.handleContextClick,
                        onClick: _this2.handleClick
                    },
                    _react2.default.createElement(Value, valueDetails)
                );
            });

            return _react2.default.createElement(
                'div',
                { className: classList },
                columns,
                this.hasContextMenu() && _react2.default.createElement(
                    'div',
                    { className: 'd2-ui-table__rows__row__column', style: { width: '1%' } },
                    _react2.default.createElement(
                        _IconButton2.default,
                        { tooltip: this.context.d2.i18n.getTranslation('actions'), onClick: this.iconMenuClick },
                        _react2.default.createElement(_moreVert2.default, null)
                    )
                ),
                this.hasSingleAction() && _react2.default.createElement(
                    'div',
                    { className: 'd2-ui-table__rows__row__column', style: { width: '1%' } },
                    _react2.default.createElement(
                        _IconButton2.default,
                        { tooltip: this.context.d2.i18n.getTranslation(this.singleAction().label), onClick: this.singleActionClick },
                        _react2.default.createElement(
                            _FontIcon2.default,
                            { className: 'material-icons' },
                            this.singleAction().icon
                        )
                    )
                )
            );
        }
    }]);
    return _class2;
}(_react.Component));

TableRow.propTypes = {
    columns: _propTypes2.default.arrayOf(_propTypes2.default.string).isRequired,
    dataSource: _propTypes2.default.object,
    isEven: _propTypes2.default.bool,
    isOdd: _propTypes2.default.bool,
    itemClicked: _propTypes2.default.func.isRequired,
    primaryClick: _propTypes2.default.func.isRequired,
    contextMenuActions: _propTypes2.default.object,
    contextMenuIcons: _propTypes2.default.object
};

exports.default = TableRow;