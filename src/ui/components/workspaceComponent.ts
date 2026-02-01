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
        console.log("Workspace component render");
        this.workspaceViewModel.attributesObservable
            .subscribe(attrs => {
                this.htmlTemplate(attrs);
            });
    }

    private htmlTemplate(attrs: WorkspaceViewModelAttributes): void {
        this.innerHTML = `
            <h1>${attrs.environmentName}</h1>
        `;
    }

}
