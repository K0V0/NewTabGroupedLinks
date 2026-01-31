import { Environment } from "../state/models";
import { renderGroup } from "./renderGroup";
import { Store } from "../store/store";

export function renderEnvironment(
    env: Environment,
    store: Store
): HTMLElement {
    const root = document.createElement("section");
    root.className = "environment";
    root.dataset.envId = env.id;

    const title = document.createElement("h1");
    title.textContent = env.name;
    root.appendChild(title);

    const groupsWrapper = document.createElement("div");
    groupsWrapper.className = "groups";

    env.groups.forEach(groupId => {
        const group = store.getState().groups[groupId];
        if (!group) return;

        groupsWrapper.appendChild(renderGroup(group, store));
    });

    root.appendChild(groupsWrapper);
    return root;
}