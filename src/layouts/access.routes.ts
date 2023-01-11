export default [
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
    }
];
