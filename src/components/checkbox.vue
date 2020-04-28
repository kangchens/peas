<template>
    <div>
        <input type="checkbox" id="forget" @change="changeHnadler"><label for="forget">忘记密码</label>
    </div>
</template>

<script lang='ts'>

    import { Component, Prop, Vue,Emit } from "vue-property-decorator";  
    import { State, Action, Mutation } from "vuex-class";
    @Component
    export default class CheckBox extends Vue {
        @Prop() title
        constructor(){
            super()
        }
        mounted () {
            console.log('this',this);
            console.log('title',this.title)
        }
        @Emit('update:title')
        changeHnadler(event){
            console.log(event.target.checked)
            return event.target.checked
        }
    }
</script>

<style lang="less" scoped>

.forget{
    #forget{
        margin-right: 20px;
        vertical-align: middle;
    }   
    label{
        vertical-align: middle;
    }
}
</style>