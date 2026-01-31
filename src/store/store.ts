import { AppState, Group, Link } from "../state/models";
import { uid } from "../state/id";
import {storage} from "./chromeStorage";

type Listener = (state: AppState) => void;
const STORAGE_KEY = "workspace_state";

export class Store {
    private state!: AppState;
    private listeners = new Set<Listener>();

    async init(initialState: AppState) {
        const saved = await storage.get<AppState>(STORAGE_KEY);
        this.state = saved ?? initialState;
        this.emit();
    }

    private emit() {
        for (const l of this.listeners) l(this.state);
        this.save();
    }

    private async save() {
        await storage.set(STORAGE_KEY, this.state);
    }

    getState() {
        return this.state;
    }

    subscribe(listener: (state: AppState) => void) {
        this.listeners.add(listener);
        return () => this.listeners.delete(listener);
    }

    /* ================== CRUD ================== */

    createGroup(title: string) {
        const id = uid();
        const envId = this.state.activeEnvironmentId;

        const group: Group = {
            id,
            environmentId: envId,
            title,
            items: []
        };

        this.state.groups[id] = group;
        this.state.environments[envId].groups.push(id);
        this.emit();
    }

    renameGroup(groupId: string, title: string) {
        const group = this.state.groups[groupId];
        if (!group) return;
        group.title = title;
        this.emit();
    }

    deleteGroup(groupId: string) {
        const group = this.state.groups[groupId];
        if (!group) return;

        const env = this.state.environments[group.environmentId];
        env.groups = env.groups.filter(id => id !== groupId);

        // TODO: delete links inside group later
        delete this.state.groups[groupId];

        this.emit();
    }

    createLink(groupId: string, title: string, url: string) {
        const id = uid();

        const link: Link = {
            id,
            title,
            url
        };

        this.state.links[id] = link;
        this.state.groups[groupId].items.push({
            type: "link",
            linkId: id
        });

        this.emit();
    }

    deleteLink(groupId: string, linkId: string) {
        const group = this.state.groups[groupId];
        if (!group) return;

        group.items = group.items.filter(
            i => !(i.type === "link" && i.linkId === linkId)
        );

        delete this.state.links[linkId];
        this.emit();
    }

    /* ================== Drag & Drop / Reorder ================== */

    moveLink(linkId: string, fromGroupId: string, to: { subgroupId?: string; toIndex?: number }) {
        const group = this.state.groups[fromGroupId];
        if (!group) return;

        // odstrániť link zo starej pozície
        group.items = group.items.filter(i => !(i.type === "link" && i.linkId === linkId));

        // cieľová položka
        const linkItem = { type: "link", linkId };

        if (to.subgroupId) {
            const subgroup = this.state.subgroups[to.subgroupId];
            if (!subgroup) return;
            // vložiť do správneho indexu
            const idx = to.toIndex ?? subgroup.links.length;
            subgroup.links.splice(idx, 0, linkId);
        } else {
            // nezaradené v rámci group.items
            const idx = to.toIndex ?? group.items.length;
            console.log("FIXME !!!");
            //group.items.splice(idx, 0, linkItem);
        }

        this.emit();
    }

    reorderSubgroup(groupId: string, fromIndex: number, toIndex: number) {
        const group = this.state.groups[groupId];
        if (!group) return;

        const [subgroup] = group.items.splice(fromIndex, 1);
        group.items.splice(toIndex, 0, subgroup);

        this.emit();
    }

    reorderSubgroupById(groupId: string, subgroupId: string, toIndex: number) {
        const group = this.state.groups[groupId];
        if (!group) return;

        const fromIndex = group.items.findIndex(
            i => i.type === "subgroup" && i.subgroupId === subgroupId
        );
        if (fromIndex === -1) return;

        const [item] = group.items.splice(fromIndex, 1);
        group.items.splice(toIndex, 0, item);

        this.emit();
    }

    reorderLinksInSubgroup(subgroupId: string, fromIndex: number, toIndex: number) {
        const subgroup = this.state.subgroups[subgroupId];
        if (!subgroup) return;

        const [linkId] = subgroup.links.splice(fromIndex, 1);
        subgroup.links.splice(toIndex, 0, linkId);

        this.emit();
    }
}

export const store = new Store();
