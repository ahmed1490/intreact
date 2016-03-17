import React from 'react';
import { render } from 'react-dom';
import Intreact from 'intreact';

render(
    <Intreact
        onClick={() => console.log('click')}
        onMouseOver={() => console.log('mouseOver')}
        onTap={() => console.log('tap')}
        onSwipeleft={() => console.log('swipeleft')}
        onSwipedown={() => console.log('swipedown')}
        onSwiperight={() => console.log('swiperight')}>

        <div className="touch-area">TOUCH ME!</div>

    </Intreact>,
    document.getElementById('intreact-example')
);
