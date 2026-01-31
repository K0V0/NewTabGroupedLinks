export function initDnD() {
    // zakáže default drag na obrázkoch / linkoch
    document.addEventListener("dragstart", e => {
        const target = e.target as HTMLElement;
        if (target.tagName === "A") {
            e.preventDefault();
        }
    });
}