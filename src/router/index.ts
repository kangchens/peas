import Vue from 'vue';
import vueRouter from 'vue-router';
import Home from '../views/Home.vue';
import About from '../views/About.vue';
Vue.use(vueRouter)
export default new vueRouter({
    mode:'hash',
    routes:[
        {
            path:'/home',
            redirect: '/home/datacenter',
            component: () => import(/* webpackChunkName: "Home" */ '../views/Home.vue'),
            children:[
                {
                    path:'/home/datacenter',
                    component:() => import('../views/datacenter/datacentert.vue')
                },
                {
                    path:'/home/tableWay',
                    component:() => import('../views/datacenter/tableWay.vue')
                },
                {
                    path:'/chart',
                    component: () => import(/* webpackChunkName: "Home" */ '../views/chatting/chart.vue')
                },
                {
                    path:'/home/role',
                    component:() => import('../views/role.vue')
                }
            ]
        },
        {
            path:'/about',
            component: () => import(/* webpackChunkName: "Home" */ '../views/About.vue')
        },
        {
            path:'/login',
            component: () => import(/* webpackChunkName: "Home" */ '../views/Login.vue')
        },
        {
            path: '*',
            redirect: '/login'
        }
    ]
})