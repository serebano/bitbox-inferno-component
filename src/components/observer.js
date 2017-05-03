/** @jsx h */

function Observer(com, h) {
    const observer = com.observer
    observer.status = !observer.keys ? "On" : "Off"

    const toggle = () => {
        if (observer.keys) {
            observer.off()
            com.forceUpdate()
        } else {
            observer.on()
        }
    }

    const component = observer.run(true)
    const { paths, changes, changed } = observer

    return (
        <div>
            <div
                style={{
                    borderBottom: "1px solid rgba(255,255,255,0.3)",
                    transition: "opacity 0.3s ease",
                    opacity: observer.keys ? 1 : 0.3
                }}>
                {component}
            </div>
            <div
                style={{
                    borderTop: "1px solid rgba(226,192,141,0.8)",
                    fontFamily: 'Consolas, "Liberation Mono", Menlo, Courier, monospace',
                    background: observer.keys
                        ? "rgba(234, 255, 234, 0.38)"
                        : "rgba(226,192,141,0.1)",
                    opacity: 0.7,
                    padding: 16,
                    fontSize: 12
                }}>
                <div>
                    <b>{observer.name}</b>
                    <button onClick={toggle}>
                        {observer.status}
                    </button>
                    <pre style={{ margin: 0 }}>
                        {String(com.component)}
                    </pre>
                </div>
                <code style={{ display: "block", marginTop: 8 }}>
                    <pre style={{ margin: 0 }}>
                        <span>keys(<b>{paths.length}</b>) </span>
                        {JSON.stringify(paths.map(path => path.join(".")), null, 0)}
                    </pre>
                </code>
                <code style={{ display: "block", marginTop: 8 }}>
                    <pre style={{ margin: 0 }}>
                        <span>runs(<b>{changed}</b>) </span>
                        {JSON.stringify(changes.map(path => path.join(".")), null, 0)}
                    </pre>
                </code>
            </div>
        </div>
    )
}

export default Observer
