<template>
    <div class="wrapper">
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
        <footer></footer>
    </div>
</template>

<script lang='ts'>
    import { Component, Prop, Vue } from "vue-property-decorator";  
    import { State, Action, Mutation } from "vuex-class";
    @Component
    export default class WayTable extends Vue{

    }
</script>

<style lang="less" scoped>
.wrapper{
    width: 100%;
    height: 100%;
    background-color: #fff;
    padding: 40px;
}
</style>