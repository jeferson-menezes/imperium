import { date } from "quasar";

export class DateHelpper {
    static brToUs(data: string) {
        if (!data) return "";
        return data.split("/").reverse().join("-");
    }

    static usToBr(data: string) {
        if (!data) return "";
        return data.split("-").reverse().join("/");
    }
}

export const formatDate = (d: string, f: string) => date.formatDate(d, f);
