function Title(box, { create }) {
    return [
        {
            value: box.state.name,
            views: box.state.count,
            xxx: box.state(
                box({
                    items: box(One).items,
                    add() {
                        console.log(`xxx`, this.items.push(Date()))
                    }
                })
            )
        },
        function Title(props) {
            console.info({ component: "<Title />", props })
            return props
        }
    ]
}

export default Title
