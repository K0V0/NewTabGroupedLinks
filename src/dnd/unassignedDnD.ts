import { getDragPayload } from "./dragPayload";
import { Store } from "../store/store";

export function attachUnassignedDnD(
    el: HTMLElement,
    groupId: string,
    store: Store
) {
    el.addEventListener("dragover", e => e.preventDefault());

    el.addEventListener("drop", e => {
        e.preventDefault();
        const payload = getDragPayload(e);
        if (!payload || payload.kind !== "link") return;

        store.moveLink(payload.linkId, payload.groupId, {});
    });
}
