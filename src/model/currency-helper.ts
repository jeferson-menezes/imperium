import * as currency from "currency.js";

export const toReal = (value: string | number | currency) =>
    currency.default(value).format({
        decimal: ",",
        symbol: ""
    });

export const toRealSymbol = (value: string | number | currency) =>
    currency.default(value).format({
        decimal: ",",
        symbol: "R$ "
    });
// export const toDolar = (valor) => {currency()};
