<template>
  <div class="hello">
    <Top middleTop="登录bilibili" rightTop="切换到注册">
      <router-link slot="right" style="font-size:13px;" to="/register" tag='span'>切换到注册</router-link>
    </Top>
        <Texts label='账号：' placeholder="请输入账号" rule="^.{6,15}$" @inputChange="res => model.username = res" style="margin:10px 0;"></Texts>
        <Texts label='密码：' type="password" placeholder="请输入密码" rule="^.{6,15}$" @inputChange="res => model.password = res"></Texts>
        <login-btn text="登录" @childClick="AjaxInsert"></login-btn>
  </div>
</template>

<script>  
import Top from '@/components/common/LoginTop.vue'
import Texts from '@/components/common/LoginText.vue'
import LoginBtn from '@/components/common/LoginBtn.vue'
export default {
  components:{Top,Texts,LoginBtn},
  name: 'HelloWorld',
  data () {
    return {
      model:{}
    }
  },
  methods:{
    async AjaxInsert(){
      if(this.model.username && this.model.password){
        const res = await this.$http.post('/login',this.model)
        this.$msg.fail(res.data.msg)
        if(res.data.code == 301 || res.data.code == 302){
          return
        }
        localStorage.setItem('token',res.data.token)
        localStorage.setItem('id',res.data.id)
        setTimeout( () => {
          this.$router.push('/userinfo')
        },1000)
      }else{
        this.$msg.fail('格式不正确，请重新输入')
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
