<template>
    <div>
        <span v-for="item in features" :key='item' @click="changePage(item)">{{item}}</span>
    </div>
</template>

<script lang='ts'>
    import { Component, Prop, Vue } from "vue-property-decorator";  
    import { State, Action, Mutation } from "vuex-class";
    interface rrevent {
        firname:string,
        secondname:number
    }
    @Component
    export default class Logins extends Vue {
        features: string[];
        constructor() {
            super();
            this.features = ["法律讲坛",'百家讲坛']
            
        }
        
        
        methods: {}
        private changePage(name:string):void{
            alert(name)
        }
    }
</script>

<style lang="less" scoped>

</style>