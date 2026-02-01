import {ObservableValue} from "../utils/observableValue";
import {AppStateRepository} from "../backend/repository/AppStateRepository";
import {AppState} from "../backend/entity/AppStateEntity";

export class GroupViewModel {

    readonly attributesObservable: ObservableValue<GroupViewModelAttributes>
        = new ObservableValue<GroupViewModelAttributes>(null as any);

    private attributes: GroupViewModelAttributes = new GroupViewModelAttributes();

    constructor(repo: AppStateRepository) {
        repo.state$.subscribe(state => {
            this.attributes.setState(state);
            this.attributesObservable.set(this.attributes);
        });
    }

}

export class GroupViewModelAttributes {

    private state!: AppState;

    public setState(state: AppState) {
        this.state = state;
        this.updateAttributes();
    }

    private updateAttributes() {

    }

}