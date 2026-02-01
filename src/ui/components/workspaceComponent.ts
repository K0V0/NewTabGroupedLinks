import {AppStateRepository} from "../../backend/repository/AppStateRepository";
import {WorkspaceViewModel, WorkspaceViewModelAttributes} from "../../viewModel/workspaceViewModel";

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
    }

    render() {
        this.workspaceViewModel.attributesObservable
            .subscribe(attrs => {
                this.htmlTemplate(attrs);
            });
    }

    private htmlTemplate(attrs: WorkspaceViewModelAttributes): void {
        this.innerHTML = `
            <header>
                ${attrs.workspaces.map(
                    workspace => `<button class="switch-workspace" id="${workspace.id}">${workspace.title}</button>`
                ).join("")}
            </header>
            <main>
                <h1>${attrs.environmentName}</h1>
                <button id="add-group">+ group</button>
                ${attrs.groupsIds.map(
                    id => `<link-group group-id="${id}"></link-group>`
                ).join("")}
            </main>
            <footer>
            </footer>
        `;
    }

}
