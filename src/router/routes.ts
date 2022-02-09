import { routes as login } from "../views/auth";
import { routes as home } from "../views/home";
import { routes as receita } from "../views/receita";
import { routes as despesa } from "../views/despesa";
import { routes as categoria } from "../views/categoria";


export default [
    ...login,
    ...home,
    ...despesa,
    ...receita,
    ...categoria
] 