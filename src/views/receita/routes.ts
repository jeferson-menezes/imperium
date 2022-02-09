export default [
    {
        name: 'receita',
        path: '/receita',
        meta: { icon: 'mdi-home', title: 'Receita', show: true },
        component: () => import(/* webpackChunkName: "receita" */'./Receita.vue')
    }
]