<template>
  <div v-if="model" class="editViews">
      <navbar style="margin-bottom: 10px;"></navbar>
      <div class="uploadfile">
      <div class="uploadimg"><van-uploader :after-read="afterRead" preview-size="100vw" /></div>
      <navbanner left="头像">
          <img :src="model.user_img" slot="right" v-if="model.user_img" alt="">
          <img src="@/assets/default_img.jpg" alt="" slot="right" v-else>
      </navbanner>
      </div>
      <navbanner left="昵称" @bannerClick="show = true">
          <a href="javascript:;"   slot="right">{{model.name}}</a>
      </navbanner>

      <navbanner left="账号">
          <a href="javascript:;" slot="right">{{model.username}}</a>
      </navbanner>

      <navbanner left="性别" @bannerClick="gendershow = true">
          <a href="javascript:;" slot="right" >{{model.gender == 1 ? '男':'女'}}</a>
          </navbanner> 

      <navbanner left="个性签名" @bannerClick="textshow = true">
          <a href="javascript:;" slot="right" >{{model.user_desc}}</a>
      </navbanner>

      <van-dialog v-model="show" title="昵称" show-cancel-button @confirm="confirmClick()" @cancel="this.name = '' ">
           <van-field v-model="name" autofocus />
      </van-dialog>

      <van-dialog v-model="textshow" title="个性签名" show-cancel-button @confirm="textareaClick()" @cancel="this.textarea = '' ">
           <van-field v-model="textarea" type="textarea" autofocus />
      </van-dialog>

      <van-button size="large" style="background:#fb7299; margin-top:10px;color:white " @click="$router.push('/userinfo')">返回个人中心</van-button>
      
      <van-action-sheet cancel-text="取消" v-model="gendershow" :actions="actions" @select="onSelect" />
  </div>
</template>

<script>
import navbar from '@/components/common/Navbar.vue'
import navbanner from '@/components/common/editBanner.vue'
export default {
    
    components:{navbar,navbanner},
    data(){
        return {
            model:{},
            show:false,
            textshow:false,
            name:'',
            textarea:'',
            gendershow:false,
            actions: [{ name: '男' ,val:1}, { name: '女' ,val:0}],
    

        }
    },
    methods:{
        async selectUser(){
            const res = await this.$http.get('/user/' + localStorage.getItem('id'))
            this.model = res.data[0]
        },
        async afterRead(file){
            const formdata = new FormData()
            formdata.append('file',file.file)
            const res = await this.$http.post('/upload',formdata)
            this.model.user_img = res.data.url
            this.userUpdate()
        },
        async userUpdate(){
            const res = await this.$http.post('/update/' + localStorage.getItem('id'),this.model)
            if(res.data.code == 200){
                this.$msg.fail('修改成功')
            }
        },
        confirmClick(){
            if(/^.{6,16}$/.test(this.name)){
            this.model.name = this.name
            this.name = ''
            this.userUpdate()
            }else{
                this.$msg.fail('长度不能少于6')
            }
        },
        textareaClick(){
            if(/^.{6,16}$/.test(this.textarea)){
            this.model.user_desc = this.textarea
            this.textarea = ''
            this.userUpdate()
            }else{
                this.$msg.fail('长度不能少于6')
            }
        },
        onSelect(data){
            this.model.gender = data.val
            this.userUpdate()
            this.gendershow = false
            
        }

    },
    created(){
        this.selectUser()
        
    }
}
</script>

<style lang="less" scoped>
.editViews a{
    color: #333;
}
.editViews img{
    height: 12.778vw;
    width: 12.778vw;
    border-radius: 50%;
}
.uploadfile{
    position:relative;
    overflow:hidden;
    .uploadimg{
        opacity: 0;
        position:absolute;
    }
}
</style>