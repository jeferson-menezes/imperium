export interface Tag {
    uid: string;
    id: number;
    name: string;
}

export interface Icon {
    uid: number;
    id: string;
    name: string;
    data: string;
    tag: Tag;
}
