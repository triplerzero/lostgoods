<template>
  <div class="userCenter">
    <Header :title="title"></Header>
    <div class="info">
      <div class="infoLeft">
        <div class="infoAvatar">
        </div>
        <div class="infoText">
          <p>学号：{{userid}}</p>
          <p>姓名：{{username}}</p>
        </div>
      </div>
      <div class="infoRight"></div>
    </div>
    <div class="clickItem">
      <div @click="addGoods">新增失物</div>
      <div @click="goodsDetail">失物记录</div>
      <div @click="returnLogin">退出登录</div>
    </div>
    <Footer :curr="curr"></Footer>
  </div>
</template>
<script>
  import Header from '../../common/header';
  import Footer from '../../common/footer';
  export default {
    data() {
      return {
        title: "个人中心",
        curr: 2,
        userid:this.$cookies.get("userid"),
        username:this.$cookies.get("username")
      }
    },
    methods: {
      addGoods(){
        this.$router.push({path:'/addgoods'})
      },
      goodsDetail(){
        this.$router.push({path:'/goodslist'})
      },
      returnLogin(){
        this.$router.push({path:'/login'})
      }
    },
    created(){

    },
    components: {
      Header,
      Footer
    }
  }

</script>

<style lang="less">
  .userCenter {
    margin-top: 2.5rem;
    width: 100%;
    font-size: .7rem; 
    .info {
      background: #fff;
      margin-bottom:.5rem;
      .infoLeft {
        display: flex;
        padding: 1rem;
        align-items: center;
        .infoAvatar {
          width: 2.5rem;
          height: 2.5rem;
          background: url('/static/img/zhemu.jpg');
          background-size: cover;
          border-radius:50%;
        }
        .infoText{
          margin-left:1rem;
          font-size: .7rem; 
          text-align: left;
        }
      }
    }

    .clickItem{
      div{
        background-color:#fff;
        height: 1.5rem;
        padding:.5rem;
        margin-bottom:.5rem;
        text-align: left;
        line-height:1.5rem;
        background-image:url('/static/img/go.png');
        background-repeat:no-repeat;
        background-size:.7rem .7rem;
        background-position: 96% center;
      }
    }
  }

</style>
