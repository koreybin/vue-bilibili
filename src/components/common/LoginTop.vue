<template>
    <div>
    <div class="LoginTop">

        <div></div>
        <div>{{middleTop}}</div>
        <div>
            <slot name='right'></slot>
        </div>
    </div>
    </div>
</template>

<script>
export default {

    props:['middleTop','rightTop']
}
</script>

<style scoped>
.LoginTop{
    display: flex;
    height: 50px;
    background-color: #fff;
    flex-direction:row;
    align-items: center;
    font-size:4.444vw;
    }
.LoginTop div{
    flex:1;
}

</style>