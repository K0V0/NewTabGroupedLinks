import {AppStateRepository} from "../../backend/repository/AppStateRepository";
import {WorkspaceDTO, WorkspaceViewModel} from "../../viewModel/workspaceViewModel";
import {GroupComponent} from "./groupComponent";
import {qsAll} from "../../utils/firstOrderMethods";
import {ELEM_GROUP, ELEM_WORKSPACE, ELEM_WORKSPACE_BODY, ELEM_WORKSPACE_HEAD, ACT_SWITCH_WORKSPACE} from "../../main"

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

        const headerElem: HTMLElement = document.body.getElementsByTagName("header")[0];
        const footerElem: HTMLElement = document.body.getElementsByTagName("footer")[0];
        const headElem: HTMLElement = document.createElement(ELEM_WORKSPACE_HEAD);
        const bodyElem: HTMLElement = document.createElement(ELEM_WORKSPACE_BODY);

        this.appendChild(headElem);
        this.appendChild(bodyElem);

        this.workspaceViewModel.workspacesObservable
            .subscribe((workspaces: WorkspaceDTO[]) => this.renderHeader(headerElem, workspaces));

        this.workspaceViewModel.workspaceObservable
            .subscribe((workspace: WorkspaceDTO) => this.renderWorkspaceHead(headElem, workspace));

        this.workspaceViewModel.groupIdsObservable
            .subscribe((groupIds: string[]) => this.renderGroups(bodyElem, groupIds));

       this.renderFooter(footerElem);
    }

    /**
     * Top menu workspace switcher content (Application header content)
     *
     * Parent to inflate:
     *
     *  <header></header>
     *
     * Rendered content:
     *
     *  <button class="[[ ACT_SWITCH_WORKSPACE ]]" name="[[ WorkspaceDTO.id ]]">
     *      [[ WorkspaceDTO.title ]]
     *  </button>
     *  ...
     *  <button ...>...</button>
     */
    private renderHeader(parentElem: HTMLElement, workspaces: WorkspaceDTO[]) {
        workspaces.forEach((workspace: WorkspaceDTO) => {
            const buttonElem: HTMLButtonElement = document.createElement("button");
            buttonElem.name = workspace.id;
            buttonElem.title = workspace.title;
            buttonElem.className = ACT_SWITCH_WORKSPACE;
            parentElem.appendChild(buttonElem);
        });
    }

    /**
     *  Workspace heading & top menu content
     */
    private renderWorkspaceHead(parentElem: HTMLElement, workspace: WorkspaceDTO) {

        const titleElem: HTMLHeadingElement = document.createElement("h1");
        titleElem.title = workspace.title;
        parentElem.appendChild(titleElem);

        const addButtonElem: HTMLButtonElement = document.createElement("button");
        addButtonElem.name = workspace.id;
        addButtonElem.title = "Add new group";
        addButtonElem.className = ACT_SWITCH_WORKSPACE;
        parentElem.appendChild(addButtonElem);
    }

    /**
     *  Workspace's groups with links and subgroups containers
     */
    private renderGroups(parentElem: HTMLElement, groupIds: string[]) {
        groupIds.forEach(groupId => {
            const groupElem: HTMLElement = document.createElement(ELEM_GROUP);
            groupElem.id = groupId;
            parentElem.appendChild(groupElem);
        });
    }

    /**
     *  Application footer content
     */
    private renderFooter(parentElem: HTMLElement) {
        const dummyTextElem = document.createElement("span");
        dummyTextElem.title = "tiririri";
        parentElem.appendChild(dummyTextElem);
    }

    private callbacks(): void {

        // console.log("callbacks na link-group");

        qsAll<GroupComponent>("link-group", this)
            .forEach(lg => {
                lg.setRepository(this.appStateRepository);
            });
    }

}