/** @jsx h */

function Observer(observer, h) {
    return (
        <div style={{ border: "1px solid rgba(0,0,0,0.2)" }}>
            <div style={{ boxShadow: "0 0 5px rgba(0,0,0,0)" }}>{observer.run(true)}</div>
            <div
                style={{
                    background: "rgba(226,192,141,0.2)",
                    borderTop: "1px solid rgba(226,192,141,0.8)",
                    fontFamily: 'Consolas, "Liberation Mono", Menlo, Courier, monospace',
                    opacity: 0.7,
                    padding: 16,
                    fontSize: 12
                }}>
                <div>
                    <b>{observer.name}</b>
                    <pre style={{ margin: 0 }}>
                        {observer.mapping.displayName}
                    </pre>
                </div>
                <code style={{ display: "block", marginTop: 8 }}>
                    <pre style={{ margin: 0 }}>
                        <span>keys(<b>{observer.paths.length}</b>) </span>
                        {JSON.stringify(observer.paths.map(path => path.join(".")), null, 2)}
                    </pre>
                </code>
                <code style={{ display: "block", marginTop: 8 }}>
                    <pre style={{ margin: 0 }}>
                        <span>runs(<b>{observer.changed}</b>) </span>
                        {JSON.stringify(observer.changes.map(path => path.join(".")), null, 2)}
                    </pre>
                </code>
            </div>
        </div>
    )
}

export default Observer
