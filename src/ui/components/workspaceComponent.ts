class WorkspaceComponent extends HTMLElement {

    render() {
        this.htmlTemplate();
    }

    private htmlTemplate(): void {
        this.innerHTML = `<h1>hello word</h1>`;
    }

}

customElements.define("workspace-root", WorkspaceComponent);
