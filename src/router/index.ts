/*
 * @Description: 
 * @Version: 2.0
 * @Autor: chenkang
 * @Date: 2020-11-09 16:26:39
 * @LastEditors: chenkang
 * @LastEditTime: 2021-06-02 10:03:41
 */
import Vue from 'vue';
import vueRouter from 'vue-router';
import Home from '../views/Home.vue';
import About from '../views/About.vue';
Vue.use(vueRouter)
export const routes = [
    {
        path:'/home',
        redirect: '/home/datacenter',
        component: () => import(/* webpackChunkName: "Home" */ '../views/Home.vue'),
        meta:{
            title:'控制中心',
            level:1
        },
        children:[
            {
                path:'/home/datacenter',
                component:() => import('../views/datacenter/datacentert.vue'),
                meta:{
                    title:'数据中心',
                    level:1
                }
            },
            {
                path:'/home/tableWay',
                component:() => import('../views/datacenter/tableWay.vue'),
                meta:{
                    title:'角色管理',
                    level:1
                }
            },
            {
                path:'/chart',
                component: () => import(/* webpackChunkName: "Home" */ '../views/chatting/chart.vue'),
                meta:{
                    title:'聊天室',
                    level:1
                }
            },
            {
                path:'/technologicalProcess',
                component:()=> import('../views/technologicalProcess/technologicalProcess.vue'),
                meta:{
                    title:'流程配置',
                    level:1
                }
            },
            {
                path:'/approvalProcess',
                component:()=> import('../views/approvalProcess/approvalProcess.vue'),
                meta:{
                    title:'审批流程配置',
                    level:1
                }
            },
            
            {
                path:'/home/role',
                component:() => import('../views/role.vue'),
                meta:{
                    title:'角色中心',
                    level:1
                }
            },
            {
                path:'/about',
                component: () => import(/* webpackChunkName: "Home" */ '../views/About.vue'),
                meta:{
                    title:'角色管理',
                    level:1
                }
            },
        ]
    },
    {
        path:'/login',
        component: () => import(/* webpackChunkName: "Home" */ '../views/Login.vue'),
        meta:{
            title:'角色管理',
            level:1,
            hiddle:true
        }
    },
    {
        path: '*',
        redirect: '/login',
        meta:{
            title:'角色管理',
            level:1,
            hiddle:true
        }
    }
]
export default new vueRouter({
    mode:'hash',
    routes
})