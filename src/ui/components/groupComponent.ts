import {AppStateRepository} from "../../backend/repository/AppStateRepository";
import {GroupViewModel, GroupDTO, LinkDTO, SubgroupDTO, GroupItemDTO} from "../../viewModel/groupViewModel";
import {qsAll} from "../../utils/firstOrderMethods";
import {LinkComponent} from "./linkComponent"
import {ELEM_LINK, ELEM_SUBGROUP} from "../../main"

export class GroupComponent extends HTMLElement {

    private groupViewModel!: GroupViewModel;
    private appStateRepository!: AppStateRepository;

    setRepository(repo: AppStateRepository) {
        this.appStateRepository = repo;
        this.tryInit();
    }

    connectedCallback() {
        this.tryInit();
    }

    tryInit() {
        if (!this.isConnected || !this.appStateRepository || !this.id) return;
        // console.log("inited");
        this.groupViewModel = new GroupViewModel(this.appStateRepository, this.id);
        this.render();
        this.callbacks();
    }

    render() {
        this.groupViewModel.groupItemsObservable
            .subscribe((attrs: GroupDTO) => {
                // console.log("subscribe success");
                // console.log(attrs.length);
                // console.log(attrs);
                this.renderHtmlTemplate(attrs);
            });
    }

    private renderHtmlTemplate(groupDto: GroupDTO): void {
        const parentElem: HTMLElement | null = document.getElementById(this.id);
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
        const linkElem = document.createElement(ELEM_LINK);
        linkElem.id = link.id;
        parent.appendChild(linkElem);
    }

    private renderSubgroup(subgroup: SubgroupDTO, parent: HTMLElement) {
        const subgroupElem = document.createElement(ELEM_SUBGROUP);
        subgroup.links.forEach((link: LinkDTO) => {
            this.renderLink(link, subgroupElem);
        });
        parent.appendChild(subgroupElem);
    }

    private callbacks() {
        qsAll<LinkComponent>(ELEM_LINK, this)
            .forEach((l: LinkComponent) => {
                l.setRepository(this.appStateRepository);
            });
    }

}
