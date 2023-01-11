export default [
    {
        path: "receitas",
        name: "receitas",
        component: () => import("pages/receita/ReceitasPage.vue")
    },
    {
        path: "receita/form/:id?",
        name: "receita-form",
        component: () => import("pages/receita/ReceitaFormPage.vue")
    }
];
