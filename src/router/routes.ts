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
            }
        ]
    },

    // Always leave this as last one,
    // but you can also remove it
    {
        path: "/:catchAll(.*)*",
        component: () => import("pages/ErrorNotFound.vue")
    }
];

export default routes;
