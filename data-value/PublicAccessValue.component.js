import React from 'react';
import { isFunction } from 'lodash/fp';
import log from 'loglevel';
import { addD2Context } from '@dhis2/d2-ui-core';

function Translate(props, context) {
    if (context.d2 && context.d2.i18n && isFunction(context.d2.i18n.getTranslation)) {
        return React.createElement(
            'span',
            null,
            context.d2.i18n.getTranslation(props.children)
        );
    }

    log.error('<Translate />: d2 is not available on the `context`');
    return React.createElement('span', null);
}

export var TranslateSpan = addD2Context(Translate);

var PublicAccessValue = function PublicAccessValue(_ref) {
    var value = _ref.value;

    var metaData = value.substr(0, 2);
    var data = value.substr(2, 2);
    var other = value.substr(4, 4);

    if (other === '----' && (data === '--' || data === 'r-' || data === 'rw')) {
        if (metaData === 'rw') {
            return React.createElement(
                TranslateSpan,
                null,
                'public_can_edit'
            );
        } else if (metaData === 'r-') {
            return React.createElement(
                TranslateSpan,
                null,
                'public_can_view'
            );
        } else if (metaData === '--') {
            return React.createElement(
                TranslateSpan,
                null,
                'public_none'
            );
        }

        return null;
    }
};

export default PublicAccessValue;