<template>
  <div class="PcLogin">
    <div class="login">
      <h1 class="loginTitle">高校失物招领管理系统</h1>
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
        radio: "1"
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
    },
    mounted() {
    }
  };

</script>

<style lang="less" scoped>
  .PcLogin {
    font-size: 16px;

    h1 {
      margin-bottom: 1rem;
    }
  }

  i {
    font-size: 1.2rem;
    color: #c0c4cc;
  }

  .el-input {
    margin-bottom: 1rem;
  }

  .loginTitle {
    margin-bottom: 1rem;
    font-size: 1.5rem;
  }

  .login {
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 90%;

    .loginBtn {
      width: 100%;
      margin-left: 0;
      margin-bottom: 1rem;
    }
  }

</style>
