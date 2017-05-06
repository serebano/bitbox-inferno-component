/** @jsx h */
import bitbox, { observable } from "bitbox"
import App from "./app"
import Component from "./createComponent"

export const Hello = [
    function({ state }) {
        return {
            value: state.name,
            onInput(e) {
                this.value = e.target.value
            }
        }
    },
    function Hello({ onInput, value }, h) {
        return (
            <div style={{ padding: 16, marginTop: 16, background: "#f3f8ff" }}>
                <h1 style={{ margin: "0 0 8px 0" }}>Hello {value}!</h1>
                <input onInput={onInput} value={value} />
            </div>
        )
    }
]

export const Counter = [
    function({ state }) {
        return {
            runId: 0,
            count: state.count,
            get status() {
                return this.runId ? `running: ${this.runId} / stop` : `run`
            },
            inc() {
                return this.count++
            },
            dec() {
                return this.count--
            },
            run() {
                return !this.runId ? setInterval(() => this.count++) : clearInterval(this.runId)
            }
        }
    },
    function Counter({ count, status, inc, dec, run }, h) {
        return (
            <div style={{ padding: 16, marginTop: 16, background: "#f4f4f4" }}>
                <h1 style={{ margin: "0 0 8px 0" }}>count = {count}</h1>
                <button onClick={inc}>+ inc</button>
                <button onClick={dec}>- dec</button>
                <button onClick={run}>{status}</button>
            </div>
        )
    }
]

export const Main = [
    box => ({
        items: box.items
    }),
    function Main(props, h) {
        return (
            <section style={{ fontFamily: "monospace" }}>
                <Hello />
                <Counter />
            </section>
        )
    }
]

export const Items = [
    (box, api) => ({
        items: box.state.items(api.join, "\n")
    }),
    function Items(props, h) {
        return <pre>{props.items}</pre>
    }
]

export const store = {
    state: observable({
        name: "Scooby Doo",
        count: 0
    })
}

export function One(box, { print, observable, observe }) {
    return {
        count: box.count,
        name: box.name,
        items: box(target => {
            if (!target.items) {
                target.items = observable([])
                observe(print, undefined, target.items)
            }
            return target.items
        }),
        add(item) {
            this.items.push(item)
            return this.items
        },
        inc() {
            this.count++
            return this
        },
        dec() {
            this.count--
            return this
        },
        run(interval = 1000) {
            const o = this.observe(() => {
                if (this.count >= 100) {
                    this.name = `observer off at: ${this.count}`
                    print(o.off())
                } else {
                    setTimeout(() => this.inc(), interval)
                    this.name = `observing count -> ${interval} @ ${this.count}`
                }
            })
            return o
        },
        observe(observer, ...args) {
            return observe(observer, this, args)
        },
        when(key, cond, fn) {
            const o = observe(() => cond(this[key]) && fn(key, this[key], o))
            return o
        }
    }
}

export const app = bitbox(App)
export const one = bitbox(One)

export function foo(box) {
    return {
        count: box.count,
        items: box.items,
        addItem(item) {
            return this.items.push(item)
        }
    }
}

export function bar(box) {
    return {
        foo: box.state(foo),
        one: box.state(one)
    }
}

export function baz(box) {
    return {
        app: box(app),
        one: box.state(one),
        foo: box.state(foo),
        name: box.state.name,
        mount(component) {
            return this.app.mount(component, "#root")
        },
        observe(fn) {
            return bitbox.observe(() => fn(this))
        }
    }
}

export function Title(box, { create }) {
    return [
        {
            value: box.state.name,
            views: box.state.count,
            xxx: box.state(
                box({
                    items: box(One).items,
                    add() {
                        console.log(`xxx`, this.items.push(Date()))
                    }
                })
            )
        },
        function Title(props) {
            console.info({ component: "<Title />", props })
            return props
        }
    ]
}

export const appbox = app(store)
export const bazbox = bitbox(baz)
export const onebox = bazbox.one(store)

bazbox(store).mount(Counter)

//appbox.mount(Counter, "#root")
