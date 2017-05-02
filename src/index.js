import bitbox from "bitbox"
import { is } from "bitbox/utils"
import CreateElement from "inferno-create-element"
import Component from "inferno-component"
import Inferno from "inferno"
import Observer from "./components/observer"

export function createElement(tag, ...rest) {
    return is.array(tag)
        ? CreateElement(createComponent(tag), ...rest)
        : is.func(tag) && is.undefined(tag.prototype.render)
              ? CreateElement(props => tag(props, createElement), ...rest)
              : CreateElement(tag, ...rest)
}

HOC.rootmap = {
    props: ["props"],
    state: ["context", "state"],
    signals: ["context", "signals"],
    observer: ["observer"]
}

export function createComponent([mapping, comp]) {
    const component = bitbox(["$map", mapping, HOC.rootmap], [comp, createElement])

    const Component = HOC.observable ? statefull(component) : stateless(component)
    Component.displayName = `Component(${comp.displayName || comp.name})`
    Component.component = component

    return Component
}

function stateless(component) {
    return function(props, context) {
        return component({ props, context })
    }
}

function statefull(component) {
    return class Statefull extends Component {
        componentWillMount() {
            this.observer = bitbox.observe(this, function(target, render) {
                return render ? component(target) : target.observer && target.forceUpdate()
            })
            this.observer.name = Statefull.displayName
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

function HOC(component, target) {
    if (target) {
        return createElement(
            class extends Component {
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

export const render = (component, selector) =>
    Inferno.render(component, document.querySelector(selector))

HOC.debug = false
HOC.observable = true
HOC.createElement = createElement
HOC.createComponent = createComponent
HOC.render = render
window.HOC = HOC
export default HOC
