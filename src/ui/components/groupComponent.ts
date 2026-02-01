import {AppStateRepository} from "../../backend/repository/AppStateRepository";
import {GroupViewModel, GroupViewModelAttributes} from "../../viewModel/groupViewModel";

export class GroupComponent extends HTMLElement {

    private groupViewModel!: GroupViewModel;
    private appStateRepository!: AppStateRepository;
    private groupId!: string;

    setRepository(repo: AppStateRepository) {
        this.appStateRepository = repo;
        this.tryInit();
    }

    connectedCallback() {
        this.groupId = this.getAttribute("group-id")!;
        this.tryInit();
    }

    tryInit() {
        if (!this.isConnected || !this.appStateRepository) return;
        this.groupViewModel = new GroupViewModel(this.appStateRepository);
        this.render();
    }

    render() {
        this.groupViewModel.attributesObservable
            .subscribe(attrs => {
                this.htmlTemplate(attrs);
            });
    }

    private htmlTemplate(attrs: GroupViewModelAttributes): void {
        this.innerHTML = `
            KOKOOOOOOT
        `;
    }

}
