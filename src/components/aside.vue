<template>
    <aside >
        <template v-for="item in list" >
         <el-submenu v-if="item.children && item.children !== null" :key='item.path' :index="item.path" class="item">
            <template slot="title" class='items'>
                <i :class="item.meta" style='color:white;'></i>
                <span slot="title">{{item.meta.title}}</span>
            </template>
            <el-menu-item-group>
                <Aside  :list='item.children'/>
            </el-menu-item-group>
        </el-submenu>
        <el-menu-item v-else-if='!item.children && item.children == null && !item.meta.hiddle' :key='item.path' :index="item.path" class="item" >
            <template slot="title" class='items'>
                <i :class="item.meta" style='color:white;'></i>
                <span slot="title">{{item.meta.title}}</span>
            </template>
        </el-menu-item>
        
        </template>
    </aside>
</template>

<script>
    import { Component, Prop, Vue } from "vue-property-decorator";  
    import { State, Action, Mutation } from "vuex-class";
    import Aside from './aside.vue';
    export default {
        name:"Aside",
        props: {
            list: {
                type: Array,
                default: []
            },
        },
        data() {
            return {
                isCollapse:false
            }
        },
        mounted () {
        },
        methods: {
        handleOpen(){

        },
        handleClose(){

        }
        },
    }
    // @Component({
    //     components:{
    //         Aside
    //     }
    // })
    // export default class AsideList extends Vue {
    //     private isCollapse:boolean = false;
    //     @Prop() list!:Array<object>
    //     constructor(){
    //         super();
            
    //     }
    //     name:'Vnode'
    //     mounted () {
    //         console.log('this========>',this)
    //     }
    //     methods: {}
    //     private handleOpen(){

    //     }
    //     private handleClose(){

    //     }
    // }
</script>

<style lang="less" scoped>
.item{
    padding: 0;
}
.items,.item{
    text-align: left;
}
</style>