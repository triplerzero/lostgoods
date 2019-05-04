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

<style lang="less">
  .M-header{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 2.5rem;
    line-height: 2.5rem;
    font-size:.8rem;
    background: #409EFF;
    color: #fff;
    z-index:2;
  }
</style>