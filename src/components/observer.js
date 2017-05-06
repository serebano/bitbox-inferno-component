/** @jsx h */

function Observer({ observer }, h) {
    const { paths, changes, changed } = observer
    const status = !observer.keys ? "On" : "Off"
    const toggle = () => {
        if (observer.keys) {
            observer.off()
            observer.run(false)
        } else {
            observer.on()
        }
    }

    return (
        <div>
            <div
                style={{
                    borderBottom: "1px solid rgba(226,192,141,0.9)",
                    transition: "opacity 0.3s ease",
                    opacity: observer.keys ? 1 : 0.8
                }}>
                {observer.run(true)}
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
                    <span>

                        <span style={{ color: "#c00" }}>

                            <b>{"<"}{observer.name}</b>
                            (
                            <span style={{ color: "#444", opacity: 0.7, margin: "0 2px" }}>
                                {changed}
                            </span>
                            )
                        </span>
                        {" "}
                        {changes.map(path => `${path.join(".")}`).join(" ")}
                        {" "}
                        <b style={{ color: "#c00" }}>{" />"}</b>
                    </span>
                    {" "}
                    <button onClick={toggle}>
                        {status}
                    </button>
                </div>
                <code style={{ display: "block", marginTop: 4 }}>
                    <pre style={{ margin: 0 }}>
                        [{paths.map(path => path.join(".")).join(", ")}]
                    </pre>
                </code>
            </div>
        </div>
    )
}

export default Observer
