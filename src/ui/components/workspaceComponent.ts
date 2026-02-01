import {AppStateRepository} from "../../backend/repository/AppStateRepository";
import {WorkspaceViewModel} from "../../viewModel/workspaceViewModel";

export class WorkspaceComponent extends HTMLElement {

    // connectedCallback() {
    //     this.render(ViewModels.getWorkspaceViewModel());
    // }

    private workspaceViewModel: WorkspaceViewModel

    constructor(appStateRepository: AppStateRepository) {
        super();
        this.workspaceViewModel = new WorkspaceViewModel(appStateRepository);
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

customElements.define("workspace-root", WorkspaceComponent);
