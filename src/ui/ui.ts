import {AppStateRepository} from "../backend/repository/AppStateRepository";
import {WorkspaceViewModel} from "../viewModel/workspaceViewModel";

class UI {

    private appStateRepository: AppStateRepository = new AppStateRepository();
    private workspaceViewModel: WorkspaceViewModel = new WorkspaceViewModel(this.appStateRepository);



}