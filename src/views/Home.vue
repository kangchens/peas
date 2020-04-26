<template>
    <div class='home'>
        <nav><h3>后台管理系统</h3></nav>
        <main class="clearboth">
            <aside class="turn-left">
                <el-menu
                default-active="/home/datacenter"
                class="el-menu-vertical-demo"
                background-color="#222a3d"
                text-color="#fff"
                active-text-color="#ffd04b"
                mode="vertical"
                @open="handleOpen"
                :router="true"
                @close="handleClose"
                menu-trigge="click"
                :collapse="isCollapse"
                >
                    <Aside :list='asideList'></Aside>
                </el-menu>
            </aside>
            <div class="content turn-left">
                <router-view></router-view>
            </div>
        </main>
    </div>
</template>

<script lang='ts'>
    import { Component, Prop, Vue } from "vue-property-decorator";  
    import { State, Action, Mutation } from "vuex-class";
    import Aside from '../components/aside.vue';
    @Component({
        components:{
            Aside
        }
    })
    export default class HomePage extends Vue{
        
        private isCollapse:boolean = false;
        private asideList:object[];
        constructor(){
            super();
            this.asideList = [{
                title:"数据中心",
                path:'/home/datacenter',
                iocn:'el-icon-user-solid',
                index:1,
                children:null
            },{
                title:"权限管理",
                path:'/role',
                iocn:'el-icon-user-solid',
                index:2,
                children:null
            },{
                title:"权威设置",
                path:'/roles',
                iocn:'el-icon-user-solid',
                index:3,
                children:[
                    {
                        title:"用户协议",
                        path:'/roleUser',
                        iocn:'',
                        index:3-1,
                        children:[
                            {
                                title:"端口配置",
                                path:'/role',
                                index:3-1-1,
                                iocn:'',
                            }
                        ]
                    },{
                        title:"产权配比",
                        path:'/roletype',
                        index:3-2,
                        iocn:'',
                        children:[
                            {
                                title:"协议配置",
                                path:'/roleset',
                                iocn:'',
                            }
                        ]
                    }
                ]
            }]
        }
        private handleOpen(){

        }
        private handleClose(){

        }
    }
</script>

<style lang="less" scoped>
.home{
    nav{
        height: 50px;
        background-color: #222a3d;
        padding: 0 60px;
        line-height: 50px;
        h3{
            font-family: cursive;
            font-size: 24px;
            color: white;
            text-align: left;
        }
    }
    aside{
        background-color: #222a3d;
        height: calc(100vh - 50px);
        width: 200px;
        .el-menu-vertical-demo{
            height: 100%;
            .item{
                padding: 0;
            }
        }
    }
    .content{
        height: calc(100vh - 50px);
        width: calc(100% - 200px);
    }
}

</style>