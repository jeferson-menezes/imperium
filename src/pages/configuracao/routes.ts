export default [
    {
        path: "configuracao",
        name: "configuracao",
        component: () => import("pages/configuracao/ConfiguracaoPage.vue"),
        children: [
            {
                path: "categorias",
                name: "categorias",
                component: () =>
                    import("pages/configuracao/categoria/CategoriasPage.vue")
            },
            {
                path: "categoria/form/:id?",
                name: "categoria-form",
                component: () =>
                    import("pages/configuracao/categoria/CategoriaFormPage.vue")
            },
            {
                path: "ativos",
                name: "ativos",
                component: () =>
                    import("pages/configuracao/ativo/AtivosPage.vue")
            },
            {
                path: "ativo/form/:id?",
                name: "ativo-form",
                component: () =>
                    import("pages/configuracao/ativo/AtivoFormPage.vue")
            },
            {
                path: "ativo/imagem/form/:id?",
                name: "ativo-imagem-form",
                component: () =>
                    import("pages/configuracao/ativo/AtivoImagemFormPage.vue")
            },
            {
                path: "setores",
                name: "setores",
                component: () =>
                    import("pages/configuracao/setor/SetoresPage.vue")
            },
            {
                path: "setor/form/:id?",
                name: "setor-form",
                component: () =>
                    import("pages/configuracao/setor/SetorFormPage.vue")
            }
        ]
    }
];
