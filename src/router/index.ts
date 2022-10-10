import { useAuthStore } from "./../stores/auth-store";
import { route } from "quasar/wrappers";
import {
    createMemoryHistory,
    createRouter,
    createWebHashHistory,
    createWebHistory
} from "vue-router";
import routes from "./routes";

export default route(
    function(/* { store, ssrContext } */) {
        const createHistory = process.env.SERVER
            ? createMemoryHistory
            : process.env.VUE_ROUTER_MODE === "history"
              ? createWebHistory
              : createWebHashHistory;

        const Router = createRouter({
            scrollBehavior: () => ({ left: 0, top: 0 }),
            routes,
            history: createHistory(
                process.env.MODE === "ssr"
                    ? void 0
                    : process.env.VUE_ROUTER_BASE
            )
        });

        Router.beforeEach(async (to, from, next) => {
            const authStore = useAuthStore();
            try {
                if (!authStore.isLoggedIn && to.meta.requiresAuth) {
                    await authStore.checaToken();
                    next();
                } else {
                    next();
                }
            } catch (error) {
                return { name: "login" };
            }
        });

        return Router;
    }
);
