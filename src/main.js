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

    const component = bitbox.create(mapping, {
        props: ["props"],
        state: ["context", "state"],
        signals: ["context", "signals"],
        observer: ["observer"]
    })(props => view(props, createElement))

    const Component = HOC.observable ? statefull(component) : stateless(component)
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

function statefull(component) {
    return class BBComponent extends Component {
        componentWillMount() {
            this.observer = bitbox.observe(this, function(target, render) {
                return render ? component(target) : target.observer && target.forceUpdate()
            })
            this.observer.mapping = component.$[0]
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
                ? Observer(this.observer, createElement)
                : this.observer.run(true)
        }
    }
}

export const render = (component, selector) => {
    HOC.devtools && require("inferno-devtools")
    Inferno.render(component, document.querySelector(selector))
}
