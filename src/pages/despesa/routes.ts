export default [
    {
        path: "despesas",
        name: "despesas",
        component: () => import("pages/despesa/DespesasPage.vue")
    },
    {
        path: "despesa/form/:id?",
        name: "despesa-form",
        component: () => import("pages/despesa/DespesaFormPage.vue")
    }
];
