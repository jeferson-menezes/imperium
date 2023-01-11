export default [
    {
        path: "posicoes",
        name: "posicoes",
        component: () => import("pages/posicao/PosicoesPage.vue")
    },
    {
        path: "posicoes/negociacao/form/:id?",
        name: "negociacao-form",
        component: () => import("pages/posicao/NegociacaoFormPage.vue")
    }
];
