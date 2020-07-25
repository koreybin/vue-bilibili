<template>
  <div class="userinfo">
      <Navbar></Navbar>
      <img src="@/assets/bannerTop_new.png" alt="" class="backImg">
      <user-detail :userInfo="model"></user-detail>
      <user-action></user-action>
  </div>
  
</template>

<script>
import Navbar from '@/components/common/Navbar.vue'
import userDetail from '@/components/userCom/userDetail.vue'
import userAction from '@/components/userCom/userAction.vue'
export default {
    components:{Navbar,userDetail,userAction},
    data(){
      return {
        model:{}
      }
    },
    created(){
      this.UserinfoData()
    },
    methods:{
      async UserinfoData(){
        const res = await this.$http.get('/user/' + localStorage.getItem('id'))
        // console.log(res)
        this.model = res.data[0]
      }
    }
}
</script>

<style lang="less" scoped>
.userinfo{
  .backImg{
    height: 36.389vw;
    width: 100%;
    position:relative;
    z-index: -1;
  }
}
</style>