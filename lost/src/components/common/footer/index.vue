<template>
  <div class="M-footer">
    <div class="M-item" @click="linkMsg">
      <div class="M-itemFirst" :class="{'activeIcon':curr==1}"></div>
      <p :class="{'activeText':curr==1}">失物信息</p>
    </div>
    <div class="M-item" @click="linkUser">
      <div class="M-itemSecond" :class="{'activeIcon':curr==2}"></div>
      <p :class="{'activeText':curr==2}">个人中心</p>
    </div>
  </div>
</template>
<script>
  export default {
    props: {
      curr: {
        type: Number,
        default: function () {
          return 1
        }
      }
    },
    methods: {
      linkMsg() {
        this.$router.push({
          path: "/index"
        })
      },
      linkUser() {
        this.$router.push({
          path: "/user/center"
        })
      }
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
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;

      p {
        color: #fff;
      }

      .activeText {
        color: #00FF7F;
      }

      .M-itemFirst {
        width: 1.5rem;
        height: 1.5rem;
        background: #fff;
        -webkit-mask-image: url('/static/img/msg.png');
        -webkit-mask-repeat: no-repeat;
        -webkit-mask-size: contain;
      }

      .M-itemSecond {
        width: 1.5rem;
        height: 1.5rem;
        background: #fff;
        -webkit-mask-image: url('/static/img/person.png');
        -webkit-mask-repeat: no-repeat;
        -webkit-mask-size: contain;
      }

      .activeIcon {
        background: #00FF7F;
      }
    }
  }

</style>
