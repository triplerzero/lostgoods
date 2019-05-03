<template>
  <div v-if="!mobile">
    <h1 class="loginTitle">高校失物管理系统</h1>
    <div class="login">
      <el-row :gutter="8" justify="center" type='flex'>
        <el-col :xs="24" :sm="12" :md="10" :lg="8" :xl="8">
          <el-input suffix-icon="el-icon-edit" placeholder="请输入学号" v-model="user"></el-input>
          <el-input suffix-icon placeholder="请输入密码" v-model="pwd" :type="eyeOpen?'text':'password'"
            @keyup.enter.native="handleLogin">
            <i :class="eyeOpen?'el-input__icon iconfont icon-kaiyan':'el-input__icon iconfont icon-biyan'" slot="suffix"
              @click="handleEye"></i>
          </el-input>
          <el-button type="primary" class="loginBtn" @click="handleLogin">登录</el-button>
          <el-button type="danger" class="loginBtn" @click="handleClear">清空</el-button>
          <el-radio v-model="radio" label="1">学生</el-radio>
          <el-radio v-model="radio" label="2">管理员</el-radio>
        </el-col>
      </el-row>
    </div>
  </div>
  <div v-else-if="mobile">
    登陆
  </div>
</template>

<script>
  import axios from "axios";
  import Header from '../common/header';
  export default {
    name: "login",
    data() {
      return {
        eyeOpen: false,
        user: "",
        pwd: "",
        radio: "1",
        mobile: false,
        screenWidth: document.body.clientWidth
      };
    },
    methods: {
      //眼睛开关
      handleEye() {
        this.eyeOpen = !this.eyeOpen;
      },
      //清除数据
      handleClear() {
        this.user = "";
        this.pwd = "";
      },
      //登录
      handleLogin() {
        let userId = this.user;
        let pwd = this.pwd;
        let adminId = this.user;
        //用户登录
        if (this.radio == "1") {
          axios.post("/user/login", {
            userId,
            pwd
          }).then(res => {
            console.log(res);
            if (res.status == 200 && res.data.code == 0) {
              this.$message({
                message: "登陆成功",
                type: "success",
                center: "true"
              });
              this.$router.push({
                path: "/index"
              });
            } else {
              this.$message({
                message: res.data.msg,
                type: "error",
                center: "true"
              });
            }
          });
        }
        //管理员登录
        if (this.radio == "2") {
          axios.post("/user/adminLogin", {
            adminId,
            pwd
          }).then(res => {
            if (res.status == 200 && res.data.code == 0) {
              this.$message({
                message: "登陆成功",
                type: "success",
                center: "true"
              });
              this.$router.push({
                path: "/adminIndex"
              });
            } else {
              this.$message({
                message: res.data.msg,
                type: "error",
                center: "true"
              });
            }
          });
        }
      }
    },
    created() {
      if (document.body.clientWidth < 1008) {
        this.mobile = true;
      } else {
        this.mobile = false;
      }
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
        if (val <= 1008) {
          this.mobile = true;
        } else {
          this.mobile = false;
        }
      }
    },
    components: {
      Header
    }
  };

</script>

<style lang="less" scoped>
  i {
    font-size: 24px;
    color: #c0c4cc;
  }

  .loginTitle {
    position: fixed;
    left: 50%;
    top: 20%;
    transform: translate(-50%, -50%);
  }

  .login {
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 90%;

    .el-input {
      margin-bottom: 20px;
    }

    .loginBtn {
      width: 100%;
      margin-left: 0;
      margin-bottom: 20px;
    }
  }

</style>
