'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

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

var _camelCaseToUnderscores = require('d2-utilizr/lib/camelCaseToUnderscores');

var _camelCaseToUnderscores2 = _interopRequireDefault(_camelCaseToUnderscores);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TableHeader = function (_Component) {
    (0, _inherits3.default)(TableHeader, _Component);

    function TableHeader(props, context) {
        (0, _classCallCheck3.default)(this, TableHeader);

        var _this = (0, _possibleConstructorReturn3.default)(this, (TableHeader.__proto__ || (0, _getPrototypeOf2.default)(TableHeader)).call(this, props, context));

        var i18n = _this.context.d2.i18n;
        _this.getTranslation = i18n.getTranslation.bind(i18n);
        return _this;
    }

    (0, _createClass3.default)(TableHeader, [{
        key: 'render',
        value: function render() {
            var classList = (0, _classnames2.default)('d2-ui-table__headers__header', {
                'd2-ui-table__headers__header--even': !this.props.isOdd,
                'd2-ui-table__headers__header--odd': this.props.isOdd
            });

            return _react2.default.createElement(
                'div',
                { className: classList },
                this.props.name ? this.getTranslation((0, _camelCaseToUnderscores2.default)(this.props.name)) : null
            );
        }
    }]);
    return TableHeader;
}(_react.Component);

TableHeader.propTypes = {
    isOdd: _propTypes2.default.bool,
    name: _propTypes2.default.string
};

TableHeader.contextTypes = {
    d2: _propTypes2.default.object
};

exports.default = TableHeader;