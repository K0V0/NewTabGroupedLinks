import {AppStateRepository} from "../../backend/repository/AppStateRepository";
import {GroupViewModel, GroupDTO, LinkDTO, SubgroupDTO, GroupItemDTO} from "../../viewModel/groupViewModel";
import {qsAll} from "../../utils/firstOrderMethods";
import {LinkComponent} from "./linkComponent"
import {ELEM_LINK, ELEM_SUBGROUP, ELEM_GROUP_HEAD, ELEM_GROUP_FOOT, ELEM_GROUP_BODY} from "../../main"

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

    /**
     * Parent to inflate:
     *
     *  <link-group id="[[ this.id ]]"></link-group>
     *
     * Rendered content:
     *
     *  <link-group-head></link-group-head>
     *  <link-group-body>
     *    <link-container id="[[ LinkDTO.id ]]"></link-container>
     *    <link-subgroup id="[[ SubgroupDTO.id ]]">
     *      <link-container id="[[ LinkDTO.id ]]"></link-container>
     *    </link-subgroup>
     *  </link-group-body>
     *  <link-group-foot></link-group-foot>
     */
    private renderHtmlTemplate(groupDto: GroupDTO): void {
        const parentElem: HTMLElement | null = document.getElementById(this.id);

        const headerElem: HTMLElement = document.createElement(ELEM_GROUP_HEAD);
        const bodyElem: HTMLElement = document.createElement(ELEM_GROUP_BODY);
        const footerElem: HTMLElement = document.createElement(ELEM_GROUP_FOOT);
        parentElem.appendChild(headerElem);
        parentElem.appendChild(bodyElem);
        parentElem.appendChild(footerElem);

        groupDto.groupItems.forEach((groupItem: GroupItemDTO) => {
            switch (groupItem.type) {
                case "link":
                    this.renderLink(groupItem, bodyElem);
                    break;
                case "subgroup":
                    this.renderSubgroup(groupItem, bodyElem);
                    break;
                default:
                    console.error("Unknown group item type:", groupItem.type);
            }
        });
    }

    private renderLink(link: LinkDTO, parent: HTMLElement): void {
        const linkElem: HTMLElement = document.createElement(ELEM_LINK);
        linkElem.id = link.id;
        parent.appendChild(linkElem);
    }

    private renderSubgroup(subgroup: SubgroupDTO, parent: HTMLElement): void {
        const subgroupElem: HTMLElement = document.createElement(ELEM_SUBGROUP);
        subgroupElem.id = subgroup.id;
        subgroup.links.forEach((link: LinkDTO): void => {
            this.renderLink(link, subgroupElem);
        });
        parent.appendChild(subgroupElem);
    }

    private callbacks(): void {
        // render containers for links
        qsAll<LinkComponent>(ELEM_LINK, this)
            .forEach((l: LinkComponent) => {
                l.setRepository(this.appStateRepository);
            });
    }

}
