export default [
    function hello({ state }) {
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
