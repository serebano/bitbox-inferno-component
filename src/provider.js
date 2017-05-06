import Component from "inferno-component"

class ContextProvider extends Component {
    getChildContext() {
        return this.props.context
    }
    render() {
        return this.props.children
    }
}

export default ContextProvider
