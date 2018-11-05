import _slicedToArray from 'babel-runtime/helpers/slicedToArray';
import _Array$from from 'babel-runtime/core-js/array/from';
import _Map from 'babel-runtime/core-js/map';
import _extends from 'babel-runtime/helpers/extends';
import _Object$getPrototypeOf from 'babel-runtime/core-js/object/get-prototype-of';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { isNil } from 'lodash/fp';
import { addD2Context } from '@dhis2/d2-ui-core';
import Color from './Color.component';
import PublicAccessValue from './PublicAccessValue.component';

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

    return React.createElement(
        'span',
        { title: displayValue, style: textWrapStyle },
        displayValue
    );
}

function getDateToShowInList(value) {
    var locale = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'en';

    if (isNil(value)) {
        return '';
    }

    if (typeof global.Intl !== 'undefined' && Intl.DateTimeFormat) {
        return new Intl.DateTimeFormat(locale, { year: 'numeric', month: 'long', day: 'numeric' }).format(new Date(value));
    }

    return value.substr(0, 19).replace('T', ' ');
}

var DateValue = function (_PureComponent) {
    _inherits(DateValue, _PureComponent);

    function DateValue(props, context) {
        _classCallCheck(this, DateValue);

        var _this = _possibleConstructorReturn(this, (DateValue.__proto__ || _Object$getPrototypeOf(DateValue)).call(this, props, context));

        _this.state = {
            uiLocale: 'en'
        };
        return _this;
    }

    _createClass(DateValue, [{
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

            return React.createElement(TextValue, { value: displayDate });
        }
    }]);

    return DateValue;
}(PureComponent);

DateValue.contextTypes = {
    d2: PropTypes.object
};

function ObjectWithDisplayName(props) {
    var textValue = props.value && (props.value.displayName || props.value.name);
    return React.createElement(TextValue, _extends({}, props, { value: textValue }));
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
        Component = React.createElement(PublicAccessValue, { value: value });
    }

    if (!Component) {
        Component = React.createElement(TextValue, { value: value });
    }

    return Component;
}

function isPublicAccess(_ref6) {
    var columnName = _ref6.columnName;

    return columnName === 'publicAccess';
}

var valueRenderers = [[isPublicAccess, getPublicAccessValue], [isDateValue, DateValue], [isObjectWithDisplayName, ObjectWithDisplayName], [isColorValue, Color]];

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
export var addValueRenderer = function addValueRenderer(checker, component) {
    valueRenderers.unshift([checker, component]);

    /**
     * Un-register the valueRenderer
     */
    return function removeValueRenderer() {
        var rendererMap = new _Map(valueRenderers);

        rendererMap.delete(checker);

        valueRenderers = _Array$from(rendererMap);
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
export var findValueRenderer = function findValueRenderer(valueDetails) {
    var valueCheckers = valueRenderers.map(function (_ref7) {
        var _ref8 = _slicedToArray(_ref7, 1),
            checker = _ref8[0];

        return checker;
    });
    var checkerIndex = valueCheckers.findIndex(function (checker) {
        return checker(valueDetails);
    });

    return valueRenderers[checkerIndex] && valueRenderers[checkerIndex][1] || TextValue;
};