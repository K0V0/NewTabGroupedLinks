import {AppStateRepository} from "../../backend/repository/AppStateRepository";
import {LinkViewModel, LinkDTO} from "../../viewModel/linkViewModel";

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
        this.linkViewModel.linkObservable
            .subscribe((linkDto: LinkDTO)=> {
                this.renderHtmlTemplate(linkDto);
            });
    }

    /**
     *  <div>
     *      <a href="[[ url ]]">[[ title ]]</a>
     *  </div>
     */
    private renderHtmlTemplate(linkDto: LinkDTO) {
        const parentElem: HTMLElement | null = document.getElementById(this.id);

        const containerDiv: HTMLElement = document.createElement("div");
        parentElem.appendChild(containerDiv);

        const anchor: HTMLAnchorElement = document.createElement("a");
        anchor.href = linkDto.url;
        anchor.textContent = linkDto.title;
        containerDiv.appendChild(anchor);
    }

    private callbacks() {

    }
}