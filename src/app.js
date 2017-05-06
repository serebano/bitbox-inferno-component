import Component from "inferno-component"
import infernoCreateElement from "inferno-create-element"
import render from "./render"

export default function app(box, { create, resolve, observe }) {
    return {
        target: box,
        box([map, fn]) {
            return resolve(this.target, {
                props: create.box(map).map,
                component(props) {
                    return fn(this.props, infernoCreateElement)
                }
            })
        },
        map(mapping) {
            return create.box(mapping)
        },
        hoc([map, fn]) {
            const props = create.box(map)(this.target)
            const component = props => fn(props, infernoCreateElement)

            class ObserverComponent extends Component {
                componentWillMount() {
                    const render = this.render
                    const initialRender = (...args) => {
                        let result
                        this.observer = observe(() => {
                            if (this.render === initialRender) result = render.apply(this, args)
                            else this.forceUpdate()
                        })
                        this.render = render
                        return result
                    }

                    this.render = initialRender
                }
                componentWillUnmount() {
                    this.observer.off()
                }
                render() {
                    return component(props)
                }
            }

            ObserverComponent.displayName = `ObserverComponent(${fn.name})`
            ObserverComponent.props = props

            return ObserverComponent
        },
        mount(component, selector) {
            return render(infernoCreateElement(this.hoc(component)), selector, true)
        },
        render(...args) {
            return observe(() => render(this.component(this.props), ...args))
        }
    }
}
