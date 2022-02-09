export default [
    {
        name: 'home',
        path: '/home',
        meta: { icon: 'mdi-home', title: 'Home', show: true },
        component: () => import(/* webpackChunkName: "home" */'./Home.vue')
    }
]