import { attachUnassignedDnD } from "../dnd/unassignedDnD";
import { renderLink } from "./renderLink";
import { renderSubgroup } from "./renderSubgroup";
import {Store} from "../store/store";

export function renderGroup(group: { id: string; items: { type: string; linkId: string; subgroup: any; }[]; }, store: Store): HTMLElement {
    const el = document.createElement("div");
    el.className = "group";

    const unassigned = document.createElement("div");
    unassigned.className = "unassigned";

    attachUnassignedDnD(unassigned, group.id, store);

    group.items.forEach((item: { type: string; linkId: string; subgroup: any; }, index: any) => {
        if (item.type === "link") {
            unassigned.appendChild(
                renderLink(item.linkId, {
                    groupId: group.id,
                    store,
                    index
                })
            );
        }

        if (item.type === "subgroup") {
            el.appendChild(
                renderSubgroup(item.subgroup, {
                    groupId: group.id,
                    store,
                    index
                })
            );
        }
    });

    el.appendChild(unassigned);
    return el;
}
