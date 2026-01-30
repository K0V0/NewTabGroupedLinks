import { AppState } from "./models";

export const initialState: AppState = {
    activeEnvironmentId: "env-1",
    environments: {
        "env-1": {
            id: "env-1",
            name: "Default",
            groups: ["group-1", "group-2"]
        }
    },
    groups: {
        "group-1": {
            id: "group-1",
            environmentId: "env-1",
            title: "Work",
            items: []
        },
        "group-2": {
            id: "group-2",
            environmentId: "env-1",
            title: "Personal",
            items: []
        }
    },
    subgroups: {},
    links: {}
};
