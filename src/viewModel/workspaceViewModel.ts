import {AppStateRepository} from "../backend/repository/AppStateRepository";
import {ObservableValue} from "../utils/observableValue";

export class WorkspaceViewModel {

    readonly environmentName: ObservableValue<string> = new ObservableValue<string>("");

    constructor(repo: AppStateRepository) {
        repo.state$.subscribe(state => {
            const envId = state.activeEnvironmentId;
            const env = state.environments[envId];
            this.environmentName.set(env?.name ?? "Unknown");
        });
    }

}