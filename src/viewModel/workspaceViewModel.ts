import {AppStateRepository} from "../backend/repository/AppStateRepository";
import {AppState, Link, Environment} from "../backend/entity/AppStateEntity";
import {ObservableValue} from "../utils/observableValue";
import {LinkDTO} from "./groupViewModel";

export interface WorkspaceDTO {
    id: string;
    title: string;
}

export class WorkspaceViewModel {

    readonly workspacesObservable: ObservableValue<WorkspaceDTO[]> = new ObservableValue(null as any);
    readonly groupIdsObservable: ObservableValue<string[]> = new ObservableValue(null as any);
    readonly workspaceObservable: ObservableValue<WorkspaceDTO> = new ObservableValue(null as any);

    private toWorkspaceDTO = (workspace: Environment): WorkspaceDTO => ({
        id: workspace.id,
        title: workspace.name
    });

    constructor(repo: AppStateRepository) {
        repo.state$.subscribe((state: AppState) => {

            // top menu with workspaces (environments)
            this.workspacesObservable.set(
                Object
                    .values(state.environments)
                    .map(this.toWorkspaceDTO));

            // workspace
            this.workspaceObservable.set(
                this.toWorkspaceDTO(
                    state.environments[state.activeEnvironmentId]));

            // groups with links
            this.groupIdsObservable.set(
                Object
                    .values(state.groups)
                    .map(group => group.id));
        });
    }
}