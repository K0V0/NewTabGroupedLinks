import { appStateDAO } from "./backend/repository/AppStateRepository";
import { appStateInit } from "./backend/datasource/init/AppStateInit";

import {WorkspaceComponent} from "./ui/components/workspaceComponent";
import {GroupComponent} from "./ui/components/groupComponent";
import {LinkComponent} from "./ui/components/linkComponent";
import {SubgroupComponent} from "./ui/components/subgroupComponent";

export const ELEM_WORKSPACE = "workspace-root";
export const ELEM_GROUP = "link-group";
export const ELEM_SUBGROUP = "link-subgroup"
export const ELEM_LINK = "link-container";

// define custom elements used BEFORE they are created/constructed
// otherwise You are unable to call custom methods for example for
// injecting repository later on them
customElements.define(ELEM_WORKSPACE, WorkspaceComponent);
customElements.define(ELEM_GROUP, GroupComponent);
customElements.define(ELEM_SUBGROUP, SubgroupComponent);
customElements.define(ELEM_LINK, LinkComponent);

(async () => {

    // initialize "app data" object and repository, WAIT FOR IT !!!
    await appStateDAO.init(appStateInit);

    // create custom HTML element ONLY THAT WAY otherwise (innerHTML() method or
    // raw in html file) construction of object happens before initialized "repository"
    // is injected and program crashes
    const workspaceElement = document
        .createElement(ELEM_WORKSPACE) as WorkspaceComponent;
    workspaceElement.setRepository(appStateDAO);
    document.body.appendChild(workspaceElement);

})();
