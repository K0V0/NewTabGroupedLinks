import {AppState, Environment, Group, Link} from "../entity/AppStateEntity";
import {uid} from "../../utils/id";
import {ChromeStorageWrapper} from "../datasource/chromeStorage/chromeStorageWrapper";
import {AppStateRepositoryUtils} from "./AppStateRepositoryUtils";
import {ObservableValue} from "../../utils/observableValue";
import {appStateInit} from "../datasource/init/AppStateInit";

// type Listener = (state: AppState) => void;
const STORAGE_KEY = "workspace_state";

export class AppStateRepository {

    private state!: AppState;
    readonly state$ = new ObservableValue<AppState>(appStateInit);

    private datasource = new ChromeStorageWrapper()
    private repositoryUtils: AppStateRepositoryUtils = new AppStateRepositoryUtils(this.state);

    public async init(initialState: AppState) {
        const saved = await this.datasource.get<AppState>(STORAGE_KEY);
        this.state = saved ?? initialState;
        this.state$.set(this.state);
        await this.save();
    }

    private async save() {
        await this.datasource.save(STORAGE_KEY, this.state);
        this.state$.set(this.state);
    }

    // private async get() {
    //     return await this.datasource.get(STORAGE_KEY);
    // }
    //
    // getState() {
    //     return this.state;
    // }

    public getCurrentEnvironment(): Environment {
        const environmentId: string = this.state.activeEnvironmentId;
        if (!environmentId) throw new Error(
            "Environment ID does not exists in AppState data model");
        const environment: Environment = this.state.environments[environmentId];
        if (!environment) throw new Error(
            "Environment with ID " + environmentId + " does not exists in app state");
        return environment;
    }

    public getGroup(groupId: string): Group {
        const group = this.state.groups[groupId];
        if (!group) throw new Error(
            "Group with group ID " + groupId + " does not exists in AppState data model");
        return group;
    }

    public getLink(linkId: string) {
        const link: Link = this.state.links[linkId];
        if (!link) throw new Error(
            "Link with link ID " + linkId + " does not exists in AppState data model");
        return link;
    }

    //TODO odjebať niekde do piče ? je toto concern tejto triedy ?
    // subscribe(listener: (state: AppState) => void) {
    //     this.listeners.add(listener);
    //     return () => this.listeners.delete(listener);
    // }

    /* ================== CRUD ================== */

    createGroup(title: string): Promise<void> {
        const id = uid();
        this.state.groups[id] = {
            id,
            environmentId: this.state.activeEnvironmentId,
            title,
        };
        return this.save();
    }

    renameGroup(groupId: string, title: string): Promise<void> {
        const group = this.getGroup(groupId);
        group.title = title;
        return this.save();
    }

    deleteGroup(groupId: string): Promise<void> {
        this.getGroup(groupId);
        delete this.state.groups[groupId];
        return this.save();
    }

    createLink(groupId: string, title: string, url: string): Promise<void> {
        this.getGroup(groupId);
        const id = uid();
        this.state.links[id] = {
            id: id,
            title: title,
            url: url,
            environmentId: this.state.activeEnvironmentId,
            groupId: groupId,
            subGroupId: ""
        };
        return this.save();
    }

    deleteLink(id: string): Promise<void> {
        this.getLink(id);
        delete this.state.links[id];
        return this.save();
    }
}

export const appStateDAO = new AppStateRepository();
