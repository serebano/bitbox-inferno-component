/** @jsx h */

export default [
    function app(box) {
        return {
            items: box.items
        }
    },
    function App(props, h) {
        return (
            <section style={{ fontFamily: "monospace" }}>
                <Hello />
                <Counter />
            </section>
        )
    }
]
