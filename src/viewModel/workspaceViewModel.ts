import {AppStateRepository} from "../backend/repository/AppStateRepository";
import {ObservableValue} from "../utils/observableValue";
import {AppState, Environment} from "../backend/entity/AppStateEntity";

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

    private _environment!: Environment;
    private _environmentName!: string;
    private _environmentId!: string;

    public setState(state: AppState) {
        this.state = state;
        this.updateAttributes();
    }

    private updateAttributes() {
        this._environmentId = this.state.activeEnvironmentId;
        this._environment = this.state.environments[this._environmentId];
        this._environmentName = this._environment.name;
    }

    get environmentName(): string {
        return this._environmentName;
    }

    get environmentId(): string {
        return this._environmentId;
    }

    get environment(): Environment {
        return this._environment;
    }
}