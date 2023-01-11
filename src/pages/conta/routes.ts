export default [
    {
        path: "contas",
        name: "contas",
        component: () => import("pages/conta/ContasPage.vue")
    },
    {
        path: "conta/form/:id?",
        name: "conta-form",
        component: () => import("pages/conta/ContaFormPage.vue")
    },
    {
        path: "conta/detalhe/:id",
        name: "conta-detalhe",
        component: () => import("pages/conta/ContaDetalhePage.vue")
    }
];
