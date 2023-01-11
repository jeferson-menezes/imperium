import posicao from "src/pages/posicao/routes";
import home from "src/pages/home/routes";
import conta from "src/pages/conta/routes";
import despesa from "src/pages/despesa/routes";
import receita from "src/pages/receita/routes";
import provento from "src/pages/provento/routes";
import configuracao from "src/pages/configuracao/routes";

export default [
    {
        path: "/",
        component: () => import("layouts/MainLayout.vue"),
        children: [
            ...home,
            ...conta,
            ...despesa,
            ...receita,
            ...provento,
            ...configuracao,
            ...posicao
        ],
        meta: { requiresAuth: true }
    }
];
