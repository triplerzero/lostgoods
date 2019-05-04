<template>
  <div class="M-footer">
    <div class="M-item">
      <div class="M-itemFirst"></div>
      <p>失物信息</p>
    </div>
    <div class="M-item">
      <div class="M-itemSecond"></div>
      <p>个人中心</p>
    </div>
  </div>
</template>
<script>
  export default {
    props: {
      title: ''
    }
  }

</script>

<style lang="less">
  .M-footer {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 3rem;
    font-size: .7rem;
    background: #409EFF;
    color: #fff;
    z-index: 2;
    display: flex;

    .M-item {
      flex: 1;
      height: 100%;
      display:flex;
      justify-content: center;
      align-items:center;
      flex-direction:column;
      .M-itemFirst {
        width: 1.5rem;
        height: 1.5rem;
        font-size: #fff;
        background: #fff;
        -webkit-mask-image: url('/static/img/msg.png');
        -webkit-mask-repeat: no-repeat;
        -webkit-mask-size: contain;
      }
      .M-itemSecond{
        width: 1.5rem;
        height: 1.5rem;
        font-size: #fff;
        background: #fff;
        -webkit-mask-image: url('/static/img/person.png');
        -webkit-mask-repeat: no-repeat;
        -webkit-mask-size: contain;
      }
    }
  }

</style>
