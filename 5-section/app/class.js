

class A {
    sayHello() {
        console.log('hello mate!')
    }

    sayHi() {
        console.log('Hi mate')
    }
}

/**
 * @param a 
 */

class B {

    constructor(a) {
        this.a = a
    }

    sayBoth() {
        console.log('======== From B ========')
        this.a.sayHello()
        this.a.sayHi()
    }

    saySomethingElse() {
        console.log("Hi I'm cool")
    }
}

const a = new A()
const b = new B(a)

const all = new Proxy(b, {
    get: function (target, property) {
        return target[property] || a[property]
    }
})

all.sayBoth()
all.saySomethingElse()
all.sayHello()
all.sayHi()