/** @jsx h */
import Component, { render } from "./main"

const Hello = [
    function bit({ state, args }, { set, toUpper }) {
        return {
            value: state.name,
            onInput: set(state.name, args[0].target.value(toUpper))
        }
    },
    function box({ onInput, value }, h) {
        return (
            <div style={{ padding: 16, marginTop: 16, background: "#f3f8ff" }}>
                <h1 style={{ margin: "0 0 8px 0" }}>Hello {value}!</h1>
                <input onInput={onInput} value={value} />
            </div>
        )
    }
]

const Counter = [
    function({ state }, { set, inc, dec }) {
        return {
            count: state.count(String),
            inc: set(state.count, state.count(inc)),
            dec: set(state.count, state.count(inc))
        }
    },
    function Counter({ count, inc, dec }, h) {
        return (
            <div style={{ padding: 16, marginTop: 16, background: "#eaffea" }}>
                <h1 style={{ margin: "0 0 8px 0" }}>count = {count}</h1>
                <button onClick={inc}>+ inc</button>
                <button onClick={dec}>- dec</button>
            </div>
        )
    }
]

function App(props, h) {
    return (
        <section style={{ fontFamily: "monospace" }}>
            <Hello />
            <Counter />
        </section>
    )
}

Component.debug = true

render(
    Component(App, {
        state: {
            name: "Scooby Doo",
            count: 0
        }
    }),
    "#root"
)
