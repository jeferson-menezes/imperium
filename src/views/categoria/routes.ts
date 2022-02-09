export default [
    {
        name: 'categoria',
        path: '/categoria',
        meta: { icon: 'mdi-shape-outline', title: 'Categoria', show: true },
        component: () => import(/* webpackChunkName: "categoria" */'./Categoria.vue')
    }
]