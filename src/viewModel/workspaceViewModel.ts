import {AppStateRepository} from "../backend/repository/AppStateRepository";
import {ObservableValue} from "../utils/observableValue";
import {AppState} from "../backend/entity/AppStateEntity";

interface Workspace {
    id: string;
    title: string;
}

export class WorkspaceViewModel {

    readonly attributesObservable: ObservableValue<WorkspaceViewModelAttributes>
        = new ObservableValue<WorkspaceViewModelAttributes>(null as any);

    private attributes: WorkspaceViewModelAttributes = new WorkspaceViewModelAttributes();

    constructor(repo: AppStateRepository) {
        repo.state$.subscribe(state => {
            this.attributes.setState(state);
            this.attributesObservable.set(this.attributes);
        });
    }
}

export class WorkspaceViewModelAttributes {

    private state!: AppState;

    private _environmentName!: string;
    private _groups_ids!: string[];
    private _workspaces!: Workspace[];

    public setState(state: AppState) {
        this.state = state;
        this.updateAttributes();
    }

    private updateAttributes() {
        const activeEnvironmentId = this.state.activeEnvironmentId;
        const activeEnvironment = this.state.environments[activeEnvironmentId];

        this._environmentName = activeEnvironment.name;
        this._groups_ids = Object
            .values(this.state.groups)
            .map(group => group.id);
        this._workspaces = Object
            .values(this.state.environments)
            .map(env => ({
                id: env.id,
                title: env.name
            }));
    }

    get environmentName(): string {
        return this._environmentName;
    }

    get groupsIds(): string[] {
        return this._groups_ids;
    }

    get workspaces(): Workspace[] {
        return this._workspaces;
    }
}