<template>
  <div>
      <!-- <van-button size="large" class="registerBtn" @click="registerClick">{{text}}</van-button> -->
      <div class="registerBtn" @click="registerClick">{{text}}</div>
  </div>
</template>

<script>
export default {
    props:['text'],
    data(){
        return {}
    },
    methods:{
        registerClick(){
            this.$emit("childClick")
        }
    }
}
</script>

<style scoped>
.registerBtn{
    height: 11.111vw;
    background-color: #ff9db5;
    border-radius:6.944vw;
    margin:5px;
    padding:10px;
    display:flex;
    justify-content: center;
    align-items: center;
    color:white;
    font-size:4.444vw;
}
</style>