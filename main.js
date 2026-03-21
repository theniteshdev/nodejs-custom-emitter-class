// creating own own event emmiter
// all methods of event emmiters

class Emmiter {
    constructor() {
        this._eventsCount = 0;
        this._maxListeners = 10;
        this._onceEvents = {};
        this._events = {};
    };

    _events;
    _onceEvents;
    _eventsCount;
    _maxListeners;

    setMaxEventListeners(x) {
        this._maxListeners = x;
    };

    on(eventName, listner) {
        if (!this._events[eventName]) {
            this._events[eventName] = [listner];
            this._eventsCount++;
        } else {
            if (this._events[eventName].length >= this._maxListeners) {
                console.warn(`Max listeners exceeded for event: ${eventName}`);
            }
            this._events[eventName].push(listner);
            this._eventsCount++;
        }
    };

    emit(eventName, ...args) {
        if (this._events[eventName]) {
            for (const fn of this._events[eventName]) {
                fn(...args);
            };
        }

        if (this._onceEvents[eventName]) {
            for (const fno of this._onceEvents[eventName]) {
                fno(...args);
                this.removeListener(eventName, fno);
            }
        }

    };

    once(eventName, listner) {
        if (!this._onceEvents[eventName]) {
            this._onceEvents[eventName] = [listner]
            this._eventsCount++;
        } else {
            if (this._onceEvents[eventName].length >= this._maxListeners) {
                console.warn(`Max listeners exceeded for event: ${eventName}`);
            };
            this._onceEvents[eventName].push(listner);
            this._eventsCount++;
        }
    };

    removeListener(eventName, listeners) {
        if (this._events[eventName]) {
            this._events[eventName] = this._events[eventName].filter(lisnr => lisnr !== listeners);
        }
        if (this._onceEvents[eventName]) this._onceEvents[eventName] = this._onceEvents[eventName].filter(lisnr => lisnr !== listeners);
    };
    
};