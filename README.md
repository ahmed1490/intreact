intreact
========

Handling interactions with dumb react components.

Complex DOM events and interactions are not easy to be handled by stateless dumb
components as you often need to keep a state about the current interaction and
care about setting up DOM level event listeners.

With Intreact (typo intended) you can keep your components simple, clean and
stateless and wrap them to handle all the interactions you may need.

At its current state Intreact uses [hammerjs](http://hammerjs.github.io/) to handle touch-like interactions
and preserve all the synthetic events to be handled by react.

This is particularly useful with stateless components on a flux architecture:
basically you will not dispatch any action inside the components, but will keep
them in the "smart" container where you will wrap all your "dumb"
components using Intreact and other "wrappers" (e.g. layouting,
mediaqueries, etc...).

Usage
-----
Add `intreact` as a dependency

`$ npm install --save intreact`

then simply use the provided component inside your "smart containers".

The actions provided to Intreact will most likely trigger some changes on the
central state of the whole app and the stateless components will update whenever
their props will change.

```javascript
import React from 'react';
import ReactDOM from 'react-dom';

import Intreact from 'intreact';

ReactDOM.render(
    <Intreact
        onClick={clickAction}
        onMouseOver={mouseOverAction}
        onTap={tapAction}
        onTapoutside={tapoutsideAction}
        onSwipeleft={swipeleftAction}
        onSwiperight={swiperightAction}>

        <DumbComponent>INTERACT WITH ME!</DumbComponent>

    </Intreact>,
    document.getElementById('intreact-example')
);

```

Intreact supports all the events provided by [hammerjs](http://hammerjs.github.io/), you just need to add "on"
in front of the event name and uppercase the first letter (e.g. "tap" -> onTap,
"swiperight" -> onSwiperight).

onTapoutside is a special handler that will be triggered when tapping outside of the wrapped element. To make it possible a global Hammer Manager must be instantiated, however Intreact will always check if it already exist and in that case it will just add the new listener to it. When the component get unmounted the onTapoutside listener will be removed, however the global Hammer Manager will not be removed as it may be used by other Intreact components. If you really want to get rid of it and you are sure that no other Intreact components are listening for onTapoutside events you can destroy the window.__intreact_hammer__ object.

You can freely continue to add standard react [synthetic events](https://facebook.github.io/react/docs/events.html) to your stateless
components, however if you want to keep all the interactions inside Intreact
wrappers you can simply add the usual synthetic events to Intreact as well and
it will pass them down to the underlying component.

Performance Notes
-----------------
Hammerjs support a lot of events, Intreact however will only create event
listeners for the required events and will take care of removing them as well as
destroying the Hammer instance when not needed anymore.

If you only use synthetic events no Hammer instance will be created at all.

Future Plans
------------
At the moment Intreact only supports touch events using [hammerjs](http://hammerjs.github.io/), however it
would be quite simple to extend it in order to support other libraries for
different kind of events.

The main idea is to group all the best interaction libraries specific type of
events and create the required instances and listeners only when needed.

Development
-----------
Clone the repository then

`$ npm install`

`$ npm start`

to start a dev server on `localhost:8080`

to run tests just use

`$ npm test`

or

`$ npm run test:watch`

Warnings
--------
This component should not not be considered ready for production (until it will reach 1.0.0),
however testing and contributions are really welcome.
