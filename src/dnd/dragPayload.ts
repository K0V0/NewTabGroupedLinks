export type DragPayload =
    | {
    kind: "link";
    linkId: string;
    groupId: string;
    fromSubgroupId?: string;
}
    | {
    kind: "subgroup";
    subgroupId: string;
    groupId: string;
};

const MIME = "application/x-workspace-dnd";

export function setDragPayload(e: DragEvent, payload: DragPayload) {
    e.dataTransfer?.setData(MIME, JSON.stringify(payload));
    e.dataTransfer!.effectAllowed = "move";
}

export function getDragPayload(e: DragEvent): DragPayload | null {
    const raw = e.dataTransfer?.getData(MIME);
    if (!raw) return null;
    return JSON.parse(raw);
}