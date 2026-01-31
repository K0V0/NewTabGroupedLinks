import { attachSubgroupDnD } from "../dnd/subgroupDnD";
import { renderLink } from "./renderLink";
import {Store} from "../store/store";

export function renderSubgroup(
    subgroup: { id: any; links: any[]; },
    params: { groupId: string; store: Store; index: number }
): HTMLElement {
    const el = document.createElement("div");
    el.className = "subgroup";

    attachSubgroupDnD(el, {
        subgroupId: subgroup.id,
        groupId: params.groupId,
        index: params.index,
        store: params.store
    });

    subgroup.links.forEach((linkId, i) => {
        el.appendChild(
            renderLink(linkId, {
                groupId: params.groupId,
                subgroupId: subgroup.id,
                index: i,
                store: params.store
            })
        );
    });

    return el;
}
