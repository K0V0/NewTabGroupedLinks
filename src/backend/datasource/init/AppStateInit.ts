import { AppState } from "../../entity/AppStateEntity";

export const appStateInit: AppState = {
    activeEnvironmentId: "env-1",
    environments: {
        "env-1": {
            id: "env-1",
            name: "Default",
        }
    },
    groups: {
        "group-1": {
            id: "group-1",
            environmentId: "env-1",
            title: "Work",
        },
        "group-2": {
            id: "group-2",
            environmentId: "env-1",
            title: "Personal",
        }
    },
    subgroups: {},
    links: {
        "test-link-1": {
            title: "test link",
            id: "test",
            subGroupId: "",
            groupId: "group-1",
            environmentId: "env-1",
            url: "http://kokot.do.pici"
        }
    }
};
