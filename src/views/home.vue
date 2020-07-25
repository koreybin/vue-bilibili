<template>
  <div>
      <navbar></navbar>
      <van-tabs v-model="active" swipeable sticky>
      <van-tab v-for="(item,i) in category" :title="item.title" :key="i">
         <van-list
            v-model="item.loading"
            :finished="item.finished"
            finished-text="没有更多了"
            @load="onLoad"
            >
            <div class="detailparent">
            <detail class="detail" :detailitem="categoryitem" v-for="(categoryitem,categoryindex) in item.list" :key="categoryindex" />
          </div>
            </van-list>
         
          
      </van-tab>
      </van-tabs>
  </div>
</template>

<script>
import navbar from '@/components/common/Navbar.vue'
import detail from '@/views/detail.vue'
export default {
    data(){
        return {
            category:[],
            active:0
        }
    },
    components:{
        navbar,detail
    },
    methods:{
        async selectCategory(){
            const res = await this.$http.get('/category')
            this.changeCategory(res.data)
            this.selectArticle()
            console.log(this.$route)
        },
        changeCategory(data){
            // console.log(data)
            const category1 = data.map((item,index)=>{
                item.list = []
                item.page = 0
                item.pagesize = 10,
                item.loading = true,
                item.finished = false
                return item
            })
            this.category = category1
            // console.log(this.category)
        },
        async selectArticle(){
            const categoryitem = this.categoryItem()
            // console.log(categoryitem)
            const res = await this.$http.get('/detail/' + categoryitem._id,{
                params:{
                    page:categoryitem.page,
                    pagesize:categoryitem.pagesize,
                }
            })
            categoryitem.list.push(...res.data)
            categoryitem.loading = false
            if(res.data.length < categoryitem.pagesize){
                categoryitem.finished = true
            }
        },
        categoryItem(){
            const categoryitem = this.category[this.active]
            return categoryitem
        },
        onLoad(){
            const categoryitem = this.categoryItem()
            setTimeout(() => {
                categoryitem.page += 1
                this.selectArticle()
            },1000)
        }

    },
    watch:{
        active(){

            this.selectArticle()
        }
    },
    created(){
        this.selectCategory()
        
    }

}
</script>

<style lang="less">
.detailparent{
    display: flex;
    flex-wrap:wrap;
    justify-content: space-around;
    .detail{
        width: 45%;
    }
}
</style>