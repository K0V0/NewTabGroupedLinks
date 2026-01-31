import {AppStateRepository} from "../backend/repository/AppStateRepository";

export class LinkViewModel {

    //TODO dať do bázovej triedy
    private appStateRepository: AppStateRepository;

    constructor(appStateRepository: AppStateRepository) {
        this.appStateRepository = appStateRepository;
    }

}