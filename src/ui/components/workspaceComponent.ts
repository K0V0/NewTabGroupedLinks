import {AppStateRepository} from "../../backend/repository/AppStateRepository";
import {WorkspaceDTO, WorkspaceViewModel} from "../../viewModel/workspaceViewModel";
import {GroupComponent} from "./groupComponent";
import {qsAll} from "../../utils/firstOrderMethods";

export class WorkspaceComponent extends HTMLElement {

    private workspaceViewModel!: WorkspaceViewModel;
    private appStateRepository!: AppStateRepository;

    setRepository(repo: AppStateRepository) {
        this.appStateRepository = repo;
    }

    connectedCallback() {
        if (!this.appStateRepository) throw new Error("Repository not set");
        this.workspaceViewModel = new WorkspaceViewModel(this.appStateRepository);
        this.render();
        this.callbacks();
    }

    render() {

        this.workspaceViewModel.workspacesObservable
            .subscribe((workspaces: WorkspaceDTO[])  => {
                this.innerHTML += `
                    <header>
                    ${workspaces.map(
                        workspace => `<button class="switch-workspace" id="${workspace.id}">${workspace.title}</button>`
                    ).join("")}
                    </header>
                `;
            });

        this.innerHTML += `<main>`;

        this.workspaceViewModel.workspaceNameObservable
            .subscribe((name: string) => this.innerHTML += `<h1>${name}</h1>`);

        this.innerHTML += `<button id="add-group">+ group</button>`;

        this.workspaceViewModel.groupIdsObservable
            .subscribe((groupIds: string[]) => {
                this.innerHTML += `
                    ${groupIds.map(
                        id => `<link-group id="${id}"></link-group>`
                    ).join("")}
                `;
            });

        this.innerHTML += `</main>`;
        this.innerHTML += `<footer></footer>`;
    }

    private callbacks(): void {

        // console.log("callbacks na link-group");

        qsAll<GroupComponent>("link-group", this)
            .forEach(lg => {
                lg.setRepository(this.appStateRepository);
                lg.setGroupId(lg.id);
            });
    }

}