<template>
  <div @click="pathpush()">
      <div class="detailItem" >
          <div class="imgparent">
              <img :src="detailitem.img">
              <div class="bottom">
              <span class="video"><van-icon name="play-circle-o" />11</span>
              <span class="coment"><van-icon name="video-o" />{{detailitem.commentlen}}</span>
              </div>
          </div>
          <p>{{detailitem.name}}</p>
      </div>
  </div>
</template>

<script>
export default {
    props:['detailitem'],
    methods:{
        pathpush(){ //重复进入相同路径会报错  所以if不同才跳转 相同不动
            if(this.$route.path != `/article/${this.detailitem.id}`)
            this.$router.push(`/article/${this.detailitem.id}`)
        }
    }
}
</script>

<style lang="less" scoped>
.detailItem{
    p{
    font-size: 3.33vw;
    }
    img{
    width: 100%;
    }
}
.imgparent{
    position:relative;
    .video{
        position:absolute;
        bottom:0;
        left:0;
    }
    .coment{
        position:absolute;
        bottom:0;
        right:0;
    }
    .van-icon{
        font-size: 13px;
    }
    .bottom{
        width: 100%;
        height: 16px;
        position:absolute;
        bottom:0;
        background: linear-gradient(0deg,rgba(0,0,0,.85),transparent);
        display: flex;
        justify-content: space-between;
        color:white;
        span{
            margin: 0 5px;
        }
    }
}

</style>