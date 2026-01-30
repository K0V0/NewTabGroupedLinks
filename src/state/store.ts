import { AppState, Group, Link } from "./models";
import { uid } from "./id";
import {storage} from "./chromeStorage";

type Listener = (state: AppState) => void;
const STORAGE_KEY = "workspace_state";

class Store {
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
}

export const store = new Store();
