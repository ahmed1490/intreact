const syntheticEvents = [
    'onCopy',
    'onCut',
    'onPaste',

    'onCompositionEnd',
    'onCompositionStart',
    'onCompositionUpdate',

    'onKeyDown',
    'onKeyPress',
    'onKeyUp',

    'onFocus',
    'onBlur',

    'onChange',
    'onInput',
    'onSubmit',

    'onClick',
    'onContextMenu',
    'onDoubleClick',

    'onDrag',
    'onDragEnd',
    'onDragEnter',
    'onDragExit',
    'onDragLeave',
    'onDragOver',
    'onDragStart',
    'onDrop',

    'onMouseDown',
    'onMouseEnter',
    'onMouseLeave',
    'onMouseMove',
    'onMouseOut',
    'onMouseOver',
    'onMouseUp',

    'onSelect',

    'onTouchCancel',
    'onTouchEnd',
    'onTouchMove',
    'onTouchStart',

    'onScroll',
    'onWheel',

    'onAbort',
    'onCanPlay',
    'onCanPlayThrough',
    'onDurationChange',
    'onEmptied',
    'onEncrypted',
    'onEnded',
    'onError',
    'onLoadedData',
    'onLoadedMetadata',
    'onLoadStart',
    'onPause',
    'onPlay',
    'onPlaying',
    'onProgress',
    'onRateChange',
    'onSeeked',
    'onSeeking',
    'onStalled',
    'onSuspend',
    'onTimeUpdate',
    'onVolumeChange',
    'onWaiting',

    'onLoad',
    'onError',
];

const hammerEvents = [
    'onPan',
    'onPanstart',
    'onPanmove',
    'onPanend',
    'onPancancel',
    'onPanleft',
    'onPanright',
    'onPanup',
    'onPandown',

    'onPinch',
    'onPinchstart',
    'onPinchmove',
    'onPinchend',
    'onPinchcancel',
    'onPinchin',
    'onPinchout',

    'onPress',
    'onPressup',

    'onRotate',
    'onRotatestart',
    'onRotatemove',
    'onRotateend',
    'onRotatecancel',

    'onSwipe',
    'onSwipeleft',
    'onSwiperight',
    'onSwipeup',
    'onSwipedown',

    'onTap',
    'onTapoutside',
];

const customKeyboardEvents = [
    'onArrowUp',
    'onArrowRight',
    'onArrowDown',
    'onArrowLeft',
    'onEscape',
];

export const hammerEventNames = hammerEvents.map(el => el.slice(2).toLowerCase);

export function needsTap(props) {
    return 'onTap' in props;
}

export function needsPress(props) {
    return 'onPress' in props ||
        'onPressup' in props;
}

export function needsAllSwipeDirections(props) {
    return 'onSwipedown' in props ||
        'onSwipeup' in props;
}

export function needsSwipe(props) {
    return needsAllSwipeDirections(props) ||
        'onSwiperight' in props ||
        'onSwipeleft' in props;
}

export function needsAllPanDirections(props) {
    return 'onPanstart' in props ||
        'onPanmove' in props ||
        'onPanend' in props ||
        'onPancancel' in props ||
        'onPanup' in props ||
        'onPandown' in props;
}

export function needsPan(props) {
    return needsAllPanDirections(props) ||
        'onPanleft' in props ||
        'onPanright' in props;
}

export function needsPinch(props) {
    return 'onPinch' in props ||
        'onPinchstart' in props ||
        'onPinchmove' in props ||
        'onPinchend' in props ||
        'onPinchcancel' in props ||
        'onPinchin' in props ||
        'onPinchout' in props;
}

export function needsRotate(props) {
    return 'onRotate' in props ||
        'onRotatestart' in props ||
        'onRotatemove' in props ||
        'onRotateend' in props ||
        'onRotatecancel' in props;
}

export function needsTapoutside(props) {
    return 'onTapoutside' in props;
}

export function isHammerEvent(name) {
    return hammerEvents.indexOf(name) !== -1;
}

export function isSyntheticEvent(name) {
    return syntheticEvents.indexOf(name) !== -1;
}

export function isCustomKeyboardEvent(name) {
    return customKeyboardEvents.indexOf(name) !== -1;
}

export function configureKeyDown(props, events) {
    const originalKeyDown = props.onKeyDown;
    return ev => {
        originalKeyDown && originalKeyDown(ev);
        if (events.includes('onEscape')) {
            if (ev.key === 'Escape') props.onEscape();
        }
        if (events.includes('onArrowUp')) {
            if (ev.key === 'ArrowUp') props.onArrowUp();
        }
        if (events.includes('onArrowRight')) {
            if (ev.key === 'ArrowRight') props.onArrowRight();
        }
        if (events.includes('onArrowDown')) {
            if (ev.key === 'ArrowDown') props.onArrowDown();
        }
        if (events.includes('onArrowLeft')) {
            if (ev.key === 'ArrowLeft') props.onArrowLeft();
        }
    };
}

export function isContainedBy(node, parent) {
    if (node === parent) return true;
    if (!parent.children) return false;
    const nodes = [].slice.call(parent.children);
    return nodes.reduce((result, el) => {
        if (result) return true;
        if (el === node) return true;
        if (el.children) return isContainedBy(node, el);
        return false;
    }, false);
}
