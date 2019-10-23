'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.findValueRenderer = exports.addValueRenderer = undefined;

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _from = require('babel-runtime/core-js/array/from');

var _from2 = _interopRequireDefault(_from);

var _map = require('babel-runtime/core-js/map');

var _map2 = _interopRequireDefault(_map);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

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

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _fp = require('lodash/fp');

var _d2UiCore = require('@dhis2/d2-ui-core');

var _Color = require('./Color.component');

var _Color2 = _interopRequireDefault(_Color);

var _PublicAccessValue = require('./PublicAccessValue.component');

var _PublicAccessValue2 = _interopRequireDefault(_PublicAccessValue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function TextValue(_ref) {
    var _ref$value = _ref.value,
        value = _ref$value === undefined ? '' : _ref$value;

    var textWrapStyle = {
        width: '100%',
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        position: 'absolute',
        wordBreak: 'break-all',
        wordWrap: 'break-word',
        top: 0,
        lineHeight: '50px',
        paddingRight: '1rem'
    };

    var displayValue = value.toString();

    return _react2.default.createElement(
        'span',
        { title: displayValue, style: textWrapStyle },
        displayValue
    );
}

function getDateToShowInList(value) {
    var locale = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'en';

    if ((0, _fp.isNil)(value)) {
        return '';
    }

    if (typeof global.Intl !== 'undefined' && Intl.DateTimeFormat) {
        return new Intl.DateTimeFormat(locale, { year: 'numeric', month: 'long', day: 'numeric' }).format(new Date(value));
    }

    return value.substr(0, 19).replace('T', ' ');
}

var DateValue = function (_PureComponent) {
    (0, _inherits3.default)(DateValue, _PureComponent);

    function DateValue(props, context) {
        (0, _classCallCheck3.default)(this, DateValue);

        var _this = (0, _possibleConstructorReturn3.default)(this, (DateValue.__proto__ || (0, _getPrototypeOf2.default)(DateValue)).call(this, props, context));

        _this.state = {
            uiLocale: 'en'
        };
        return _this;
    }

    (0, _createClass3.default)(DateValue, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this2 = this;

            // Get the locale from the userSettings
            this.context.d2.currentUser.userSettings.get('keyUiLocale').then(function (uiLocale) {
                return _this2.setState({ uiLocale: uiLocale });
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var displayDate = getDateToShowInList(this.props.value, this.state.uiLocale);

            return _react2.default.createElement(TextValue, { value: displayDate });
        }
    }]);
    return DateValue;
}(_react.PureComponent);

DateValue.contextTypes = {
    d2: _propTypes2.default.object
};

function ObjectWithDisplayName(props) {
    var textValue = props.value && (props.value.displayName || props.value.name);
    return _react2.default.createElement(TextValue, (0, _extends3.default)({}, props, { value: textValue }));
}

var dhis2DateFormat = /^[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}\.[0-9]{2,3}$/;
function isDateValue(_ref2) {
    var valueType = _ref2.valueType,
        value = _ref2.value;

    return valueType === 'DATE' || dhis2DateFormat.test(value);
}

function isColorValue(_ref3) {
    var value = _ref3.value;

    return (/#([a-z0-9]{6})$/i.test(value)
    );
}

function isObjectWithDisplayName(_ref4) {
    var value = _ref4.value;

    return value && (value.displayName || value.name);
}

function getPublicAccessValue(_ref5) {
    var value = _ref5.value;

    var Component = null;
    if (value) {
        Component = _react2.default.createElement(_PublicAccessValue2.default, { value: value });
    }

    if (!Component) {
        Component = _react2.default.createElement(TextValue, { value: value });
    }

    return Component;
}

function isPublicAccess(_ref6) {
    var columnName = _ref6.columnName;

    return columnName === 'publicAccess';
}

var valueRenderers = [[isPublicAccess, getPublicAccessValue], [isDateValue, DateValue], [isObjectWithDisplayName, ObjectWithDisplayName], [isColorValue, _Color2.default]];

/**
 * Register a new ValueRenderer. The value renderers are used to render different values in the DataTable. (e.g. colors should be rendered as a Color component).
 * The new renderer is added to the start of the renderer list. If your passed `checker` is too specific the `component` might be used for values that you might not want.
 * Passing `() => true` as a checker will result the passed `component` to be used for every value in the DataTable.
 *
 * @param {function} checker Check if the value is valid for the `component` to be rendered. This function receives an object with `value`, `valueType` and `columnName` that can be used to determine if this `component` should render the value.
 * @param {function} component A React component to render when the `checker` returns true. This is the component that will be returned from `findValueRenderer`.
 *
 * @returns {function} A de-register function to unregister the checker. If you want to remove the valueRenderer from the list of renderers you can use this function to undo the add.
 */
var addValueRenderer = exports.addValueRenderer = function addValueRenderer(checker, component) {
    valueRenderers.unshift([checker, component]);

    /**
     * Un-register the valueRenderer
     */
    return function removeValueRenderer() {
        var rendererMap = new _map2.default(valueRenderers);

        rendererMap.delete(checker);

        valueRenderers = (0, _from2.default)(rendererMap);
    };
};

/**
 * This method is used by the DataTableRow component to find a ValueRenderer for the value that should be displayed in the table's cell.
 * It will recieve an object like the one below and loop through a list of renderers until it finds one that will handle this type of value.
 * ```json
 * {
 *   "value": "#FFFFFF",
 *   "valueType": "TEXT",
 *   "columnName": "color",
 * }
 * ```
 *
 * @param {object} valueDetails The value and its details. The object has the properties `columnName`, `value` and `valueType`.
 * @returns {function} The React component that can render a value for the passed `valueDetails`.
 */
var findValueRenderer = exports.findValueRenderer = function findValueRenderer(valueDetails) {
    var valueCheckers = valueRenderers.map(function (_ref7) {
        var _ref8 = (0, _slicedToArray3.default)(_ref7, 1),
            checker = _ref8[0];

        return checker;
    });
    var checkerIndex = valueCheckers.findIndex(function (checker) {
        return checker(valueDetails);
    });

    return valueRenderers[checkerIndex] && valueRenderers[checkerIndex][1] || TextValue;
};