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
        console.log("dragstart event: group: " + p.groupId + ", link: " + p.linkId + ", index: " + p.index);
        console.log("target: " + e.target);
        setDragPayload(e, {
            kind: "link",
            linkId: p.linkId,
            groupId: p.groupId,
            fromSubgroupId: p.subgroupId
        });
    });

    el.addEventListener("dragover", e => e.preventDefault());

    el.addEventListener("drop", e => {
        console.log("drop event: group: " + p.groupId + ", link: " + p.linkId + ", index: " + p.index);
        console.log("target: " + e.target);
        e.preventDefault();
        const payload = getDragPayload(e);
        if (!payload || payload.kind !== "link") return;

        p.store.moveLink(payload.linkId, payload.groupId, {
            subgroupId: p.subgroupId,
            toIndex: p.index
        });
    });
}
