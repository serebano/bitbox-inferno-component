import createElement from "inferno-create-element"
import createComponent from "./createComponent"

export default function(tag, ...rest) {
    return Array.isArray(tag)
        ? createElement(createComponent(tag), ...rest)
        : typeof tag === "function" && !tag.resolved && typeof tag.prototype.render === "undefined"
              ? createElement(createComponent(tag), ...rest)
              : createElement(...arguments)
}
