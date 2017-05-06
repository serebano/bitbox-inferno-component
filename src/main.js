import Component from "inferno-component"
import createElement from "./createElement"
import createComponent from "./createComponent"
import render from "./render"

export default function InfernoComponent(component, context) {
    if (arguments.length === 1) return createComponent(component)

    createComponent.debug = InfernoComponent.debug

    return createElement(
        class ContextProvider extends Component {
            getChildContext() {
                return this.props.context
            }
            render() {
                return this.props.children
            }
        },
        { context },
        createElement(component)
    )
}

export function component(com, ...args) {
    return target =>
        (args.length
            ? render(InfernoComponent(com, target), ...args)
            : InfernoComponent(com, target))
}
export { createComponent, createElement, render }
