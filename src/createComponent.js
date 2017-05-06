import Component from "inferno-component"
import createElement from "./createElement"

export default function hoc(box, { observe, create }) {
    return box(target => {
        return function createComponent([map, fn]) {
            const props = box(create.box(map))

            const component = props => fn(props, createElement)

            class Observer extends Component {
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

            Observer.displayName = `Observer(${fn.name})`
            Observer.props = props

            return Observer
        }
    })
}

// export default function create(input) {
//     return Array.isArray(input) ? factory(...input) : factory(input.map, input)
// }
//
// function factory(mapping = {}, component) {
//     const map = bitbox.map(mapping, {
//         state: bitbox("context", "state")
//     })
//     const box = bitbox(map)
//
//     class bitboxComponent extends Component {
//         componentWillMount() {
//             const observe = bitbox(map, target => {
//                 return bitbox.observe(render => {
//                     return (
//                         (render && component(target, createElement)) ||
//                         (this.observer && this.forceUpdate())
//                     )
//                 })
//             })
//
//             this.observer = observe(this)
//             this.observer.name = component.name
//         }
//         componentWillUnmount() {
//             this.observer.off()
//         }
//         shouldComponentUpdate() {
//             return false
//         }
//         render() {
//             return create.debug === true || this.props.debug === true
//                 ? Observer(this, createElement)
//                 : this.observer.run(true)
//         }
//     }
//
//     bitboxComponent.map = map
//     bitboxComponent.box = box
//     bitboxComponent.displayName = `component(${component.displayName || component.name})`
//     bitboxComponent.toString = () => `function ${component.displayName || component.name}(props) {}`
//
//     return bitboxComponent
// }
