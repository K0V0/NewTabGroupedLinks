export interface AppState {
    environments: Record<string, Environment>;
    groups: Record<string, Group>;
    subgroups: Record<string, Subgroup>;
    links: Record<string, Link>;
    activeEnvironmentId: string;
}

export interface Environment {
    id: string;
    name: string;
    groups: string[];
}

export interface Group {
    id: string;
    environmentId: string;
    title: string;
    items: (LinkItem | SubgroupItem)[];
}

// export type GroupItem =
//     | { type: "link"; linkId: string }
//     | { type: "subgroup"; subgroupId: string };

export interface LinkItem {
    type: "link";
    linkId: string;
}

export interface SubgroupItem {
    type: "subgroup";
    subgroupId: string;
}


export interface Subgroup {
    id: string;
    title: string;
    collapsed: boolean;
    defaultCollapsed: boolean;
    links: string[];
}

export interface Link {
    id: string;
    title: string;
    url: string;
}