// import { store } from "./store/store";
// import { initialState } from "./state/initialState";

// import "./components/workspace";

// store.init(initialState);

// (async () => {
//     await store.init(initialState);
//     //document.querySelector("my-workspace")?.render(); // or trigger custom render
// })();

import { store } from "./store/store";
import { renderEnvironment } from "./ui/renderEnvironment";
import { initDnD } from "./dnd";
import { initialState } from "./state/initialState";
import {Environment} from "./state/models";

const appRoot = document.getElementById("app")!;

async function render() {
    appRoot.innerHTML = "";

    const state = store.getState();
    //TODO nejaké jebanie typu loglevel.error
    if (!state) return;
    if (!state.environments) return;

    let currentEnv: Environment = state.environments[state.activeEnvironmentId]
    appRoot.appendChild(renderEnvironment(currentEnv, store));

    // Object.entries(state.environments).forEach((envId: string, env: Environment) => {
    //     appRoot.appendChild(renderEnvironment(env, store));
    // });
}

async function bootstrap() {
    await store.init(initialState);   // chrome.storage load
    initDnD();                        // global DnD fixes
    store.subscribe(render);          // re-render on state change
    await render();                         // initial render
}

bootstrap();
