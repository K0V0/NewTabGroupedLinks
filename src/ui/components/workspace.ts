// import "./group";

// class WorkspaceRoot extends HTMLElement {
//     private unsubscribe?: () => void;
//
//     connectedCallback() {
//         // this.unsubscribe = appStateDAO.subscribe(state => this.render(state));
//         this.render(appStateDAO.getState());
//     }
//
//     render(state: AppState) {
//         const env = state.environments[state.activeEnvironmentId];
//         if (!env) return;
//
//         this.innerHTML = `
//       <h1>${env.name}</h1>
//       <button id="add-group">+ group</button>
//
//       <div>
//         ${env.groups.map(
//             id => `<link-group group-id="${id}"></link-group>`
//         ).join("")}
//       </div>
//     `;
//
//         this.querySelector("#add-group")
//             ?.addEventListener("click", () => {
//                 const name = prompt("Group name?");
//                 if (name) {
//                     appStateDAO.createGroup(name);
//                 }
//             });
//     }
// }

// customElements.define("workspace-root", WorkspaceRoot);
