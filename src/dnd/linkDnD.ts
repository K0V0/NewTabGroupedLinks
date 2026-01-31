import { setDragPayload, getDragPayload } from "./dragPayload";
import { Store } from "../store/store";

interface LinkDnDParams {
    linkId: string;
    groupId: string;
    store: Store;
    subgroupId?: string;
    index?: number;
}

export function attachLinkDnD(el: HTMLElement, p: LinkDnDParams) {
    el.draggable = true;

    el.addEventListener("dragstart", e => {
        setDragPayload(e, {
            kind: "link",
            linkId: p.linkId,
            groupId: p.groupId,
            fromSubgroupId: p.subgroupId
        });
    });

    el.addEventListener("dragover", e => e.preventDefault());

    el.addEventListener("drop", e => {
        e.preventDefault();
        const payload = getDragPayload(e);
        if (!payload || payload.kind !== "link") return;

        p.store.moveLink(payload.linkId, payload.groupId, {
            subgroupId: p.subgroupId,
            toIndex: p.index
        });
    });
}
