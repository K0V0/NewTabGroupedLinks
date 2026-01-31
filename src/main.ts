import { appStateDAO } from "./backend/repository/AppStateRepository";
import { appStateInit } from "./backend/datasource/init/AppStateInit";

import "./ui/components/workspaceComponent";

(async () => {
    await appStateDAO.init(appStateInit)
        .then();
})();
