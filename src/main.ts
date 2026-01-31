import { store } from "./store/store";
import { initialState } from "./state/initialState";

import "./components/workspace";

// store.init(initialState);

(async () => {
    await store.init(initialState);
    //document.querySelector("my-workspace")?.render(); // or trigger custom render
})();
