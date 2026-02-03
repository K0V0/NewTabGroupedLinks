import {ObservableValue} from "../utils/observableValue";
import {AppStateRepository} from "../backend/repository/AppStateRepository";
import {Link, Subgroup} from "../backend/entity/AppStateEntity";

export interface GroupItemDTO {
    type: string;
}

export interface LinkDTO extends GroupItemDTO{
    id: string;
    title: string;
    url: string;
    position: number;
}

export interface SubgroupDTO extends GroupItemDTO {
    id: string;
    title: string;
    links: LinkDTO[];
    position: number;
}

export type GroupItemsDTO = GroupItemDTO[];

export class GroupViewModel {

    private isLinkInGroupAndEnv =
        (environmentId: string, groupId: string) =>
            (groupItem: Link | Subgroup): boolean =>
                groupItem.environmentId === environmentId &&
                groupItem.groupId === groupId;

    private isRootGroupLink =
        () =>
            (link: Link): boolean =>
                link.subGroupId === undefined || link.subGroupId === null || link.subGroupId === ""

    private isSubGroup =
        () =>
            (subgroup: Subgroup): boolean =>
                subgroup.url === undefined && subgroup.subGroupId === undefined

    private isSubGroupLink =
        () =>
            (link: Link): boolean =>
                link.subGroupId !== undefined && link.subGroupId !== null && link.subGroupId !== ""

    private toLinkDTO = (link: Link): LinkDTO => ({
        id: link.id,
        title: link.title,
        url: link.url,
        position: link.position,
        type: "link",
    });

    private toSubGroupDTO = (subgroup: Subgroup): SubgroupDTO => ({
        id: subgroup.id,
        title: subgroup.title,
        links: [],
        position: subgroup.position,
        type: "subgroup"
    });

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
                const links: Link[] = Object.values(attrs.links);
                const subGroups: Subgroup[] = Object.values(attrs.subgroups);

                const result: GroupItemsDTO = [];

                // fill "root group" links into viewModel structure
                result.push(...links
                    .filter((link: Link) =>
                        this.isLinkInGroupAndEnv(currentEnvironmentId, groupId)(link)
                        && this.isRootGroupLink()(link))
                    .map(this.toLinkDTO));

                // fill root groups into viewModel structure
                result.push(...subGroups
                    .filter((subgroup: Subgroup) => this.isSubGroup()(subgroup))
                    .map(this.toSubGroupDTO));

                // fill "subgroup" links into each subgroups
                result
                    .filter((groupItem: GroupItemDTO) => groupItem.type === "subgroup")
                    .forEach((subGroup: SubgroupDTO) => {
                        subGroup.links.push(...links
                            .filter((link: Link) => this.isSubGroupLink()(link))
                            .filter((link: Link) => link.subGroupId === subGroup.id)
                            .map(this.toLinkDTO));
                    });

                console.log("--------------------------------------");
                console.log(result);
                console.log("--------------------------------------");

                // order 1st level items (root links, subgroups)

                // order 2nd level items (links in each subgroup)

                this.groupItemsObservable.set(result);
            });
    }

}

