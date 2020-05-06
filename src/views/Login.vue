<template>
    <div class="warpper" ref="wrap" id='wrapper'>
        <div class="bg"></div>
       <div class="login">
           <el-form ref="ruleForm" :rules="loginForms" :model='loginform' class="demo-ruleForm">
               <el-form-item aglin="center">
                   <h5 class="title">用户登录</h5>
               </el-form-item>
               <el-form-item prop='username' :rules='loginForms.name'>
                   <el-input placeholder="请输入用户名" v-model="loginform.username">
                    </el-input>
               </el-form-item>
               <el-form-item prop='password' :rules='loginForms.password'>
                   <el-input placeholder="请输入密码" v-model="loginform.password">
                       <el-button slot="append" @click='getcaptcha'>获取验证码</el-button>
                   </el-input>
               </el-form-item>
               <el-form-item align='left' class="forget">
                   <el-input class="captcha" placeholder="请输入验证码" v-model="loginform.captcha"></el-input>
                   <img class="img" :src="imgurl" alt="">
               </el-form-item>
               <el-form-item align='left' class="forget">
                   <Checkbox :title.sync="checked"/>
               </el-form-item>
               <el-form-item>
                   <el-button type='primary' class="login_btn" @click="loginHandler('ruleForm')">登陆</el-button>
               </el-form-item>
           </el-form>
       </div>
    </div>
</template>

<script lang='ts'>
    import { Component, Prop, Vue } from "vue-property-decorator";  
    import { State, Action, Mutation } from "vuex-class";
    import { loginForms } from '../util/validator';
    import Checkbox from '../components/checkbox.vue';
    import login_api from '../api/login'
    interface rrevent {
        firname:string,
        secondname:number
    }
    interface form{
        username:string,
        password:string,
        captcha:string
    }
    @Component({
        components:{
            Checkbox
        }
    })
    export default class Logins extends Vue {
        features: string[];
        messgae:string="1111"
        checked:boolean=false
        private imgurl:string='/base/captcha'
        public loginForms = loginForms;
        loginform = {
            username:"",
            password:null,
            captcha:''
        }
        constructor() {
            super();
            this.features = ["法律讲坛",'百家讲坛']
            
        }
        mounted () {
        }
        methods: {}
        private changePage(name:string):void{
            alert(name)
        }
        async getcaptcha(){
        }
        private loginHandler(formName){
            let that = this
            console.log(this.checked)
            console.log(this.$refs.ruleForm['validate'])
            this.$refs.ruleForm['validate'](async (valid)=>{
                let res = await login_api.Login({
                    username:that.loginform.username,
                    password:that.loginform.password,
                    captcha:that.loginform.captcha
                })
                if(valid){
                     this.$message({
                        message: '登陆成功',
                        type: 'success'
                    });
                    this.$router.push({path:'/home'})
                }else{
                    return false;
                }
            })
        }
    }
</script>

<style lang="less" scoped>
.warpper{
    width: 100%;
    height: 100vh;
    position: relative;
    .bg{
        position: absolute;
        width: 100%;
        height: 100%;
        background: url('/bg.jpg') no-repeat;
        background-size: 100% 100%;
        filter: blur(1px);
    }
    .login{
        position: absolute;
        width: 500px;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
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
    .forget{
        .captcha{
            width: 70%;
            vertical-align: middle;
        }
        .img{
            width: 30%;
            vertical-align: middle;
        }
    }
}
</style>