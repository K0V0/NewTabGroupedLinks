import {ObservableValue} from "../utils/observableValue";
import {AppStateRepository} from "../backend/repository/AppStateRepository";
import {Link, Subgroup} from "../backend/entity/AppStateEntity";

export interface LinkDTO {
    id: string;
    title: string;
    url: string;
    position: number;
}

export interface SubgroupDTO {
    id: string;
    title: string;
    links: LinkDTO[];
    position: number;
}

export type GroupItemDTO =
    | { type: "link"; data: Link }
    | { type: "subgroup"; data: SubgroupDTO };

export type GroupItemsDTO = GroupItemDTO[];

export class GroupViewModel {

    private isLinkInGroupAndEnv =
        (environmentId: string, groupId: string) =>
            (link: Link | Subgroup): boolean =>
                link.environmentId === environmentId &&
                link.groupId === groupId;

    private isRootGroupLink =
        () =>
            (link: Link): boolean =>
                link.subGroupId == null && link.subGroupId == ""

    readonly groupItemsObservable: ObservableValue<GroupItemsDTO>
        = new ObservableValue(null as any);

    constructor(repo: AppStateRepository, groupId: string) {
        repo.state$
            .pick("subgroups", "links", "activeEnvironmentId")
            .subscribe(attrs => {

                // console.log("-----------------------");
                // console.log("subscribed na grup data");
                // console.log(attrs.links);
                // console.log(attrs);
                // console.log(attrs.subgroups);
                // console.log("-----------------------");

                const currentEnvironmentId = attrs.activeEnvironmentId;

                // Links - any type
                // const groupItems: (Link | Subgroup)[] = Object
                //     .values(attrs.links)
                //     .filter(this.isLinkInGroupAndEnv(currentEnvironmentId, groupId));

                // sub-groups
                // groupItems.push(
                //     ...Object
                //         .values(attrs.subgroups)
                //         .filter(this.isLinkInGroupAndEnv(currentEnvironmentId, groupId)));

                // Transform flat structure of separated links and subgroup into map-like structure

                const groupItems: GroupItemsDTO = [];

                // map "root group" links into viewModel structure
                Object
                    .values(attrs.links)
                    .filter(this.isLinkInGroupAndEnv(currentEnvironmentId, groupId) && this.isRootGroupLink())
                    .map(link => link.);

                // fill root groups into viewModel structure

                // fill "subgroup" links into each groups

                // order 1st level items (root links, subgroups)

                // order 2nd level items (links in each subgroup)

                this.groupItemsObservable.set(groupItems);
            });
    }

}

