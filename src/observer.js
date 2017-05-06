import Component from "inferno-component"
import { observe } from "bitbox"

export default class ObserverComponent extends Component {
    componentWillMount() {
        const render = this.render
        const initialRender = (...args) => {
            let result
            this.observer = observe(() => {
                if (this.render === initialRender) {
                    result = render.apply(this, args)
                } else {
                    this.forceUpdate()
                }
            })
            this.render = render

            return result
        }

        this.render = initialRender
    }
    componentWillUnmount() {
        this.observer.off()
    }
}
