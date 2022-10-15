export interface Paleta {
    id: number;
    name: string;
}

export interface Color {
    id: number;
    hexa: string;
    name: string;
    palette: Paleta;
}
