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
                    borderBottom: "1px solid rgba(226,192,141,0.9)",
                    transition: "opacity 0.3s ease",
                    opacity: observer.keys ? 1 : 0.8
                }}>
                {component}
            </div>
            <div
                style={{
                    borderBottom: "1px solid rgba(255,255,255,1)",
                    fontFamily: 'Consolas, "Liberation Mono", Menlo, Courier, monospace',
                    background: "rgba(226,192,141,0.1)",
                    transition: "opacity 0.3s",
                    opacity: observer.keys ? 1 : 0.2,
                    padding: 8,
                    lineHeight: 1.4,
                    fontSize: 13
                }}>
                <div>
                    <b style={{ color: "#c00" }}>{"<"}{observer.name} {" />"}</b>
                    {" "}
                    <span>runs(<b>{changed}</b>) </span>
                    <button onClick={toggle}>
                        {observer.status}
                    </button>
                    <code style={{ display: "block", marginTop: 4 }}>
                        <pre style={{ margin: 0 }}>
                            [{changes.map(path => path.join(".")).join(", ")}]
                        </pre>
                    </code>

                    <pre style={{ margin: 0 }}>
                        {com.map.toString()}
                    </pre>
                </div>
                <code style={{ display: "block", marginTop: 4 }}>
                    <pre style={{ margin: 0 }}>
                        <span>keys(<b>{paths.length}</b>) </span>
                        [{paths.map(path => path.join(".")).join(", ")}]
                    </pre>
                </code>
            </div>
        </div>
    )
}

export default Observer
