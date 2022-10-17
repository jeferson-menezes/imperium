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
