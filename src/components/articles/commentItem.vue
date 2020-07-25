<template>
  <div class="childComment">
    <div class="commentItem" v-for="(item,index) in commentChild" :key="index">
      <div>
        <div class="childImg">
          <img :src="item.userinfo.user_img" alt v-if="item.userinfo.user_img" />
          <img src="@/assets/default_img.jpg" alt v-else />
        </div>
        <div class="childCon">
          <p>
            <span v-if="item.userinfo.name">{{item.userinfo.name}}</span>
            <span v-else>此用户无姓名</span>
            <span>{{item.comment_date}}</span>
          </p>

          <p v-if="item.parent_user_info.name" @click="publishClick(item.comment_id);() => !show" ><span style="color:#478ef0;" >回复{{item.parent_user_info.name}}：</span>{{item.comment_content}}</p>
          <p v-else><span style="color:#478ef0;"  @click="publishClick(item.comment_id) " >回复无姓名用户：</span>{{item.comment_content}}</p>
          <commentchild-item :commentChild="item.child" @postChild="postChild"></commentchild-item>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      show:false
    }
  },
  name:'commentchildItem',
  props: ["commentChild"],
  methods:{
    publishClick(id){
      this.$emit('postChild',id)
      this.$emit('postPublish',id)
    },
    postChild(id){
      this.publishClick(id)
      this.$emit('postPublish',id)
    }
  }
    
};
</script>

<style lang="less" scoped>
.childComment {
  display: flex;
  flex-direction: column;
  .commentItem > div {
    display: flex;
    .childImg {
      height: 35px;
      padding-top: 2.778vw;
      margin-right: 1.389vw;
      img {
        width: 9.722vw;
        height: 9.722vw;
        border-radius: 50%;
      }
    }
    .childCon {
      flex: 1;
      
      p:nth-child(1) {
        padding: 1.389vw;
        vertical-align: middle;
        display: flex;
        justify-content: space-between;
        margin: 2.222vw 0 0 0;
        font-size: 4.444vw;
        color:#999;
      }
      p:nth-child(2) {
        font-size:3.889vw;
        padding: 1.389vw;
        margin: 1.389vw 0;
      }
    }
  }
}
</style>