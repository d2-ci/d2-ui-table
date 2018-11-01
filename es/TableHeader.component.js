import _Object$getPrototypeOf from 'babel-runtime/core-js/object/get-prototype-of';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import camelCaseToUnderscores from 'd2-utilizr/lib/camelCaseToUnderscores';
import classes from 'classnames';

var TableHeader = function (_Component) {
    _inherits(TableHeader, _Component);

    function TableHeader(props, context) {
        _classCallCheck(this, TableHeader);

        var _this = _possibleConstructorReturn(this, (TableHeader.__proto__ || _Object$getPrototypeOf(TableHeader)).call(this, props, context));

        var i18n = _this.context.d2.i18n;
        _this.getTranslation = i18n.getTranslation.bind(i18n);
        return _this;
    }

    _createClass(TableHeader, [{
        key: 'render',
        value: function render() {
            var classList = classes('d2-ui-table__headers__header', {
                'd2-ui-table__headers__header--even': !this.props.isOdd,
                'd2-ui-table__headers__header--odd': this.props.isOdd
            });

            return React.createElement(
                'div',
                { className: classList },
                this.props.name ? this.getTranslation(camelCaseToUnderscores(this.props.name)) : null
            );
        }
    }]);

    return TableHeader;
}(Component);

TableHeader.propTypes = {
    isOdd: PropTypes.bool,
    name: PropTypes.string
};

TableHeader.contextTypes = {
    d2: PropTypes.object
};

export default TableHeader;