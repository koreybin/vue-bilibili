<template>
  <div>
      <van-field v-model="content" :label="label" :type="type" :placeholder="placeholder" :rule="rule"/>
      <!-- <van-field v-model="text" label="文本" /> -->    
  </div>
</template>

<script>
export default {
    data(){
        return {
            content:''
        }
    },
    props:['label','type','placeholder','rule'],
    methods:{
        examRule(){
            const rue = new RegExp(this.rule)
            if(rue.test(this.content)){
                this.$emit('inputChange',this.content)
            }else{
                this.$emit('inputChange','')
            }
        }
    },
    watch:{
        content(){
            this.examRule()
        }
    }
}
</script>
<style scoped>

</style>