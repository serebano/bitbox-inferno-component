export default function one(box, { print, observable, observe }) {
    return {
        count: box.count,
        name: box.name,
        items: box(target => {
            if (!target.items) {
                target.items = observable([])
                observe(print, undefined, target.items)
            }
            return target.items
        }),
        add(item) {
            this.items.push(item)
            return this.items
        },
        inc() {
            this.count++
            return this
        },
        dec() {
            this.count--
            return this
        },
        run(interval = 1000) {
            const o = this.observe(() => {
                if (this.count >= 100) {
                    this.name = `observer off at: ${this.count}`
                    print(o.off())
                } else {
                    setTimeout(() => this.inc(), interval)
                    this.name = `observing count -> ${interval} @ ${this.count}`
                }
            })
            return o
        },
        observe(observer, ...args) {
            return observe(observer, this, args)
        },
        when(key, cond, fn) {
            const o = observe(() => cond(this[key]) && fn(key, this[key], o))
            return o
        }
    }
}
