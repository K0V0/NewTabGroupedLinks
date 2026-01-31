import { attachUnassignedDnD } from "../dnd/unassignedDnD";
import { renderLink } from "./renderLink";
import { renderSubgroup } from "./renderSubgroup";
import {Store} from "../store/store";
import {Group, LinkItem, SubgroupItem} from "../state/models";

export function renderGroup(group: Group, store: Store): HTMLElement {
    const el = document.createElement("div");
    el.className = "group";

    const unassigned = document.createElement("div");
    unassigned.className = "unassigned";

    attachUnassignedDnD(unassigned, group.id, store);

    group.items.forEach((item: LinkItem | SubgroupItem, index: number) => {
        if (item.type === "link") {
            unassigned.appendChild(
                renderLink(
                    item.linkId,
                    {
                        groupId: group.id,
                        store,
                        index
                    }
                )
            );
        }

        if (item.type === "subgroup") {
            el.appendChild(
                renderSubgroup(
                    {
                        id: item.subgroupId,
                        links: [] //TODO odkial z pice tu mam najebat linky
                    },
                    {
                        groupId: group.id,
                        store,
                        index
                    }
                )
            );
        }
    });

    el.appendChild(unassigned);
    return el;
}
