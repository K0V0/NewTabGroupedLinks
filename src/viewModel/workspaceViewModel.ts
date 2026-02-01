import {AppStateRepository} from "../backend/repository/AppStateRepository";
import {ObservableValue} from "../utils/observableValue";

export interface WorkspaceDTO {
    id: string;
    title: string;
}

export class WorkspaceViewModel {

    readonly workspacesObservable: ObservableValue<WorkspaceDTO[]> = new ObservableValue(null as any);
    readonly groupIdsObservable: ObservableValue<string[]> = new ObservableValue(null as any);
    readonly workspaceNameObservable: ObservableValue<string> = new ObservableValue(null as any);

    constructor(repo: AppStateRepository) {
        repo.state$.subscribe(state => {

            // top menu with workspaces (environments)
            this.workspacesObservable.set(Object
                .values(state.environments)
                .map(env => ({
                    id: env.id,
                    title: env.name
                })));

            // workspace name
            this.workspaceNameObservable.set(
                state.environments[state.activeEnvironmentId].name);

            // groups with links
            this.groupIdsObservable.set(Object
                .values(state.groups)
                .map(group => group.id));
        });
    }
}