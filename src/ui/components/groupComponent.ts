import {AppStateRepository} from "../../backend/repository/AppStateRepository";
import {GroupViewModel, GroupDTO, LinkDTO, SubgroupDTO, GroupItemDTO} from "../../viewModel/groupViewModel";

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
            .subscribe((attrs: GroupDTO) => {
                console.log("subscribe success");
                console.log(attrs.length);
                console.log(attrs);
                this.renderHtmlTemplate(attrs);
            });
    }

    private renderHtmlTemplate(groupDto: GroupDTO): void {
        const parentElem = document.getElementById(groupDto.groupId);
        groupDto.groupItems.forEach(groupItem => {
            switch (groupItem.type) {
                case "link":
                    this.renderLink(groupItem, parentElem);
                    break;
                case "subgroup":
                    this.renderSubgroup(groupItem, parentElem);
                    break;
                default:
                    console.error("Unknown group item type:", groupItem.type);
            }
        });
    }

    private renderLink(link: LinkDTO, parent: HTMLElement) {
        const linkElem = document.createElement("link");
        linkElem.id = link.id;
        parent.appendChild(linkElem);
    }

    private renderSubgroup(subgroup: SubgroupDTO, parent: HTMLElement) {
        const subgroupElem = document.createElement("subgroup");
        subgroup.links.forEach((link: LinkDTO) => {
            this.renderLink(link, subgroupElem);
        });
        parent.appendChild(subgroupElem);
    }

}
