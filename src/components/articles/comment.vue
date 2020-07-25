<template>
  <div class="parentComment">
    <div class="comList" v-for="(item,index) in commentList" :key="index">
      <div>
        <div class="parentImg">
          <img :src="item.userinfo.user_img" alt v-if="item.userinfo.user_img" />
          <img src="@/assets/default_img.jpg" alt v-else />
        </div>
        <div class="parentCon">
          <p>
            <span v-if="item.userinfo.name">{{item.userinfo.name}}</span>
            <span v-else>此用户无姓名</span>
            <span>{{item.comment_date}}</span>
          </p>
          <p  @click="publishClick(item.comment_id);" >{{item.comment_content}}</p>
        </div>
        
      </div>
      <comment-item :commentChild="item.child" v-if="item.child.length != 0" @postPublish="publishClick"></comment-item>
      <p v-else></p>
    </div>
  </div>
</template>

<script>
import commentItem from "@/components/articles/commentItem.vue";
export default {
  components: {
    commentItem
  },
  data() {
    return {
      commentList: {},
      show:false
    };
  },
  methods: {
    async commentData() {
      const res = await this.$http.get("/comment/" + this.$route.params.id);
      if(res.data){
        this.$emit('commentLength',res.data.length) //将长度传给父组件 也就是评论长度
      }
      this.commentList = this.changeCommentData(res.data);
    },
    
    publishClick(id){
      this.$emit('publishClick',id)
    },
    changeCommentData(data) {
      function fn(temp) {
        let arr1 = [];
        for (var i = 0; i < data.length; i++) {
          if (data[i].parent_id == temp) {
            arr1.push(data[i]);
            data[i].child = fn(data[i].comment_id);
          }
        }
        return arr1;
      }
      return fn(null);
    }
  },
  created() {
    this.commentData();
  }
};
</script>

<style lang="less" scoped>
.parentComment {
  display: flex;
  flex-direction: column;
  padding: 2.778vw 2.778vw 2.778vw 5.556vw;
  .comList >div{
    display: flex;
    .parentImg {
      padding-top: 2.778vw;
      margin-right: 1.389vw;
      img {
        width: 9.722vw;
        height: 9.722vw;
        border-radius: 50%;
      }
    }
    .parentCon {
      flex: 1;
      p:nth-child(1) {
        padding: 1.389vw;
        vertical-align: middle;
        display: flex;
        justify-content: space-between;
        margin: 2.222vw 0 0 0;
        color:#aaa;
      }
      p:nth-child(2) {
        padding: 1.389vw;
        margin: 1.389vw 0;
      }
    }
  }
}
</style>