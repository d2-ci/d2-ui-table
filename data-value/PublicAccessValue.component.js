'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.TranslateSpan = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _fp = require('lodash/fp');

var _loglevel = require('loglevel');

var _loglevel2 = _interopRequireDefault(_loglevel);

var _d2UiCore = require('@dhis2/d2-ui-core');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Translate(props, context) {
    if (context.d2 && context.d2.i18n && (0, _fp.isFunction)(context.d2.i18n.getTranslation)) {
        return _react2.default.createElement(
            'span',
            null,
            context.d2.i18n.getTranslation(props.children)
        );
    }

    _loglevel2.default.error('<Translate />: d2 is not available on the `context`');
    return _react2.default.createElement('span', null);
}

var TranslateSpan = exports.TranslateSpan = (0, _d2UiCore.addD2Context)(Translate);

var PublicAccessValue = function PublicAccessValue(_ref) {
    var value = _ref.value;

    var metaData = value.substr(0, 2);
    var data = value.substr(2, 2);
    var other = value.substr(4, 4);

    if (other === '----' && (data === '--' || data === 'r-' || data === 'rw')) {
        if (metaData === 'rw') {
            return _react2.default.createElement(
                TranslateSpan,
                null,
                'public_can_edit'
            );
        } else if (metaData === 'r-') {
            return _react2.default.createElement(
                TranslateSpan,
                null,
                'public_can_view'
            );
        } else if (metaData === '--') {
            return _react2.default.createElement(
                TranslateSpan,
                null,
                'public_none'
            );
        }

        return null;
    }
};

exports.default = PublicAccessValue;