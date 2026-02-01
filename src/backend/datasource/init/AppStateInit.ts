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
            title: "Work"
        },
        "group-2": {
            id: "group-2",
            environmentId: "env-1",
            title: "Personal"
        }
    },
    subgroups: {
        "subgroup-1": {
            id: "subgroup-1",
            title: "Testovacia podskupina 1",
            groupId: "group-1",
            environmentId: "env-1",
            collapsed: false,
            defaultCollapsed: false,
            type: "subgroup"
        }
    },
    links: {
        "test-link-1": {
            title: "test link",
            id: "test",
            subGroupId: "",
            groupId: "group-1",
            environmentId: "env-1",
            url: "http://kokot.do.pici",
            type: "link"
        },
        "test-link-2": {
            title: "test link 2",
            id: "test2",
            subGroupId: "subgroup-1",
            groupId: "group-1",
            environmentId: "env-1",
            url: "http://kokot.do.pici",
            type: "link"
        }
    }
};
