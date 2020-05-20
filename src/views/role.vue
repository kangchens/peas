<template>
    <div class="wrapper">
        <!-- 检索栏 -->
        <el-form ref="form" :inline="true" :model="form" label-width="80px" class="demo-form-inline clearboth">
            <el-col :span='24' class="left">
                <el-form-item label="用户ID">
                    <el-input v-model="form.id"></el-input>
                </el-form-item>
                <el-form-item label="用户名">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="角色信息">
                    <el-input v-model="form.msg"></el-input>
                </el-form-item>
                <el-form-item label="角色类型">
                    <el-select v-model="usertype" placeholder="请选择">
                        <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span='24' class="right">
                <el-form-item>
                    <el-button type='primary'>搜索</el-button>
                </el-form-item>
            </el-col>
        </el-form>
        <!-- 表格页面 -->
        <main>
            <template>
                <el-table
                :data="tableData"
                height="500"
                style="width: 100%"
                :border='true'
                size="medium"
                align='center'
                :header-cell-style="{background:'rgba(235,243,239)',color:'#666666'}"
                :row-class-name="tableRowClassName">
                    <el-table-column
                    prop="date"
                    label="用户ID"
                    align='center'
                    width="180">
                    </el-table-column>
                    <el-table-column
                    prop="name"
                    label="用户名"
                    align='center'
                    width="180">
                    </el-table-column>
                    <el-table-column
                    prop="address"
                    align='center'
                    label="用户信息">
                    </el-table-column>
                    <el-table-column
                    prop="address"
                    align='center'
                    label="用户角色">
                    </el-table-column>
                    <el-table-column
                    prop="address"
                    align='center'
                    label="操作">
                    <template slot-scope="scope">
                        <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
                        <el-button type="text" size="small">编辑</el-button>
                    </template>
                    </el-table-column>
                </el-table>
            </template>
        </main>
        <footer>
            <el-pagination
            background
            layout="prev, pager, next"
            :total="1000">
            </el-pagination>
        </footer>
    </div>
</template>

<script lang='ts'>
    import { Component, Prop, Vue } from "vue-property-decorator";  
    import { State, Action, Mutation } from "vuex-class";
    import login_api from '../api/login'
    @Component
    export default class Role extends Vue{
        private form:object = {
            name:'',
            id:'',
            msg:'',
            type:null
        };
        private usertype:string=''
        private options:Array<object> = [
            {
                label:'超级管理员',
                value:0
            },
            {
                label:'管理员',
                value:1
            },
            {
                label:'普通用户',
                value:2
            }
        ]
        mounted () {
            this.userList();
        }
        async userList(){
            let res = await login_api.getUserList({
                name:'',
                id:'',
                mobile:'',
                roleId:'',
                offset:0,
                limit:10
            })
            console.log('res',res)
        }
    }
</script>

<style lang="less" scoped>
.wrapper{
    width: 100%;
    height: 90%;
    .left{
        display: flex;
        justify-content: space-between;
    }
    .demo-form-inline{
        padding:40px 0;
        background-color: #fff;
    }
    main{
        margin: 10px 0;
    }
    footer{
        background-color: #fff;
        display: flex;
        padding: 30px 0;
        justify-content: flex-end;
    }
    .right{
        display: flex;
        justify-content: flex-end;
    }
}
</style>