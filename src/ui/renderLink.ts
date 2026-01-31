import { attachLinkDnD } from "../dnd/linkDnD";
import { Store } from "../store/store";

export function renderLink(
    linkId: string,
    params: {
        groupId: string;
        store: Store;
        subgroupId?: string;
        index?: number;
    }
): HTMLElement {
    const el = document.createElement("div");
    el.className = "link";
    el.textContent = linkId;

    attachLinkDnD(el, {
        linkId,
        groupId: params.groupId,
        subgroupId: params.subgroupId,
        index: params.index,
        store: params.store
    });

    return el;
}
