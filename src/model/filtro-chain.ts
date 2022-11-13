import { toDolar } from "./currency-helper";
import { ehAno, ehData, ehMes, ehTexto, ehValor } from "./pattern-helper";

export interface Params {
    ano?: string;
    mes?: string;
    valor?: string;
    data?: string;
    descricao?: string;
}

export abstract class FilterPattern {
    // eslint-disable-next-line no-use-before-define
    proximo: FilterPattern;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    constructor(proximo: FilterPattern | any) {
        this.proximo = proximo;
    }

    abstract verifica(filter: string): Params;
}

export class FilterEhAno extends FilterPattern {
    // eslint-disable-next-line no-useless-constructor
    constructor(proximo: FilterPattern) {
        super(proximo);
    }

    verifica(filter: string): Params {
        if (ehAno(filter)) {
            return { ano: filter };
        }
        return this.proximo.verifica(filter);
    }
}

export class FilterEhMes extends FilterPattern {
    // eslint-disable-next-line no-useless-constructor
    constructor(proximo: FilterPattern) {
        super(proximo);
    }

    verifica(filter: string): Params {
        if (ehMes(filter)) {
            return { mes: filter.split("/").reverse().join("-") };
        }
        return this.proximo.verifica(filter);
    }
}

export class FilterEhData extends FilterPattern {
    // eslint-disable-next-line no-useless-constructor
    constructor(proximo: FilterPattern) {
        super(proximo);
    }

    verifica(filter: string): Params {
        if (ehData(filter)) {
            return { data: filter.split("/").reverse().join("-") };
        }
        return this.proximo.verifica(filter);
    }
}

export class FilterEhValor extends FilterPattern {
    // eslint-disable-next-line no-useless-constructor
    constructor(proximo: FilterPattern) {
        super(proximo);
    }

    verifica(filter: string): Params {
        if (ehValor(filter)) {
            return { valor: toDolar(filter) };
        }
        return this.proximo.verifica(filter);
    }
}

export class FilterEhTexto extends FilterPattern {
    // eslint-disable-next-line no-useless-constructor
    constructor(proximo: FilterPattern) {
        super(proximo);
    }

    verifica(filter: string): Params {
        if (ehTexto(filter)) {
            return { descricao: filter };
        }
        return this.proximo.verifica(filter);
    }
}

export class FilterVazio extends FilterPattern {
    // eslint-disable-next-line no-useless-constructor
    constructor() {
        super(undefined);
    }

    verifica(filter: string): Params {
        if (filter) {
            return {};
        }
        return {};
    }
}
