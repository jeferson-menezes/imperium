import * as currency from "currency.js";

export const toDolar = (value: string | number | currency) =>
    currency.default(value, { separator: ".", decimal: "," }).format({
        decimal: ".",
        symbol: "",
        separator: ""
    });

export const toReal = (value: string | number | currency) =>
    currency.default(value).format({
        decimal: ",",
        symbol: ""
    });

export const toRealSymbol = (value: string | number | currency) =>
    currency.default(value).format({
        decimal: ",",
        separator: "",
        symbol: "R$ "
    });

// export const toDolar = (valor) => {currency()};
