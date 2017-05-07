/** @jsx h */
import bitbox, { observable } from "bitbox"
import Inferno from "../app"
import One from "./one"
import Counter from "./components/counter"

export const store = {
    state: observable({
        name: "Scooby Doo",
        count: 0
    })
}

export function Foo(box) {
    return {
        count: box.count,
        items: box.items,
        addItem(item) {
            return this.items.push(item)
        }
    }
}

export function Bar(box) {
    return {
        foo: box.state(Foo),
        one: box.state(One)
    }
}

export function Baz(box) {
    return {
        app: box(Inferno),
        one: box.state(One),
        foo: box.state(Foo),
        name: box.state.name,
        mount(component) {
            return this.app.mount(component, "#root")
        },
        observe(fn) {
            return bitbox.observe(() => fn(this))
        }
    }
}

export const app = bitbox(Inferno)(store)
export const one = bitbox(One)(store)

export const foo = bitbox(Foo)
export const bar = bitbox(Bar)
export const baz = bitbox(Baz)

baz(store).mount(Counter)

//appbox.mount(Counter, "#root")
