const canUseDOM = !!(
    (typeof window !== 'undefined' &&
    window.document && window.document.createElement)
);

import React, {Component, PropTypes} from 'react';

const Hammer = canUseDOM ? require('hammerjs') : undefined;

import {
    isHammerEvent,
    isSyntheticEvent,
    hammerEventNames,
    needsAllSwipeDirections,
    needsAllPanDirections,
    needsPinch,
    needsRotate
} from './utils';

export default class Intreact extends Component {
    componentDidMount() {
        const {
            onTap,
            onSwipeleft,
            onSwiperight
        } = this.props;

        const hammerEvents = Object.keys(this.props)
            .filter(isHammerEvent);

        const hammerIsNeeded = hammerEvents.length > 0;

        if (hammerIsNeeded) {
            if (!canUseDOM) return;
            this.hammer = new Hammer(this.refs.element);
            this.configureHammer();
            hammerEvents.forEach(event => {
                // event handlers are always in the form onEventname
                // here we just need to get eventname as expected by hammer
                const name = event.slice(2).toLowerCase();
                this.hammer.on(name, this.props[event]);
            });
        }
    }

    componentWillUnmount() {
        if (this.hammer) {
            this.hammer.off(hammerEventNames.join(' '));
            this.hammer.destroy();
        }
    }

    configureHammer() {
        if (needsAllSwipeDirections(this.props)) {
            this.hammer.get('swipe').set({ direction: Hammer.DIRECTION_ALL });
        }

        if (needsAllPanDirections(this.props)) {
            this.hammer.get('pan').set({ direction: Hammer.DIRECTION_ALL });
        }

        if (needsPinch(this.props)) {
            this.hammer.get('pinch').set({ enable: true });
        }

        if (needsRotate(this.props)) {
            this.hammer.get('rotate').set({ enable: true });
        }
    }

    render() {
        const {
            children,
            onClick
        } = this.props;

        let childProps = {};

        const syntheticEvents = Object.keys(this.props)
            .filter(isSyntheticEvent);

        if (syntheticEvents.length > 0) {
            syntheticEvents.forEach(event => {
                childProps[event] = this.props[event];
            });
        }

        return (
            <div {...childProps} ref="element">
                {children}
            </div>
        );
    }
}
