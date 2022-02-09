export default [
    {
        name: 'login',
        path: '/',
        meta: { icon: 'mdi-login', title: 'Login', show: false },
        component: () => import(/* webpackChunkName: "login" */'./Login.vue')
    }
]