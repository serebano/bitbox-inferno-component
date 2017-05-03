import bitbox from "bitbox"
import { is } from "bitbox/utils"
import CreateElement from "inferno-create-element"
import Component from "inferno-component"
import Inferno from "inferno"
import Observer from "./components/observer"

HOC.debug = false
HOC.observable = true

export default function HOC(component, target) {
    if (target) {
        return createElement(
            class BBContainer extends Component {
                getChildContext() {
                    return {
                        state: bitbox.observable(this.props.state),
                        signals: this.props.signals
                    }
                }
                render() {
                    return this.props.children
                }
            },
            target,
            createElement(component, target.props)
        )
    }

    return createComponent(component)
}

export function createComponent(input) {
    const [mapping = {}, view] = is.func(input) ? [input.map, input] : input

    const map = (view.map = bitbox.map(mapping, {
        //args: ["args"],
        props: ["props"],
        state: ["context", "state"],
        signals: ["context", "signals"],
        observer: ["observer"]
    }))

    const box = (view.box = bitbox(map, function component(props) {
        return view(props, createElement)
    }))

    const Component = HOC.observable ? statefull(box, map) : stateless(box)
    Component.displayName = `component(${view.displayName || view.name})`

    return Component
}

export function createElement(tag, ...rest) {
    return is.array(tag)
        ? CreateElement(createComponent(tag), ...rest)
        : is.func(tag) && is.undefined(tag.prototype.render)
              ? CreateElement(createComponent(tag), ...rest)
              : CreateElement(tag, ...rest)
}

function stateless(component) {
    return function StatelessComponent(props, context) {
        return component({ props, context })
    }
}

function statefull(component, map) {
    return class BBComponent extends Component {
        componentWillMount() {
            this.component = component
            this.observer = bitbox.observe(render => {
                return render ? component(this) : this.observer && this.forceUpdate()
            })

            this.observer.name = BBComponent.displayName
        }
        componentWillUnmount() {
            this.observer.off()
        }
        shouldComponentUpdate() {
            return false
        }
        render() {
            return HOC.debug === true || this.props.debug === true
                ? Observer(this, createElement)
                : this.observer.run(true)
        }
    }
}

export const render = (component, selector) => {
    HOC.devtools && require("inferno-devtools")
    Inferno.render(component, document.querySelector(selector))
}
