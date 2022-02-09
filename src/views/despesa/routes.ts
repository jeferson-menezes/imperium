export default [
    {
        name: 'despesa',
        path: '/despesa',
        meta: { icon: 'mdi-home', title: 'Despesa', show: true },
        component: () => import(/* webpackChunkName: "despesa" */'./Despesa.vue')
    }
]