const EventEmitter = require('events')

class Emitter extends EventEmitter { }

const e = new Emitter()

// registering an event 
e.on('foo', (...args) => {
    console.log(args)
    console.log('foo event occurred')
})

e.emit('foo', 'hello', 'again')


class Emitter1 {

    events = {}

    on(event_name, event_callBack) {
        this.events[event_name] = event_callBack
    }

    emit(event_name, ...args) {
        this.events[event_name](args)
    }

}

let e2 = new Emitter1()

// registering an event 
e.on('custom-foo', (...args) => {
    console.log(args)
    console.log('custom-foo event occurred')
})

e.emit('custom-foo', 'hello', 'again')