  import axios, { AxiosInstance } from "axios";
import { Notify } from "quasar";
import { boot } from "quasar/wrappers";
import { useAuthStore } from "src/stores/auth-store";

declare module "@vue/runtime-core" {
    interface ComponentCustomProperties {
        $axios: AxiosInstance;
    }
}
const externo = window.location.origin === process.env.ORIGIN_EXTERNO

let baseURL = externo ? process.env.IMPERIUM_API_EXTERNO : process.env.IMPERIUM_API_INTERNO;
let baseURLColors = externo ? process.env.ICONS_API_EXTERNO : process.env.ICONS_API_INTERNO;

if (process.env.NODE_ENV === 'development') {
  baseURL = 'http://localhost:8081'
  baseURLColors = 'http://localhost:8082'
}

const api = axios.create({ baseURL });
const colors = axios.create({ baseURL: baseURLColors });

const setBearerToken = (token: string) => {
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export default boot(({ app, router }) => {
    api.interceptors.response.use((response) => response, (error) => {
      const authStore = useAuthStore();
      if (error?.response?.status === 403) {
        authStore.actionLogout()
        router.replace({ name: 'login' })
        Notify.create({ message: 'Token expirou', type: 'negative' })
      }
      return Promise.reject(error.response.data);
    })

    app.config.globalProperties.$axios = axios;
    app.config.globalProperties.$api = api;
});

export { api, colors, setBearerToken };
