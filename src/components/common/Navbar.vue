<template>
  <div class="navbar">
      <div>
          <img src="@/assets/assets/logo.png" alt="" @click="$router.push('/home')">
      </div>
      <div><p>请输入内容...<van-icon name="search" class="ipt-icon" /></p></div>
      <div>
        <img :src="imgUrl" alt="" v-if="imgUrl" @click="$router.push('/userinfo')">
        <img src="@/assets/assets/default_img.jpg" alt="" @click="$router.push('/login')" v-else>
        <div>下载app</div>
      </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      imgUrl:''
    }
  },
    methods:{
      async imgUpdate(){
        if(localStorage.getItem('token')){
          const res = await this.$http.get('/user/' + localStorage.getItem('id'))
          this.imgUrl = res.data[0].user_img
        }
      }
    },
    mounted(){

      this.imgUpdate()
      
    }
}
</script>

<style lang="less" scoped>
  .navbar{
    height: 11.667vw;
    display: flex;
    background-color: #fff;
    align-items: center;
    div:nth-child(1){
      flex:1;
      height: 11.111vw;
      img{
        height: 100%;
      }
    }
    div:nth-child(2){
      flex:3;
      display:flex;
      flex-direction:row;
      align-items:center;
      p{
        height: 6.667vw;
        line-height: 6.667vw;
        width: 100%;
        font-size:3.333vw;
        background-color: #f4f4f4;
        border-radius:27.778vw;
        margin-right: 2.778vw;
        position:relative;
        padding-left:25px;
        color:#aaa;
        .ipt-icon{
          position:absolute;
          top:50%;
          transform:translate(0,-50%);
          left:10px;
          color:#aaa;
        }
      }
    }
    :nth-child(3){
      flex:2;
      display:flex;
      align-items: center;
      img{
        height: 6.667vw;
        width: 6.667vw;
        margin:0 1px;
        border-radius: 50%;
      }
      div{
        line-height: 6.667vw;
        background-color: #fb7299;
        font-size:3.889vw;
        color:#fff;
        padding:0 2.778vw;
        margin-left:1.389vw;
        margin-right:1.389vw;
        border-radius:0.833vw;
      }
    }
  }
</style>