<template>
  <div class="comment">
      
          <p class="comment-title">
              <span>评论</span>
              <span>({{commentLen}})</span>
          </p>
      
  </div>
</template>

<script>
export default {
        props:['commentLen'],
}
</script>

<style lang="less">
.comment{
    padding: 8.333vw 2.778vw 0 2.7778vw;
    .comment-title{
        span:nth-child(2) {
            color: #aaa;
            margin-left: 2.778vw;
        }
    }
}
</style>