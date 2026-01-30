import { store } from "./state/store";
import { initialState } from "./state/initialState";

import "./components/workspace";

// store.init(initialState);

(async () => {
    await store.init(initialState);
})();
