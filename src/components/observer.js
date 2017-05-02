/** @jsx h */

function Observer(observer, h) {
    return (
        <div>
            <div>{observer.run(true)}</div>
            <div
                style={{
                    background: "rgba(226,192,141,0.2)",
                    opacity: 0.7,
                    padding: 8,
                    fontSize: 13
                }}>
                <div><b>{observer.name}</b></div>
                <code style={{ display: "block", marginTop: 8 }}>
                    <pre style={{ margin: 0 }}>
                        <span>paths({observer.paths.length}) </span>
                        {JSON.stringify(observer.paths.map(path => path.join(".")), null, 2)}
                    </pre>
                </code>
                <code style={{ display: "block", marginTop: 8 }}>
                    <pre style={{ margin: 0 }}>
                        <span>changes({observer.changed}) </span>
                        {JSON.stringify(observer.changes.map(path => path.join(".")), null, 2)}
                    </pre>
                </code>
            </div>
        </div>
    )
}

export default Observer
