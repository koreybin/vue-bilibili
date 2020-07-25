<template>
  <div class="userDetail">
      <div>
        <div class="user_img">
          <img :src="userInfo.user_img" alt="" v-if="userInfo.user_img">
          <img src="@/assets/default_img.jpg" alt="" v-else>
        </div>
        <div class="user_edit">
          <div>
            <p>
              <span>0</span><span>粉丝</span>
            </p>
            <span></span>
            <p>
              <span>54</span><span>关注</span>
              </p>
              <span></span>
            <p>
              <span>0</span><span>获赞</span>
              </p>
          </div>
          <div @click="$router.push('/edit')">
            <div >编辑资料</div>
            </div>
        </div>
      </div>
      <div>
        <h2>{{userInfo.name}}</h2>
        <div v-if="userInfo.user_desc">{{userInfo.user_desc}}</div>
        <div v-else>这个人很神秘，什么都没写</div>
      </div>
  </div>
</template>

<script>
export default {
  props:['userInfo']
}
</script>

<style lang="less" scoped>
.userDetail{
  background-color: #fff;
  padding:0 3.333vw;
  margin-top:-40px;
  z-index: 99;
  div:nth-child(1){
    display: flex;
  }
  .user_img{
    flex:1;
    img{
      height: 23.611vw;
      width: 23.611vw;
      border-radius: 50%;
      margin-top: -10px;
    }
  }
  .user_edit{
    flex:2;
    div:nth-child(1){
      display:flex;
      justify-content: space-around;
      align-items: center;
      p{
        display: flex;
        flex-direction:column;
        justify-content: center;
        align-items: center;
        padding:0 4.167vw;
        margin: 2.222vw 0;
        span:nth-child(2){
          color:#aaa;
        }
      }
      >span{
        display: inline-block;
        height: 6.944vw;
        border:0.278vw solid #ccc;
      }
    }
    div:nth-child(2){
      div{
        border:0.278vw solid #fb7a9f;
        color:#fb7a9f;
        padding: 0.556vw;
        margin-top: 1.389vw;;
        border-radius:1.389vw;
      }
    }
  }
  div:nth-child(2){
    h2{
      font-weight: 400;
      margin:10px 0;
    }
    div{
      color:#aaa;
    }
  }
}
</style>