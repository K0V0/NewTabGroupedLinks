
export interface GroupItemDTO {
    type: string;
    id: string;
}

export interface LinkDTO extends GroupItemDTO{
    title: string;
    url: string;
    position: number;
}

export interface SubgroupDTO extends GroupItemDTO {
    title: string;
    links: LinkDTO[];
    position: number;
}

export type GroupItemsDTO = GroupItemDTO[];

export interface GroupDTO {
    groupItems:  GroupItemDTO[];
    groupId: string;
}
