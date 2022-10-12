import * as currency from "currency.js";

export const toReal = (value: string | number) =>
    currency.default(value).format({
        decimal: ",",
        symbol: ""
    });

// export const toDolar = (valor) => {currency()};
