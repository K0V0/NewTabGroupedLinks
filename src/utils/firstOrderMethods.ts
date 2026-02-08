export function uid(): string {
    return crypto.randomUUID();
}

export function qsAll<T extends Element>(selector: string, parent: Element = document.body): T[] {
    return Array.from(parent.querySelectorAll(selector)) as T[];
}

export function handleRendering<T>(
    parent: HTMLElement,
    items: readonly T[],
    getKey: (item: T) => string,
    create: (item: T) => HTMLElement
) {

    // Snapshot existing elements in actual rendered HTML template
    const existing = new Map<string, HTMLElement>(
        Array
            .from(parent.children)
            .map(el => [el.id, el as HTMLElement]));

    // Loop over data incoming from viewModel
    for (const item of items) {
        const key = getKey(item);

        // Create & render missing elements
        if (!existing.has(key)) {
            const el = create(item);
            el.id = key;
            parent.appendChild(el);
        }

        // Mark element existing in rendered HTML template as handled
        existing.delete(key);
    }

    // Remove leftover elements that are not part of new incoming data from HTML template
    existing.forEach(el => el.remove());
}