import { appStateDAO } from "./backend/repository/AppStateRepository";
import { appStateInit } from "./backend/datasource/init/AppStateInit";

import {WorkspaceComponent} from "./ui/components/workspaceComponent";

customElements.define("workspace-root", WorkspaceComponent);

(async () => {
    await appStateDAO.init(appStateInit);
    // document.body.innerHTML = `<workspace-root></workspace-root>`;
    console.log("main.ts bootstrap done ...");

    const workspaceElement = document.createElement("workspace-root") as WorkspaceComponent;
    workspaceElement.setRepository(appStateDAO);
    document.body.appendChild(workspaceElement);

})();
