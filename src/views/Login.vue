<template>
    <div class="warpper" ref="wrap" id='wrapper'>
       <div class="login">
           {{messgae}}
           <el-form ref="ruleForm" :rules="loginForms" :model='loginform' class="demo-ruleForm">
               <el-form-item aglin="center">
                   <h5 class="title">用户登录</h5>
               </el-form-item>
               <el-form-item prop='name' :rules='loginForms.name'>
                   <el-input placeholder="请输入用户名" v-model="loginform.name">
                        <el-button slot="prepend" icon="el-icon-user"></el-button>
                    </el-input>
               </el-form-item>
               <el-form-item prop='password' :rules='loginForms.password'>
                   <el-input placeholder="请输入密码" v-model="loginform.password">
                       <el-button slot="prepend" icon="el-icon-unlock"></el-button>
                   </el-input>
               </el-form-item>
               <el-form-item>
                   <el-button type='primary' class="login_btn">登陆</el-button>
               </el-form-item>
           </el-form>
       </div>
    </div>
</template>

<script lang='ts'>
    import { Component, Prop, Vue } from "vue-property-decorator";  
    import { State, Action, Mutation } from "vuex-class";
    import { loginForms } from '../util/validator';
    interface rrevent {
        firname:string,
        secondname:number
    }
    @Component
    export default class Logins extends Vue {
        features: string[];
        messgae:string="1111"
        public loginForms = loginForms;
        loginform:object = {
            name:"",
            password:null
        }
        constructor() {
            super();
            this.features = ["法律讲坛",'百家讲坛']
            
        }
        mounted () {
            console.log(loginForms)
        }
        
        methods: {}
        private changePage(name:string):void{
            alert(name)
        }
    }
</script>

<style lang="less" scoped>
.warpper{
    width: 100%;
    height: 100vh;
    background: url('/element.JPG');
    position: relative;
    .login{
        position: absolute;
        width: 500px;
        left: 100px;
        top: 50%;
        transform: translate(0,-50%);
        background: #fff;
        box-shadow: 0px 0px 10px rgb(196, 192, 192);
        padding: 40px;
        border-radius: 10px;
        .login_btn{
            width: 100%;
        }
        .title{
            font-family: 'Courier New', Courier, monospace;
            font-size: 24px;
            color: rgb(85, 81, 81);
            letter-spacing: 8px;
        }
    }
}
</style>