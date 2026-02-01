import {ObservableValue} from "../utils/observableValue";
import {AppStateRepository} from "../backend/repository/AppStateRepository";
import {AppState, GroupItem, Link, Subgroup} from "../backend/entity/AppStateEntity";

export class GroupViewModel {

    private isLinkInGroupAndEnv =
        (environmentId: string, groupId: string) =>
            (link: Link | Subgroup): boolean =>
                link.environmentId === environmentId &&
                link.groupId === groupId;

    readonly groupItemsObservable: ObservableValue<(Link | Subgroup)[]>
        = new ObservableValue(null as any);

    constructor(repo: AppStateRepository, groupId: string) {
        repo.state$
            .pick("subgroups", "links", "activeEnvironmentId")
            .subscribe(attrs => {

                console.log("subscribed na grup data");

                const currentEnvironmentId = attrs.activeEnvironmentId;
                const groupItems: (Link | Subgroup)[] = Object
                    .values(attrs.links)
                    .filter(this.isLinkInGroupAndEnv(currentEnvironmentId, groupId));
                groupItems.push(
                    ...Object
                        .values(attrs.subgroups)
                        .filter(this.isLinkInGroupAndEnv(currentEnvironmentId, groupId)));
                this.groupItemsObservable.set(groupItems);
            });
    }

}

