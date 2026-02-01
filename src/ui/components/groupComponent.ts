import {AppStateRepository} from "../../backend/repository/AppStateRepository";
import {GroupViewModel} from "../../viewModel/groupViewModel";
import {Link, Subgroup} from "../../backend/entity/AppStateEntity";

export class GroupComponent extends HTMLElement {

    private groupViewModel!: GroupViewModel;
    private appStateRepository!: AppStateRepository;
    private groupId!: string;

    setRepository(repo: AppStateRepository) {
        this.appStateRepository = repo;
        this.tryInit();
    }

    setGroupId(groupId: string) {
        this.groupId = groupId;
        this.tryInit();
    }

    connectedCallback() {
        this.groupId = this.getAttribute("group-id")!;
        this.tryInit();
    }

    tryInit() {
        if (!this.isConnected || !this.appStateRepository || !this.groupId) return;
        console.log("inited");
        this.groupViewModel = new GroupViewModel(this.appStateRepository, this.groupId);
        this.render();
    }

    render() {
        this.groupViewModel.groupItemsObservable
            .subscribe(attrs => {
                console.log("subscribe success");
                console.log(attrs.length);
                console.log(attrs);
                this.htmlTemplate(attrs);
            });
    }

    private htmlTemplate(groupItems: (Link | Subgroup)[]): void {
        this.innerHTML = `
             ${groupItems.map(
                groupItem => `<div id="${groupItem.id}">${groupItem.title}</div>`
            ).join("")}
        `;
    }

}
