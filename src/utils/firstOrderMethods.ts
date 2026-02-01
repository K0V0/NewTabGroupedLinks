export function uid(): string {
    return crypto.randomUUID();
}

export function qsAll<T extends Element>(selector: string, parent: Element = document.body): T[] {
    return Array.from(parent.querySelectorAll(selector)) as T[];
}