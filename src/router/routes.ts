import { RouteRecordRaw } from "vue-router";
import accesslayout from "src/layouts/access.routes";
import mainlayout from "src/layouts/main.routes";

const routes: RouteRecordRaw[] = [
    ...accesslayout,
    ...mainlayout,
    {
        path: "/:catchAll(.*)*",
        component: () => import("pages/ErrorNotFound.vue")
    }
];

export default routes;
