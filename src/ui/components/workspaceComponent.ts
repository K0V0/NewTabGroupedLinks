import {AppStateRepository} from "../../backend/repository/AppStateRepository";
import {WorkspaceDTO, WorkspaceViewModel, GroupDTO} from "../../viewModel/workspaceViewModel";
import {GroupComponent} from "./groupComponent";
import {qsAll, handleRendering} from "../../utils/firstOrderMethods";
import {ELEM_GROUP, ELEM_WORKSPACE, ELEM_WORKSPACE_BODY, ELEM_WORKSPACE_HEAD, ACT_SWITCH_WORKSPACE, ACT_ADD_GROUP} from "../../main"

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
        this.listeners();
    }

    private render() {

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

        this.workspaceViewModel.groupsObservable
            .subscribe((groupIds: string[]) => this.renderGroups(bodyElem, groupIds));

       this.renderFooter(footerElem);
    }

    private listeners(): void {
        this.onAddGroupButtonClick();
    }

    private callbacks(): void {
        //this.bindComponentClassToGroupElements();
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
            buttonElem.title = workspace.title;
            buttonElem.className = ACT_SWITCH_WORKSPACE;
            buttonElem.value = workspace.id;
            buttonElem.textContent = workspace.title;
            parentElem.appendChild(buttonElem);
        });
    }

    /**
     *  Workspace heading & top menu content
     */
    private renderWorkspaceHead(parentElem: HTMLElement, workspace: WorkspaceDTO) {

        // ID
        this.id = workspace.id;

        // title
        const titleElem: HTMLHeadingElement = document.createElement("h1");
        titleElem.title = workspace.title;
        titleElem.textContent = workspace.title;
        parentElem.appendChild(titleElem);

        //TODO edit workspace title

        // add group
        const addButtonElem: HTMLButtonElement = document.createElement("button");
        addButtonElem.title = "Add new group";
        addButtonElem.className = ACT_ADD_GROUP;
        addButtonElem.value = workspace.id;
        addButtonElem.textContent = " + ";
        parentElem.appendChild(addButtonElem);
    }

    /**
     *  Workspace's groups with links and subgroups containers
     */
    private renderGroups(parentElem: HTMLElement, groups: GroupDTO[]) {
        handleRendering<GroupDTO>(
            parentElem,
            groups,
            group => group.id,
            group => {
                const groupElem = document.createElement(ELEM_GROUP) as GroupComponent;
                groupElem.title = group.title;
                groupElem.setRepository(this.appStateRepository);
                return groupElem;
            }
        );
    }

    /**
     *  Application footer content
     */
    private renderFooter(parentElem: HTMLElement) {
        const dummyTextElem = document.createElement("span");
        dummyTextElem.title = "tiririri";
        parentElem.appendChild(dummyTextElem);
    }

    // private bindComponentClassToGroupElements(): void {
    //     // renders containers for groups
    //     qsAll<GroupComponent>("link-group", this)
    //         .forEach(lg => {
    //             lg.setRepository(this.appStateRepository);
    //         });
    // }

    private onAddGroupButtonClick() {
        document
            .querySelector(`.${ACT_ADD_GROUP}`)
            ?.addEventListener(
                "click",
                () => this.workspaceViewModel.addGroup(this.id, prompt("Group name?")));
    }

}