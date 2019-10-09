/*
    * @author kommuri.saikumar@zoomrx.com
    * This is used to listen/observe custom events 
*/

export default function customEventListener() {
    let cel = {},
    eventCallBacks = {}; // contains all the events and their callBacks list
    /*
        * subscribeEvent function is to subscribe to an event change.
        * @param {String} eventName => event name
        * @param {Function} callBack => function to be called when event has been triggered
        * @return {Function} unsubscribe function => accept callback to unsubscribe
    */
    cel.subscribeEvent = (eventName, callBack) => {
        console.log(eventCallBacks, eventName);
        if (!eventCallBacks[eventName]) {
            eventCallBacks[eventName] = [];
        }
        if (eventCallBacks[eventName].length && eventCallBacks[eventName].indexOf(callBack) !== -1) {
            eventCallBacks[eventName].push(callBack);
        }
        // returning unsubscribe function
        return () => {
            eventCallBacks[eventName] = eventCallBacks[eventName].filter(callBackToRemove => 
                callBackToRemove !== callBack);
            if (!eventCallBacks[eventName].length) delete eventCallBacks[eventName];
        };
    }

    /*
        * publishEvent function to publish an already existing event. It will fire all the eventCallBacks.
        * @param {String} eventName => event name
        * @param {Object} data => data to be passed to the callback
    */
    cel.publishEvent = (eventName, ...args) => {
        if (!eventCallBacks[eventName]) return;
        eventCallBacks[eventName].forEach(callBack =>
            callBack(...args));
    }

    return cel;
};