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
                <el-form-item label="用户电话">
                    <el-input v-model="form.mobile"></el-input>
                </el-form-item>
                <el-form-item label="角色类型">
                    <el-select v-model="form.roleId" placeholder="请选择">
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
                    <el-button type='primary' @click="seacher">搜索</el-button>
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
                row-class-name="tableRowClassName">
                    <el-table-column
                    prop="id"
                    label="用户ID"
                    align='center'
                    width="180">
                    </el-table-column>
                    <el-table-column
                    prop="username"
                    label="用户名"
                    align='center'
                    width="180">
                    </el-table-column>
                    <el-table-column
                    prop="mobile"
                    align='center'
                    label="手机号">
                    </el-table-column>
                    <el-table-column
                    prop="userRole.roleId"
                    align='center'
                    label="用户角色">
                    </el-table-column>
                    <el-table-column
                    prop="address"
                    align='center'
                    label="操作">
                    <template slot-scope="scope">
                        <el-button type="text" size="small">查看</el-button>
                        <el-button @click="handleClick(scope.row)" type="text" size="small">编辑</el-button>
                    </template>
                    </el-table-column>
                </el-table>
            </template>
        </main>
        <footer>
            <el-button @click='download'>下载</el-button>
            <el-pagination
            background
            layout="prev, pager, next"
            :total="1000">
            </el-pagination>
        </footer>
        <!-- 修改用户信息 -->
        <div class="detilBox" v-if="show">
            <el-form :model="form" label-width="80px">
                
                <h5 class='detail_title'>用户详情</h5>
                <el-form-item label="用户id">
                    <el-input v-model="detailms.id" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="用户名">
                    <el-input v-model="detailms.username"></el-input>
                </el-form-item>
                <el-form-item label="手机号码">
                    <el-input v-model="detailms.mobile"></el-input>
                </el-form-item>
                <el-form-item label="邮箱号码">
                    <el-input v-model="detailms.email"></el-input>
                </el-form-item>
                <el-form-item label="用户角色"  style='text-align: left;'>
                    <el-select v-model="value" placeholder="请选择">
                        <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item class="setoption">
                    <el-button @click="show = false">取消</el-button>
                    <el-button type="primary" @click="changeDetail">保存</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script lang='ts'>
    import { Component, Prop, Vue } from "vue-property-decorator";  
    import { State, Action, Mutation } from "vuex-class";
    import login_api from '../api/login'
    import tool_api from '../api/tool'
    @Component
    export default class Role extends Vue{
        private form:object = {
            name:'',
            id:'',
            mobile:'',
            roleId:'',
            offset:0,
            limit:10
        };
        tableData = []
        private usertype:string=''
        private show:boolean = false;
        private value:string=''
        private detailms:object = {
            userRole:{
                
            }
        }
        private options:Array<object> = [
            {
                label:'司机',
                value:0
            },
            {
                label:'超级管理员',
                value:1
            }
        ]
        mounted () {
            this.userList();
        }
        async seacher(){
            this.userList()
        }
        async handleClick(msg){
            this.detailms = JSON.parse(JSON.stringify(msg));
            this.value = this.detailms['userRole']['roleId']
            console.log(this.value)
            this.show = true;
        }
        //获取数据列表
        async userList(){
            let res = await login_api.getUserList(this.form)
            this.tableData = res.data.rows.map(item=>{
                item.userRole.roleId = item.userRole.roleId === 0 ? '司机':'管理员'
                return item
            })
            console.log('res',res)
        }
        //修改用户详细信息
        async changeDetail(){
            this.detailms['userRole']['roleId'] = this.value === '司机' ? 0:1
            let res = await login_api.changeDetail(this.detailms);
            
            this.show = !this.show;
            console.log(res,'res')
        }
        //下载文件
        async download(){
            let res = await tool_api.downLoad(this.form)
        }
    }
</script>

<style lang="less" scoped>
.wrapper{
    width: 100%;
    height: 90%;
    position: relative;
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
        justify-content: space-between;
        button{
            margin-left: 20px;
        }
    }
    .right{
        display: flex;
        justify-content: flex-end;
    }
    .detilBox{
        position: absolute;
        left: 50%;
        top:50%;
        transform: translate(-50%,-50%);
        background-color: #fff;
        box-shadow: 0px 0px 5px rgb(187, 182, 182);
        padding: 40px;
        width: 500px;
        border-radius: 5px;
        .detail_title{
            text-align: center;
            padding: 20px;
            font-size: 24px;
            color: #000;
        }
        .setoption{
            text-align: right;
            button{
                margin-left: 40px;
            }
        }
    }
}
</style>