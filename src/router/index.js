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
            component: () => import(/* webpackChunkName: "Home" */ '../views/Home.vue')
        },
        {
            path:'/about',
            component: () => import(/* webpackChunkName: "Home" */ '../views/About.vue')
        },
        {
            path: '*',
            redirect: '/Home'
        }
    ]
})