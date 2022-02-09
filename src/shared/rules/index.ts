export const required = (text: string) => {
    return (v: any) => !!v || text
}

export const email = (text: string) => {
    return (v: string) => /.+@.+/.test(v) || text
}

export const maxNum = (text: string, max: number) => {
    return (v: any) => +v < max + 1 || text
}

export const minNum = (text: string, min: number) => {
    return (v: any) => +v > min - 1 || text
}

export const real = (text: string) => {
    // return v => d{1,3}(\.\d{3})*,\d{2}.test(v) || text
}
