<template>
    <div>
        <!-- 头部 -->
        <Top middleTop="注册bilibili">
            <div slot="right" style="font-size:13px;" @click="$router.push('/login')">切换到登录</div>  <!--$router.push()相当于router-link to=""-->
        </Top>
        <Texts label='姓名：' placeholder="请输入姓名" rule="^.{6,15}$" style="padding:10px 0;" @inputChange="res => model.name = res"></Texts>
        <Texts label='账号：' placeholder="请输入账号" rule="^.{6,15}$" @inputChange="res => model.username = res"></Texts>
        <Texts label='密码：' type="password" placeholder="请输入密码" rule="^.{6,15}$" @inputChange="res => model.password = res"></Texts>
        <login-btn text="注册" @childClick="registerSubmit"></login-btn>
    </div>
</template>

<script>
import Top from '@/components/common/LoginTop.vue'
import Texts from '@/components/common/LoginText.vue'
import LoginBtn from '@/components/common/LoginBtn.vue'
export default {
    components:{Top,Texts,LoginBtn},
    data(){
        return {
            model:{
                name:'',
                username:'',
                password:''
            }
            
        }
    },
    methods:{
        async registerSubmit(){
            let rulg = /^.{6,16}$/
            if(rulg.test(this.model.name) && rulg.test(this.model.username) && rulg.test(this.model.password)){
                const res = await this.$http.post('/register',this.model)//promise是异步操作，想让他先执行res结果 就必须把它变为同步 就用到了async
                this.$msg.success(res.data.msg)
                localStorage.setItem('id',res.data.id)
                localStorage.setItem('token',res.data.objtoken)
                console.log(res)
                if(res.data.code != 302){
                    setTimeout(() => {
                    this.$router.push('/userinfo')
                },1000)
                }
               
                
            }else{
                this.$msg.fail("长度不能小于6！")
            }
        }
    }
}
</script>

<style scoped>

</style>