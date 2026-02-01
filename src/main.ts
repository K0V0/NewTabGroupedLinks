import { appStateDAO } from "./backend/repository/AppStateRepository";
import { appStateInit } from "./backend/datasource/init/AppStateInit";

import {WorkspaceComponent} from "./ui/components/workspaceComponent";

(async () => {
    await appStateDAO.init(appStateInit)
    document.body.innerHTML = `<workspace-root></workspace-root>`
    console.log("main.ts bootstrap done ...");
    const workspaceComponent: WorkspaceComponent = new WorkspaceComponent(appStateDAO);
    workspaceComponent.render();
})();
