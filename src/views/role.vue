<template>
    <div>
        <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="用户ID">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="用户名">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="角色信息">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="角色类型">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
        </el-form>
    </div>
</template>

<script lang='ts'>
    import { Component, Prop, Vue } from "vue-property-decorator";  
    import { State, Action, Mutation } from "vuex-class";
    @Component
    export default class Role extends Vue{
        
    }
</script>

<style lang="scss" scoped>

</style>