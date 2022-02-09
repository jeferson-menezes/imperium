import routes from "./routes";
import { createRouter, createWebHashHistory, NavigationGuard, NavigationGuardNext, RouteLocationNormalized } from "vue-router";
import beforeEach from "./before-each";

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

router.beforeEach(beforeEach)

export default router