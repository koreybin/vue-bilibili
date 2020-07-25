<template>
  <div v-if="model">
      <navbar></navbar>
      <div class="detailinfo">
          <div class="video">
              <video controls="controls" :src="model.content"></video>
          </div>
          <div class="detailInfoText">
          <div>
              <span>{{model.category.title}}</span>
              <span>{{model.name}}</span>
          </div>
          <div>
              <span>{{model.userinfo.name}}</span>
              <span>146.4万次观看</span>
              <span>5281弹幕</span>
              <span>{{model.date}}</span>
          </div>
          <div>
            <p @click="collectionClick" :class="{activeColor:collectionActive}"><van-icon name="star" /><span>收藏</span></p>
              <p @click="subscriptClick" :class="{activeColor:subscritionActive}"><van-icon name="fire" /><span>关注</span></p>
              <p><van-icon name="share" /><span>分享</span></p>
          </div>
      </div>
      </div>
      <div class="detailparent">
          <detail class="detail" v-for="(item,index) in commendList" :key="index" :detailitem="item"></detail>
      </div>
      <comment-length :commentLen='this.lens'></comment-length>
      <comment-title  @submitContent='submitContent'></comment-title>
      <comment @commentLength="len => this.lens = len" ref="publicComment"  @publishClick="secondContent"></comment>
 
      <van-popup v-model="show" position="bottom" closeable>
          <comment-title @submitContent='submitContent' />
        </van-popup >
  </div>

</template>

<script>
import navbar from '@/components/common/Navbar.vue'
import detail from '@/views/detail.vue'
import commentTitle from '@/components/articles/commentTitle.vue'
import commentLength from '@/components/articles/commentLength.vue'
import comment from '@/components/articles/comment.vue'
export default {
    components:{
        navbar,detail,commentTitle,comment,commentLength
    },
    data(){
        return {
            model:null,
            myuser:[],
            show:false,
            comContent:'',
            commendList:[],
            lens:null,
            postList:{
                article_id:null,
                comment_content:'',
                comment_date:'',
                parent_id:null,
            },
            collectionActive:null,
            subscritionActive:null,

        }
    },
    methods:{ 
        async articleitemData(){
            const res = await this.$http.get('/article/' + this.$route.params.id)
            this.model = res.data[0]
            if(this.model) {
                this.subscritionInit()
            }
        },
        async commendData() {
            const res = await this.$http.get('/commend')
            // console.log(res)
            this.commendList = res.data
        },
        secondContent(id){
            this.show = true
            this.postList.parent_id = id
            
        },
        async submitContent(res){
            var m = new Date().getMonth() + 1
            var d = new Date().getDate()
            if(m<10){
                m = '0' + m
            }
            if(d<10){
                d = '0' + d
            }
            var date = `${m}-${d}`
            this.postList.comment_content = res
            this.postList.comment_date = date
            this.postList.article_id = this.$route.params.id
            this.postList.parent_id == null ? null : this.postList.parent_id
            const result = await this.$http.post('/comment_post/' + localStorage.getItem('id'),this.postList)
            this.$refs.publicComment.commentData()
            this.postList.parent_id = null
            if(result.status == 200){
                this.$msg.fail('评论成功')
            }
            this.show = false
        },
        async collectionClick(){
            if(localStorage.getItem('token')){
            const res = await this.$http.post('/collection/' + localStorage.getItem('id'),{article_id:this.$route.params.id})
            console.log(res)
            if(res.data.msg == '收藏成功'){
                this.collectionActive = true
               }else{
                   this.collectionActive = false
               }
               this.$msg.fail(res.data.msg)
            }
        },
        //进入页面获取是否收藏
        async collectionInit() {
            if(localStorage.getItem('token')){
                const res = await this.$http.get('/collection/' + localStorage.getItem('id'),{
                    params:{
                        article_id:this.$route.params.id
                    }
                })
            this.collectionActive = res.data.success
            }
        },
        async subscriptClick() {
           if(localStorage.getItem('token')){
               const res = await this.$http.post('/sub_scription/' + localStorage.getItem('id'),{sub_id:this.model.userid})
               if(res.data.msg == '关注成功'){
                   this.subscritionActive = true
               }else{
                   this.subscritionActive = false
               }
               this.$msg.fail(res.data.msg)
               
           }
        },
        //进入页面获取是否收藏
        async subscritionInit() {
            if(localStorage.getItem('token')){
                const res = await this.$http.get('/sub_scription/' + localStorage.getItem('id'),{
                    params:{
                        sub_id:this.model.userid
                    }
                })
            this.subscritionActive = res.data.success
            }
        }   
        
    },
    watch:{
        $route(){
            this.articleitemData()
            this.commendData()
        }
    },
    created(){
        this.articleitemData()
        this.commendData()
        this.collectionInit()
        
    }
    

}
</script>

<style lang="less" scoped>
.detailinfo{
.video{
    width: 100%;
        video{
            width: 100%;   
        }
}
.detailInfoText{
    padding: 4.167vw;
    div:nth-child(1) {
        span:nth-child(1) {
            padding:0 2.778vw;
            color: #fb7299;
            background-color: #f4f4f4;
            border-radius: 2.778vw;
        }
    }
    div:nth-child(2) {
        padding: 2.778vw 2.778vw;
        span{
            color: #aaa;
            font-size: 3.333vw;
            margin-right: 2.778vw;
        }
        span:nth-child(1) {
            color: black;
            font-size: 4vw;
            padding-right:2.778vw;
        }
    }
    div:nth-child(3) {
        padding: 0 2.778vw;
        display: flex;
        
        p{
            margin-right: 10px;
            display: flex;
            align-items: center;
            color: #757575;
        }
        .activeColor{
            color: #fb7299;
        }
    }
}}
.detailparent{
    display: flex;
    flex-wrap:wrap;
    justify-content: space-around;
    .detail{
        width: 45%;
    }
}

</style>