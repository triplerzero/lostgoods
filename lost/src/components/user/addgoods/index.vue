<template>
  <div class="index" v-if="!mobile">
    <el-container style="position:fixed;top:0;bottom:0;left:0;width:100%;">
      <div class="aside">
        <el-aside width="200px" style="background-color: #eee">
          <el-menu :default-openeds="['2']" :default-active="index" @select="handleSelect">
            <div class="logo">
            </div>
            <el-submenu index="1">
              <template slot="title"><i class="el-icon-message"></i>失物管理</template>
              <el-menu-item-group>
                <el-menu-item index="1-1">失物信息</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="2">
              <template slot="title"><i class="el-icon-menu"></i>个人中心</template>
              <el-menu-item-group>
                <el-menu-item index="2-1">新增失物</el-menu-item>
                <el-menu-item index="2-2">发布记录</el-menu-item>
                <el-menu-item index="2-3" v-if="type==1">举报记录</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </el-aside>
      </div>

      <el-container>
        <el-header style="text-align: right; font-size: 12px">
          <div class="nav">
            <span>失物</span> > <span class="lost">新增失物</span>
          </div>
          <div class="tips">温馨提示：请丢失物品或拾取到物品的同学到综B一楼失物管理处交接物品，或者主动在该网站发布相关物品信息</div>
          <div class="avatar">
            <img :src="sex==1?'/static/img/ailiu.jpg':'/static/img/zhemu.jpg'" alt="">
            <span>{{username}}</span>
            <router-link :to="'/login'">退出</router-link>
          </div>
        </el-header>
        <div class="main">
          <el-main>
            <input-text :form='form' @save='save' :edit="edit"></input-text>
          </el-main>
        </div>
      </el-container>
    </el-container>
  </div>
  <div class="mobileDeatil" v-else-if="mobile">
    <Header :title="title"></Header>
    <div class="mobileDeatilMsg">
      <input-text :form='form' @save='save' :edit="edit"></input-text>
    </div>
  </div>
</template>

<script>
  import inputText from '../../common/input';
  import axios from "axios";
  import Header from '../../common/header';
  export default {
    data() {
      return {
        userid: '',
        username: '',
        index: '2-1',
        sex: 0,
        type: 0,
        edit: false,
        type: 0,
        form: {
          date: new Date(),
          id: this.userid,
          name: '',
          pic: '',
          type: '1',
          address: '',
          goodsname: '',
          feature: '',
          state: '1',
          phone: '',
          remarks: '',
          edit: false,
          receivername: '',
          receiverphone: ''
        },
        screenWidth: document.body.clientWidth,
        mobile: false,
        title: "新增失物"
      }
    },
    methods: {
      //导航栏
      handleSelect(key, keyPath) {
        switch (key) {
          case '1-1':
            let type = this.$cookies.get("type");
            if (type == 0) {
              this.$router.push({
                path: "/index"
              })
            } else {
              this.$router.push({
                path: "/adminIndex"
              })
            }
            break;
          case '2-1':
            this.$router.push({
              path: "/addgoods"
            })
            break;
          case '2-2':
            this.$router.push({
              path: "/goodslist"
            });
            break;
          case '2-3':
            this.$router.push({
              path: "/report"
            });
            break;
        }
      },
      save(item) {
        axios.post("/user/addGoods", item).then(res => {
          if (res.status == 200 && res.data.code == 0) {
            this.$message({
              message: "添加成功",
              type: "success",
              center: "true"
            });
            let type = this.$cookies.get("type");
            if (type == 0) {
              this.$router.push({
                path: '/index'
              })
            } else if (type == 1) {
              this.$router.push({
                path: '/adminIndex'
              })
            }
          } else {
            this.$message({
              message: res.data.msg,
              type: "error",
              center: "true"
            });
          }
        });
      }
    },
    beforeMount() {
      if (!this.$cookies.get("username")) {
        this.$message({
          message: "请登陆后再进行访问",
          type: "error",
          center: "true"
        });
        this.$router.push({
          path: "login"
        });
      }
      this.userid = this.$cookies.get("userid");
      this.username = this.$cookies.get("username");
      this.sex = this.$cookies.get("sex");
    },
    created() {
      if (document.body.clientWidth < 1024) {
        this.mobile = true;
      } else {
        this.mobile = false;
      }
      this.type = this.$cookies.get("type")
    },
    mounted() {
      const that = this
      window.onresize = () => {
        return (() => {
          window.screenWidth = document.body.clientWidth
          that.screenWidth = window.screenWidth
        })()
      }
    },
    watch: {
      screenWidth(val) {
        if (val <= 1024) {
          this.mobile = true;
        } else {
          this.mobile = false;
        }
      }
    },
    components: {
      inputText,
      Header
    }
  };

</script>

<style lang="less" scoped>
  .logo {
    background: #66b1ff;
    width: 180px;
    height: 80px;
    background-image: url("../../src/lost.jpg");
    background-size: 100% 100%;
  }

  .tips {
    color: #66b1ff;
    font-size: 14px;
  }

  .nav {
    color: #b8b8b8;
    cursor: pointer;

    .lost:hover {
      color: #66b1ff;
    }
  }

  .avatar {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .avatar img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: 2px solid#fff;
    cursor: pointer;
    margin-right: 20px;
  }

  .avatar img:hover {
    border: 2px solid#66b1ff;
  }

  .el-menu-item-group__title {
    padding: 0;
  }

  .el-submenu__title {
    padding: 0 40px;
  }

  .el-submenu .el-menu-item {
    padding: 0 60px;
  }

  .el-header {
    background-color: #fff;
    color: #333;
    line-height: 60px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    justify-content: space-between;
  }

  .aside {
    width: 180px;
    height: 100%;
    position: relative;
    overflow: hidden;
  }

  .main {
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
    background: #f5f5f5;
  }

  .el-aside,
  .el-main {
    color: #333;
    position: absolute;
    left: 0;
    top: 0;
    right: -17px;
    bottom: 0;
    overflow-x: hidden;
    overflow-y: scroll;
  }

  .el-main {
    padding: 20px;
  }

  .el-upload {
    border: 1px dashed #d9d9d9
  }

</style>

<style>
  /* 移动端 */
  .mobileDeatil {
    width: 100%;
    overflow: hidden;
    box-sizing: border-box;
    padding: .5rem;
    background: #fff;
    margin-top: 2.5rem;
    font-size: .7rem;
  }

  .mobileDeatilMsg {
    margin-bottom: 1rem;
  }

  .mobileDeatilMsg .item {
    font-size: .7rem !important;
    margin: 0 0 1rem 0 !important;
  }

  .mobileDeatilMsg .item .text {
    width: 30% !important;
  }

  .mobileDeatilMsg .item .el-input {
    width: 60% !important;
  }

  .mobileDeatilMsg .item .el-textarea {
    width: 60% !important;
  }

  .mobileDeatilMsg .item .filelabel {
    left: 5.8rem !important;
    bottom: .4rem !important;
  }

  .el-upload {
    border: 1px dashed #d9d9d9
  }

  .el-scrollbar__wrap {
    margin: 0 !important;
  }

</style>
