export const ehAno = (value: string) =>
    value.length === 4 && /\d{4}/g.test(value);

export const ehMes = (value: string) =>
    value.length === 7 && /\d{2}\/\d{4}/g.test(value);

export const ehData = (value: string) =>
    value.length === 10 && /\d{2}\/\d{2}\/\d{4}/g.test(value);

export const ehValor = (value: string) =>
    /\s*(?:[1-9]\d{0,2}(?:\d{3})*|0),\d{2}$/g.test(value);

export const ehTexto = (value: string) =>
    /[a-zA-Z\u00C0-\u00FF ]+$/g.test(value);
