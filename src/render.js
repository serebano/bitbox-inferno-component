import Inferno from "inferno"

export default function render(component, selector, devtools) {
    if (devtools) require("inferno-devtools")
    Inferno.render(component, document.querySelector(selector))

    return component
}
