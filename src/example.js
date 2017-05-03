/** @jsx h */
import Component, { render } from "./main"

export const Hello = [
    function bit({ state, args }, { set, toUpper }) {
        return {
            value: state.name(),
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

export const Counter = [
    function({ state }, { set, inc, dec }) {
        return {
            count: state.count(String),
            inc: set(state.count, state.count(inc)),
            dec: set(state.count, state.count(inc)),
            run: set(
                state.runId,
                state(
                    state =>
                        (!state.runId
                            ? setInterval(() => state.count++)
                            : clearInterval(state.runId))
                )
            )
        }
    },
    function Counter({ count, inc, dec, run }, h) {
        return (
            <div style={{ padding: 16, marginTop: 16, background: "#f4f4f4" }}>
                <h1 style={{ margin: "0 0 8px 0" }}>count = {count}</h1>
                <button onClick={inc}>+ inc</button>
                <button onClick={dec}>- dec</button>
                <button onClick={run}>run</button>
            </div>
        )
    }
]

export function App(props, h) {
    return (
        <section style={{ fontFamily: "monospace" }}>
            <Hello />
            <Counter />
        </section>
    )
}

export const store = {
    state: {
        name: "Scooby Doo",
        count: 0
    }
}

Component.debug = true
Component.devtools = true

export const app = render(Component(App, store), "#root")
