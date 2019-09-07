<template>
    <el-menu :default-active="$route.path" class="el-menu-demo" mode="horizontal"  router>
        <el-menu-item class="myLogo el-col el-col-2  el-col-xs-5 el-col-offset-2" @click="refresh">My Blog
        </el-menu-item>
        <el-menu-item index="/" class="el-col el-col-1 hidden-xs-only">博客</el-menu-item>
        <el-menu-item index="/message" class="el-col el-col-2 hidden-xs-only">留言板</el-menu-item>
        <el-menu-item index="/announce" class="el-col el-col-3 hidden-xs-only">本站公告</el-menu-item>
        <el-menu-item class="el-col el-col-3 hidden-xs-only"><a href="#" target="_blank ">关于我们</a></el-menu-item>
        <el-menu-item class="el-col el-col-5 el-col-xs-8 el-col-offset-3 ">
            <el-input placeholder="热门搜索" prefix-icon="el-icon-search" v-model="input" size='mini'>
            </el-input>
        </el-menu-item>
        <el-menu-item style="padding:0 10px" class="el-col el-col-1 el-col-xs-3" @click="loginFormVisible=true" v-if="$store.state.token==''">
            <el-button type="text" size="mini">登录</el-button>
        </el-menu-item>
        <el-menu-item style="padding:0 10px" class="el-col el-col-1 el-col-xs-3" @click="registerFormVisible=true" v-if="$store.state.token==''">
            <el-button type="text" size="mini">注册</el-button>
        </el-menu-item>

         <el-submenu index="" v-if="$store.state.token!==''" class="el-col el-col-offset-3 el-col-3">
    <template slot="title">{{this.$store.state.name}}</template>
    <el-menu-item index="/newBlog">写博客</el-menu-item>
    <el-menu-item index="/myBlog">我的博客</el-menu-item>
    <el-menu-item index="/myAccount">账号设置</el-menu-item>
  </el-submenu>

        <el-dialog title="登陆" :visible.sync="loginFormVisible" width="30%" label-width="0px" @close="clearForm">
            <el-form :model="loginForm" ref="loginForm">
                <el-form-item>
                    <el-input size="small" v-model="loginForm.username" autocomplete="off" placeholder="用户名"
                        prefix-icon="el-icon-user-solid"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-input size="small" v-model="loginForm.password" placeholder="密码" :show-password="true"
                        prefixIcon="el-icon-lock">
                    </el-input>
                </el-form-item>
                <el-button @click="userLogin" size="small">登录&nbsp;&nbsp;<i class="el-icon-check"></i></el-button>
                <el-button @click="forgetPwd" size="small">忘记密码&nbsp;&nbsp;<i class="el-icon-right"></i></el-button>
            </el-form>
        </el-dialog>
        <el-dialog title="注册" :visible.sync="registerFormVisible" width="30%" label-width="0px">
            <el-form :model="registerForm">
                <el-form-item>
                    <el-input size="small" v-model="registerForm.name" autocomplete="off" placeholder="用户名"
                        prefix-icon="el-icon-s-custom"></el-input>
                </el-form-item>
               
                <el-form-item>
                    <el-input size="small" v-model="registerForm.username" autocomplete="off" placeholder="账号"
                        prefix-icon="el-icon-user-solid"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-input size="small" v-model="registerForm.password" placeholder="密码" :show-password="true"
                        prefixIcon="el-icon-lock"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-input size="small" v-model="registerForm.confirmPwd" placeholder="确认密码" :show-password="true"
                        prefixIcon="el-icon-bell"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-input size="small" v-model="registerForm.inviteCode" autocomplete="off" placeholder="邀请码"
                        prefix-icon="el-icon-s-promotion"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-input size="small" v-model="registerForm.email" autocomplete="off" placeholder="邮箱"
                        prefix-icon="el-icon-message"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-input size="small" v-model="registerForm.emailCode" autocomplete="off" placeholder="邮箱验证码"
                        prefix-icon="el-icon-key"></el-input>
                </el-form-item>
                <el-button @click="sendEmail" size="small" :disabled="sendMailFlag">
                    发送验证码&nbsp;&nbsp;
                    <i class="el-icon-coffee-cup" v-if="!sendMailFlag" />
                    <i class="el-icon-loading" v-if="sendMailFlag" />
                </el-button>
                <el-button @click="userRegister" size="small">注册&nbsp;&nbsp;<i class="el-icon-check"></i></el-button>
            </el-form>
        </el-dialog>
    </el-menu>
</template>

<script>
    import {
        setTimeout
    } from 'timers';
    import {
        checkNull
    } from '../utils/check'
    export default {
        data() {
            return {
                input: "",
                loginFormVisible: false,
                registerFormVisible: false,
                sendMailFlag: false,
                loginFromDom: null,
                loginForm: {
                    username: "",
                    password: "",
                },
                registerForm: {
                    name:"",
                    username: "",
                    password: "",
                    confirmPwd: "",
                    inviteCode: "",
                    email: "",
                    emailCode: "",
                }
            }
        },
        mounted() {
            
        },
        methods: {
            refresh() {
                location.reload();
            },
            clearForm(){
                this.loginForm.username=""
                this.loginForm.password=""
            },
            userLogin() {
                var dom = this.$refs.loginForm.$el     
                var i = checkNull(this.loginForm.username, this.loginForm.password)
                window.console.log(i)
                if (!i) {
                    dom.classList.add('animated','shake')
                    setTimeout(() => {
                        dom.classList.remove('animated','shake')
                    }, 1000);
                    return
                }
                this.loginFormVisible = false
            },

            forgetPwd() {
                this.loginFormVisible = false
                this.$router.push("/forgetPwd")
            },
            sendEmail() {
                if(!checkNull(this.registerForm.email)) return
                var reg = new RegExp("^[a-z0-9A-Z]+[- | a-z0-9A-Z . _]+@([a-z0-9A-Z]+(-[a-z0-9A-Z]+)?\\.)+[a-z]{2,}$"); 
                if(!reg.test(this.registerForm.email)){
                    this.$message({
                        message:'邮箱格式不合法',
                        type:'error'
                    })
                    return
                }
                this.sendMailFlag = true
                setTimeout(() => {
                    this.sendMailFlag = false
                }, 5000)
            },
            userRegister() {
                if(!checkNull(this.registerForm.name,this.registerForm.username,this.registerForm.password,this.registerForm.confirmPwd,this.registerForm.inviteCode,
                this.registerForm.email,this.registerForm.emailCode)) return

                if(this.registerForm.password!=this.registerForm.confirmPwd){
                    this.$message({
                        message:'两次密码不一致，请重新输入',
                        type:'error'
                    })
                    return
                }

                var reg = new RegExp("^[a-z0-9A-Z]+[- | a-z0-9A-Z . _]+@([a-z0-9A-Z]+(-[a-z0-9A-Z]+)?\\.)+[a-z]{2,}$"); 
                if(!reg.test(this.registerForm.email)){
                    this.$message({
                        message:'邮箱格式不合法',
                        type:'error'
                    })
                    return
                }

                this.registerFormVisible = false
            }
        },
        watch: {
            // 监控当前页面path，防止刷新页面显示错误

        },
    }
</script>

<style scoped>
    .el-menu--horizontal>.el-menu-item {
        height: 40px;
        line-height: 40px;
        padding: 0;
    }

    .el-menu-item {
        font-size: 11px;
    }
    .el-form{
        animation-duration: 1s
    }
    .myLogo {
        background-image: -webkit-linear-gradient(left, #3498db, #f47920 10%, #d71345 20%, #f7acbc 30%,
                #ffd400 40%, #3498db 50%, #f47920 60%, #d71345 70%, #f7acbc 80%, #ffd400 90%, #3498db);
        color: transparent;
        -webkit-text-fill-color: transparent;
        -webkit-background-clip: text;
        background-size: 200% 100%;
        animation: masked-animation 4s infinite linear;
        font-size: 16px;
        font-style: italic;
    }

    @keyframes masked-animation {
        0% {
            background-position: 0 0;
        }

        100% {
            background-position: -100% 0;
        }
    }

    .el-col-offset-2 {
        margin-left: 8.33333% !important;
    }

    .el-col-offset-3 {
        margin-left: 12.5% !important;
    }
</style>