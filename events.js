var _isFunc = function(func) {
    if (func && typeof func === 'function') {
        return true;
    }
    return false;
};

function EventHandle() {
    this.events = {};
}

/**
 * event listener
 * @param eventType
 * @param callback
 */
EventHandle.prototype.on = function(eventType, callback) {
    if (!_isFunc(callback)) {
        return;
    }
    var events = this.events;
    if (!events[eventType]) {
        events[eventType] = [callback];
        return this;
    }
    events[eventType].push(callback);
    return this;
}
/**
 * event emitter
 * @param eventType
 */
EventHandle.prototype.emit = function(eventType) {
    var eventList = this.events[eventType];
    if (!eventList) {
        return;
    }
    for (var i = 0,len = eventList.length;i < len;i++) {
        eventList[i].call(this);
    }
}
/**
 * event remove
 * @param eventType
 */
EventHandle.prototype.off = function(eventType, callback) {
    var events = this.events;
    if (!events[eventType]) {
        return;
    }
    // 不指定回调函数，直接移除事件的所有监听者
    if (!_isFunc(callback)) {
        delete events[eventType];
        return;
    }
    // 指定回调函数
    var eventList = events[eventType];
    for (var i = 0,len = eventList.length;i < len;i++) {
        if (eventList[i] === callback) {
            eventList.splice(i, 1);
        }
    }
}