import {AppStateRepository} from "../../backend/repository/AppStateRepository";
import {LinkViewModel} from "../../viewModel/linkViewModel";
import {GroupViewModel} from "../../viewModel/groupViewModel";

export class LinkComponent extends HTMLElement{

    private linkViewModel!: LinkViewModel;
    private appStateRepository!: AppStateRepository;

    setRepository(repo: AppStateRepository) {
        this.appStateRepository = repo;
        console.log("set repo");
        this.tryInit();
    }

    connectedCallback() {
        console.log("callbacks");
        this.tryInit();
    }

    tryInit() {
        if (!this.isConnected || !this.appStateRepository || !this.id) return;
        console.log("inited");
        this.linkViewModel = new LinkViewModel(this.appStateRepository, this.id);
        this.render();
        this.callbacks();
    }

    render() {
        const parentElem: HTMLElement | null = document.getElementById(this.id);

        const containerDiv = document.createElement("div");
        parentElem.appendChild(containerDiv);
    }

    callbacks() {

    }
}