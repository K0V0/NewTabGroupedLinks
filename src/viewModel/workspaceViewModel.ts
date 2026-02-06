import {AppStateRepository} from "../backend/repository/AppStateRepository";
import {AppState} from "../backend/entity/AppStateEntity";
import {ObservableValue} from "../utils/observableValue";

export interface WorkspaceDTO {
    id: string;
    title: string;
}

export class WorkspaceViewModel {

    readonly workspacesObservable: ObservableValue<WorkspaceDTO[]> = new ObservableValue(null as any);
    readonly groupIdsObservable: ObservableValue<string[]> = new ObservableValue(null as any);
    readonly workspaceObservable: ObservableValue<WorkspaceDTO> = new ObservableValue(null as any);

    constructor(repo: AppStateRepository) {
        repo.state$.subscribe((state: AppState) => {

            // top menu with workspaces (environments)
            this.workspacesObservable.set(
                Object
                    .values(state.environments)
                    .map(env => ({
                        id: env.id,
                        title: env.name
                    })));

            // workspace
            this.workspaceObservable.set(
                state.environments[state.activeEnvironmentId]);

            // groups with links
            this.groupIdsObservable.set(
                Object
                    .values(state.groups)
                    .map(group => group.id));
        });
    }
}