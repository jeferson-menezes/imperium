export enum Direction {
    ASC = "ASC",
    DESC = "DESC"
}

export interface Pageable {
    value: number;
    size: number;
    page: number;
    sort?: string[];
    direction: Direction;
}

export interface Page<T> {
    content: T[];
    empty: boolean;
    first: boolean;
    last: boolean;
    number: number;
    numberOfElements: number;
    size: number;
    sort: any;
    totalElements: number;
    totalPages: number;
}
