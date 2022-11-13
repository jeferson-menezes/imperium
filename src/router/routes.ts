import { RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
    {
        path: "/",
        component: () => import("src/layouts/AccessLayout.vue"),
        children: [
            {
                path: "",
                name: "login",
                component: () => import("pages/acesso/LoginPage.vue")
            }
        ]
    },
    {
        path: "/",
        component: () => import("layouts/MainLayout.vue"),
        children: [
            {
                path: "home",
                name: "home",
                component: () => import("pages/home/HomePage.vue")
            },
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
            },

            {
                path: "despesas",
                name: "despesas",
                component: () => import("pages/despesa/DespesasPage.vue")
            },
            {
                path: "despesa/form/:id?",
                name: "despesa-form",
                component: () => import("pages/despesa/DespesaFormPage.vue")
            },
            {
                path: "receitas",
                name: "receitas",
                component: () => import("pages/receita/ReceitasPage.vue")
            },
            {
                path: "receita/form/:id?",
                name: "receita-form",
                component: () => import("pages/receita/ReceitaFormPage.vue")
            },
            {
                path: "proventos",
                name: "proventos",
                component: () => import("pages/provento/ProventosPage.vue")
            },
            {
                path: "provento/form/:id?",
                name: "provento-form",
                component: () => import("pages/provento/ProventoFormPage.vue")
            },
            {
                path: "configuracao",
                name: "configuracao",
                component: () =>
                    import("pages/configuracao/ConfiguracaoPage.vue"),
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
        ],
        meta: { requiresAuth: true }
    },

    // Always leave this as last one,
    // but you can also remove it
    {
        path: "/:catchAll(.*)*",
        component: () => import("pages/ErrorNotFound.vue")
    }
];

export default routes;
