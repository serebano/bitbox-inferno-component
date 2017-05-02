# bitbox-inferno-component

```js
/** @jsx h */
import Component, { render } from "bitbox-inferno-component"

const Hello = [
    function bit({ state, args }, { set, toUpper }) {
        return {
            value: state.name,
            onInput: set(state.name, args[0].target.value(toUpper))
        }
    },
    function box({ onInput, value }, h) {
        return (
            <div style={{ padding: 16 }}>
                <h3>Hello {value}!</h3>
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
            dec: set(state.count, state.count(inc)),
        }
    },
    function Counter({ count, inc, dec }, h) {
        return (
            <main
                <h1>{count}</h1>
                <button onClick={inc}>+ inc</button>
                <button onClick={dec}>- dec</button>
            </main>
        )
    }
]

function App(props, h) {
	return (
		<section>
			<Hello />
			<Counter />
		</section>
	)
}

render(Component(App, {
	state: {
		name: 'Scooby Doo',
		count: 0
	}
}), "#root")

```
