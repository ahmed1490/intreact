import test from 'ava';
import React from 'react';
import {shallow} from 'enzyme';

import Intreact from './intreact.jsx';

function getIntreactMock(opts) {
    const defaultOpts = {
        props: {},
        children: <div>CONTENT</div>
    };
    const options = Object.assign({}, defaultOpts, opts);

    return shallow(
        <Intreact {...options.props}>
            {options.children}
        </Intreact>
    );
}

test('should contain "MODAL_CONTENT"', t => {
    const intreact = getIntreactMock();

    t.regex(intreact.html(), /CONTENT/);
});

test('should pass down synthetic events', t => {
    const intreact = getIntreactMock({
        props: {
            onClick: 'CLICK_HANDLER'
        }
    });

    t.ok(intreact.props().onClick);
    t.is(intreact.props().onClick, 'CLICK_HANDLER');
});

test('should not pass down custom events', t => {
    const intreact = getIntreactMock({
        props: {
            onTap: 'TAP_HANDLER'
        }
    });

    t.notOk(intreact.props().onTap);
});
