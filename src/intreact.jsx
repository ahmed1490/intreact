const canUseDOM = !!(
    (typeof window !== 'undefined' &&
    window.document && window.document.createElement)
);

import React, {Component, PropTypes} from 'react';

const Hammer = canUseDOM ? require('hammerjs') : undefined;

import {
    configureKeyDown,
    isHammerEvent,
    isSyntheticEvent,
    isCustomKeyboardEvent,
    hammerEventNames,
    needsAllSwipeDirections,
    needsAllPanDirections,
    needsTap,
    needsPress,
    needsPan,
    needsSwipe,
    needsPinch,
    needsRotate,
    needsTapoutside,
    isContainedBy,
} from './utils';

export default class Intreact extends Component {
    componentDidMount() {
        const {
            onTap,
            onSwipeleft,
            onSwiperight,
            autofocus,
        } = this.props;

        const hammerEvents = Object.keys(this.props)
            .filter(isHammerEvent);

        const hammerIsNeeded = hammerEvents.length > 0;

        if (canUseDOM) {
            const customKeyboardEvents = Object.keys(this.props)
                .filter(isCustomKeyboardEvent);

            if (autofocus) {
                this.refs.element.focus();
            }
        }

        if (hammerIsNeeded) {
            if (!canUseDOM) return;
            this.hammer = new Hammer.Manager(this.refs.element, {
                recognizers: this.getNeededRecognizers(),
                touchAction: 'manipulation'
            });
            this.configureHammer();
            hammerEvents.forEach(event => {
                // event handlers are always in the form onEventname
                // here we just need to get eventname as expected by hammer
                const name = event.slice(2).toLowerCase();
                this.hammer.on(name, this.props[event]);
            });
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.autofocus) {
            this.refs.element.focus();
        }

        if (this.hammer) {
            // if the event handlers are changed we need to update them
            const hammerEvents = Object.keys(this.props).filter(isHammerEvent);
            hammerEvents.forEach(event => {
                const name = event.slice(2).toLowerCase();
                if (this.props[event] !== prevProps[event]) {
                    this.hammer.off(name, prevProps[event]);
                    this.props[event] && this.hammer.on(name, this.props[event]);
                }
            });
        }
    }

    componentWillUnmount() {
        if (this.hammer) {
            this.hammer.off(hammerEventNames.join(' '));
            this.hammer.destroy();

            if (this.hasTapoutside) {
                this.globalHammer.off('tap', this.handleTapoutside);
            }
        }
    }

    getNeededRecognizers() {
        const recognizers = [];
        if (needsPan(this.props)) recognizers.push([Hammer.Pan]);
        if (needsPinch(this.props)) recognizers.push([Hammer.Pinch]);
        if (needsPress(this.props)) recognizers.push([Hammer.Press]);
        if (needsRotate(this.props)) recognizers.push([Hammer.Rotate]);
        if (needsSwipe(this.props)) recognizers.push([Hammer.Swipe]);
        if (needsTap(this.props)) recognizers.push([Hammer.Tap]);

        return recognizers;
    }

    configureHammer() {
        if (needsSwipe(this.props)) {
            this.hammer.get('swipe').set({ direction: Hammer.DIRECTION_HORIZONTAL });
        }

        if (needsPan(this.props)) {
            this.hammer.get('pan').set({ direction: Hammer.DIRECTION_HORIZONTAL });
        }

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

        if (needsTapoutside(this.props)) {
            this.configureTapoutside();
        }
    }

    handleTapoutside(e) {
        if (isContainedBy(e.target, this.refs.element)) return;
        this.props.onTapoutside(e);
    }

    configureTapoutside() {
        this.globalHammer = this.getGlobalHammer();
        this.globalHammer.on('tap', this.handleTapoutside.bind(this));
        this.hasTapoutside = true;
    }

    getGlobalHammer() {
        if (window.__intreact_hammer__) return window.__intreact_hammer__;
        window.__intreact_hammer__ = new Hammer.Manager(window.document, {
            recognizers: [[Hammer.Tap]],
            domEvents: true
        });
        return window.__intreact_hammer__;
    }

    configureCustomKeyboardEvents(events) {
        return configureKeyDown(this.props, events);
    }

    render() {
        const {
            children,
            onClick
        } = this.props;

        let childProps = {};

        const syntheticEvents = Object.keys(this.props)
            .filter(isSyntheticEvent);

        const customKeyboardEvents = Object.keys(this.props)
            .filter(isCustomKeyboardEvent);

        if (syntheticEvents.length > 0) {
            syntheticEvents.forEach(event => {
                childProps[event] = this.props[event];
            });
        }

        if (customKeyboardEvents.length > 0) {
            childProps.onKeyDown = this.configureCustomKeyboardEvents(customKeyboardEvents);
            childProps.tabIndex = '0';
            childProps.style = { outline: 'none' };
        }

        return (
            <div {...childProps} ref="element">
                {children}
            </div>
        );
    }
}
