type Subscriber<T> = (value: T) => void

export class ObservableValue<T> {
    private value: T
    private subs = new Set<Subscriber<T>>()

    constructor(initial: T) {
        this.value = initial
    }

    get() {
        return this.value
    }

    set(value: T) {
        this.value = value
        this.subs.forEach(fn => fn(value))
    }

    subscribe(fn: Subscriber<T>) {
        this.subs.add(fn)
        fn(this.value)
        return () => this.subs.delete(fn)
    }
}
