export interface Field {
    field: string;
    message: string;
}

export interface ErrorResponse {
    developerMessage: string;
    message: string;
    status: number;
    timestamp: string;
    title: string;
    fields?: Field[];
}
