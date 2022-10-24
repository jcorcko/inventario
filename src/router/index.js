import { createRouter,createWebHistory } from "vue-router";


const routes=[
    {
        path: '/',
        name: 'home',
        component: () => import('../views/HomeView.vue')
    },
    {
        path: '/departamentos',
        name: 'departamentos',
        component: () => import('../views/DepartamentoListView.vue')
    },
    {
        path: '/departamentos/nuevo',
        name: 'departamentosNuevo',
        component: () => import('../views/DepartamentoView.vue')
    },
    {
        path: '/departamentos/modificar/:id',
        name: 'departamentosModificar',
        component: () => import('../views/DepartamentoEdicionView.vue')
    },

    {
        path: '/activos',
        name: 'activos',
        component: () => import('../views/ActivoListView.vue')
    },
    {
        path: '/activos/nuevo',
        name: 'activosNuevo',
        component: () => import('../views/ActivoView.vue'),
        
    },
    {
        path: '/activos/modificar/:id',
        name: 'activosModificar',
        component: () => import('../views/ActivoEdicionView.vue')
    },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
});

export default router;