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
    'onError'
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

    'onTap'
];

export const hammerEventNames = hammerEvents.map(el => el.slice(2).toLowerCase);

export function needsAllSwipeDirections(props) {
    return 'onSwipedown' in props ||
        'onSwipeup' in props;
}
export function needsAllPanDirections(props) {
    return 'onPanstart' in props ||
        'onPanmove' in props ||
        'onPanend' in props ||
        'onPancancel' in props ||
        'onPanup' in props ||
        'onPandown' in props;
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


export function isHammerEvent(name) {
    return hammerEvents.includes(name);
}

export function isSyntheticEvent(name) {
    return syntheticEvents.includes(name);
}
