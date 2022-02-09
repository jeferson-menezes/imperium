import { useAuthStore } from "@/views/auth/store";
import { NavigationGuardNext, RouteLocationNormalized } from "vue-router";

export default async (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {

    console.log('res');
    
    try {
        const authStore = useAuthStore();
        if (to.name !== 'login' && !authStore.hasToken) {

            await authStore.actionChecaToken()

            next()
        } else {
            if (to.name === 'login' && authStore.hasToken) next({ name: 'home' })
            else next()
        }
    } catch (error) {
        next({ name: 'login' })
    }

}