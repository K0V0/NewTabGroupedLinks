import { getDragPayload, setDragPayload } from "./dragPayload";
import { Store } from "../store/store";

export function attachSubgroupDnD(
    el: HTMLElement,
    params: {
        subgroupId: string;
        groupId: string;
        index: number;
        store: Store;
    }
) {
    el.draggable = true;

    el.addEventListener("dragstart", e => {
        setDragPayload(e, {
            kind: "subgroup",
            subgroupId: params.subgroupId,
            groupId: params.groupId
        });
    });

    el.addEventListener("dragover", e => e.preventDefault());

    el.addEventListener("drop", e => {
        e.preventDefault();
        const payload = getDragPayload(e);
        if (!payload) return;

        if (payload.kind === "link") {
            params.store.moveLink(payload.linkId, payload.groupId, {
                subgroupId: params.subgroupId
            });
        }

        if (payload.kind === "subgroup") {
            params.store.reorderSubgroupById(
                params.groupId,
                payload.subgroupId,
                params.index
            );
        }
    });
}
