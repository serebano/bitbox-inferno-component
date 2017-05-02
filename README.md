# bitbox-inferno-component
https://serebano.github.io/bitbox-inferno-component/


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
            <section>
                <h3>Hello {value}!</h3>
                <input onInput={onInput} value={value} />
            </section>
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
            <section>
                <h1>{count}</h1>
                <button onClick={inc}>+ inc</button>
                <button onClick={dec}>- dec</button>
            </section>
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

```
yarn install
yarn start
```
