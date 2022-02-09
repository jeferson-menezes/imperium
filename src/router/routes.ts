import { routes as login } from "../views/auth";
import { routes as home } from "../views/home";
import { routes as receita } from "../views/receita";
import { routes as despesa } from "../views/despesa";

export default [
    ...login,
    ...home,
    ...despesa,
    ...receita
] 