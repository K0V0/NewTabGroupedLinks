import {AppStateRepository} from "../../backend/repository/AppStateRepository";
import {WorkspaceViewModel} from "../../viewModel/workspaceViewModel";

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
        this.workspaceViewModel.environmentName
            .subscribe(environmentName => {
                this.htmlTemplate(environmentName);
            });
    }

    private htmlTemplate(workspaceTitle: string): void {
        this.innerHTML = `<h1>hello word ${workspaceTitle}</h1>`;
    }

}
