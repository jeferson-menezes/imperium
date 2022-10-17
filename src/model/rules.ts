import { ValidationRule } from "quasar";

export const required = (text: string): any => {
    return (v: string) => !!v || text;
};

export const email = (text: string) => {
    return (v: string) => /.+@.+/.test(v) || text;
};

export const minLength = (text: string, value: number) => {
    return (v: string) => v.length > value - 1 || text;
};

export const maxLength = (text: string, value: number) => {
    return (v: string) => v.length < value + 1 || text;
};

export const maxNum = (text: string, max: number) => {
    return (v: string) => +v < max + 1 || text;
};

export const minNum = (text: string, min: number) => {
    return (v: string) => +v > min - 1 || text;
};
