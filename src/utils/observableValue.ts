import isEqual from 'fast-deep-equal';

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
        console.log("State is calling to be set");
        console.log(this.value);
        console.log(value);
        if (isEqual(this.value, value)) return;
        console.log("State is going to be set");
        this.value = value
        this.subs.forEach(fn => fn(value))
    }

    subscribe(fn: Subscriber<T>) {
        this.subs.add(fn)
        fn(this.value)
        return () => this.subs.delete(fn)
    }

    map<U>(selector: (value: T) => U): ObservableValue<U> {
        const mapped = new ObservableValue<U>(selector(this.value));
        this.subscribe(value => {
            mapped.set(selector(value));
        });
        return mapped;
    }

    pick<K extends keyof T>(...keys: K[]): ObservableValue<Pick<T, K>> {
        return this.map(value => {
            const picked = {} as Pick<T, K>;
            keys.forEach(k => (picked[k] = value[k]));
            return picked;
        });
    }
}
