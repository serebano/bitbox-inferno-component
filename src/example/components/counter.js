/** @jsx h */

export default [
    function counter({ state }) {
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
