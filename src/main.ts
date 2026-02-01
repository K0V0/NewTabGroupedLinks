import { appStateDAO } from "./backend/repository/AppStateRepository";
import { appStateInit } from "./backend/datasource/init/AppStateInit";

import {WorkspaceComponent} from "./ui/components/workspaceComponent";

// define custom elements used BEFORE they are created/constructed
// otherwise You are unable to call custom methods for example for
// injecting repository later on them
customElements.define("workspace-root", WorkspaceComponent);

(async () => {

    // initialize "app data" object and repository, WAIT FOR IT !!!
    await appStateDAO.init(appStateInit);

    // create custom HTML element ONLY THAT WAY otherwise (innerHTML() method or
    // raw in html file) construction of object happens before initialized "repository"
    // is injected and program crashes
    const workspaceElement = document
        .createElement("workspace-root") as WorkspaceComponent;
    workspaceElement.setRepository(appStateDAO);
    document.body.appendChild(workspaceElement);

})();
