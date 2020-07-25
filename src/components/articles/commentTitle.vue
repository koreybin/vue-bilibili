<template>
  <div class="comment">

          <div class="commentMyinfo">
              <img :src="myuser.user_img" alt="" v-if="myuser.user_img">
              <img src="@/assets/default_img.jpg" alt="" v-else>
              <input type="text" v-model="comContent" placeholder="说点什么吧">
              <button @click="commentPublish();show()">发表</button>
          </div>
      
  </div>
</template>

<script>
export default {
    
    data(){
        return {
            myuser:{},
            comContent:''
        }
    },
    methods:{
        async myuserInfo(){
            const res = await this.$http.get('/user/' + localStorage.getItem('id'))
            
            this.myuser = res.data[0]
        },
        commentPublish(){
            if(!this.myuser || !localStorage.getItem('token') || !localStorage.getItem('id') ){
                // this.$router.push('login')
                this.$msg.fail('请先登录！')
            }
            this.$emit('submitContent',this.comContent)
            this.comContent = ''
        },
        show(){
            this.$emit('showInput')
        }

    },
    created(){
        if(localStorage.getItem('token')){
            this.myuserInfo()
        }
    }
}
</script>

<style lang="less">
.comment{
    padding: 0 2.778vw 0 2.7778vw;
    .commentMyinfo{
      padding: 2.778vw 0;
      display: flex;
      img{
        height: 7.944vw;
        width: 7.944vw;
        border-radius: 50%;
      }
      input{
        outline: none;
        border: 0;
        background-color: #e0e0e0;
        border-radius: 3.611vw;
        font-size: 3.333vw;
        padding: 0 5.556vw 0 4.167vw;
        margin-left: 2.778vw;
      }
      
      input::-webkit-input-placeholder{
          color:fb7299;
      }
      button{
        outline: none;
        border: 0;
        border-radius: 3.333vw;
        background: #fb7299;
        color: white;
        font-size: 3.333vw;
        padding: 0 4.167vw;
      }
    }
}
</style>