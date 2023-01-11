export default [
    {
        path: "proventos",
        name: "proventos",
        component: () => import("pages/provento/ProventosPage.vue")
    },
    {
        path: "provento/form/:id?",
        name: "provento-form",
        component: () => import("pages/provento/ProventoFormPage.vue")
    }
];
