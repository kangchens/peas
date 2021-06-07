<template>
    <div class="wrapper">
        <main>
            <el-form :inline='true' label-width="80px" label-position="left">
                <el-row>
                    <el-col :span="6"  align='left'>
                        <el-form-item label='用户名'>
                            <el-input></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6"  align='left'>
                        <el-form-item label='用户角色'>
                            <el-input></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6"  align='left'>
                        <el-form-item label='用户邮箱'>
                            <el-input></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6"  align='right'>
                        <el-form-item label='电话号码'>
                            <el-input></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span='24' align='right'>
                        <el-form-item >
                            <el-button type='primary'>查询</el-button>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <template>
                <el-table
                :data="tableData"
                height="500"
                style="width: 100%"
                :border='true'
                size="medium"
                align='center'
                :header-cell-style="{background:'rgba(235,243,239)',color:'#666666'}"
                >
                    <el-table-column
                    prop="username"
                    label="用户名"
                    align='center'>
                    </el-table-column>
                    <el-table-column
                    prop="userRole.roleId"
                    label="用户角色"
                    align='center'>
                    </el-table-column>
                    <el-table-column
                    prop="email"
                    align='center'
                    label="邮箱地址">
                    </el-table-column>
                    <el-table-column
                    prop="mobile"
                    align='center'
                    label="联系电话">
                    </el-table-column>
                    <el-table-column
                    prop="address"
                    align='center'
                    label="操作">
                    <template slot-scope="scope">
                        <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
                        <el-button @click="editHandler(scope.row)"  type="text" size="small">编辑</el-button>
                    </template>
                    </el-table-column>
                </el-table>
            </template>
        </main>
        <footer>
             <div class="page">
                 <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page.sync="currentPage1"
                    :page-size="100"
                    layout="total, prev, pager, next"
                    :total="1000">
                </el-pagination>
             </div>
        </footer>
        <!-- 编辑用户信息 -->
        <el-dialog
            title="用户信息编辑"
            :visible.sync="dialogVisible"
            width="50%"
            :before-close="handleClose">
            <div class="visible">
                <el-form  label-width="120px">
                    <el-form-item label='用户ID'>
                        <el-input></el-input>
                    </el-form-item>
                    <el-form-item label='用户名'>
                        <el-input></el-input>
                    </el-form-item>
                    <el-form-item label='电话号码'>
                        <el-input></el-input>
                    </el-form-item>
                    <el-form-item label='邮箱号码'>
                        <el-input></el-input>
                    </el-form-item>
                    <el-form-item label='用户角色'>
                        <el-input></el-input>
                    </el-form-item>
                </el-form>
            </div>
            
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script lang='ts'>
    import { Component, Prop, Vue } from "vue-property-decorator";  
    import { State, Action, Mutation } from "vuex-class";
    import login from '../../api/login'
    @Component
    export default class WayTable extends Vue{
        constructor(){
            super()

        }
        private dialogVisible:boolean = false
        private tableData:Array<object> = [];
        private seach = {
            offset: 0,
            limit: 10
        }
        private detailOption:object ={
            
        }
        private mounted(){
            this.getList()
        }
        private async getList(){
            let result = await login.getUserList(this.seach)
            console.log(result)
            this.tableData = result.data.rows
        }
        private async editHandler(item){
            let result = await login.getDetail({id:item.id})
            console.log('result',result)
            this.dialogVisible = true
        }
        private handleSizeChange(page){

        }
        private handleCurrentChange(page){

        }
        private currentPage1(page){

        }
        private handleClose(){
            this.dialogVisible = false
        }
    }
</script>

<style lang="less" scoped>
.wrapper{
    width: 100%;
    height: 100%;
    background-color: #fff;
    padding: 40px;
}
footer{
    display: flex;
    justify-content: flex-end;
    .page{
        width: 50%;
    }
}
.visible{
    padding: 0 50px;
}
</style>