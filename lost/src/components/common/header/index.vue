<template>
  <div class="M-header">{{title}}</div>
</template>
<script>
export default{
  props:{
    title:''
  }
}
</script>

<style lang="less" scoped>
  .M-header{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 0.5rem;
    line-height: 0.5rem;
    font-size:0.16rem; 
    background: #409EFF;
    color: #fff;
  }
</style>