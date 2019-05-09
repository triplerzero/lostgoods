<template>
  <div class="M-header">
    <div class="pre" @click="back"></div>{{title}}
  </div>
</template>
<script>
  export default {
    props: {
      title: ''
    },
    methods: {
      back() {
        this.$router.go(-1);
      }
    }
  }

</script>

<style lang="less">
  .M-header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 2.5rem;
    line-height: 2.5rem;
    font-size: .8rem;
    background: #409EFF;
    color: #fff;
    z-index: 2;
  }

  .M-header .pre {
    position: absolute;
    top: 0;
    left: 0;
    width: 10%;
    height: 100%;
    background: #fff;
    -webkit-mask-image: url('/static/img/return.png');
    -webkit-mask-repeat: no-repeat;
    -webkit-mask-size: .8rem .8rem;
    -webkit-mask-position: center center;
  }

</style>
