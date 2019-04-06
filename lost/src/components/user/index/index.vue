<template>
  <div class="index">
  <el-container style="height: 742px; border: 1px solid #eee">
    <div class="aside">
        <el-aside width="200px" style="background-color: #eee">
            <el-menu :default-openeds="['1', '3']" default-active="index">
              <div class="logo">
              </div>
              <el-submenu index="1">
                <template slot="title"><i class="el-icon-message"></i>失物</template>
                <el-menu-item-group>
                  <el-menu-item index="1-1">失物信息</el-menu-item>
                  <el-menu-item index="1-2">失物发布</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
              <el-submenu index="2">
                <template slot="title"><i class="el-icon-menu"></i>个人中心</template>
                <el-menu-item-group>
                    <el-menu-item index="1-1">选项1</el-menu-item>
                    <el-menu-item index="1-2">选项2</el-menu-item>
                  </el-menu-item-group>
              </el-submenu>
            </el-menu>
          </el-aside>
    </div>

    <el-container>
      <el-header style="text-align: right; font-size: 12px">
        <div class="avatar">
          <img src="../src/zhemu.jpg" alt="">
        </div>
        <span>{{name}}</span>
      </el-header>
      <div class="main">
      <el-main>
        <el-table :data="tableData">
          <el-table-column prop="date" label="日期" width="140">
          </el-table-column>
          <el-table-column prop="name" label="姓名" width="120">
          </el-table-column>
          <el-table-column prop="address" label="地点">
          </el-table-column>
          <el-table-column prop="phone" label="联系方式">
          </el-table-column>
          <el-table-column prop="address" label="地点">
            </el-table-column>
        </el-table>
      </el-main>
      </div>
    </el-container>
  </el-container>
</div>
</template>

<script>
export default {
  data() {
    return {
      name: '',
      tableData:'',
      index:'1-1'
  }
},
  beforeMount() {
    this.name = this.$cookies.get("username");
    if(!this.$cookies.get("username")){
      this.$message({
              message: "请登陆后再进行访问",
              type: "error",
              center: "true"
            });
      this.$router.push({path:"login"});
    }
    
  },
  created(){
    const item = {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
          phone:'13800000000'
        }
        this.tableData=Array(20).fill(item)
  }
};
</script>

<style scoped>
    .logo{
      background: #66b1ff;
      width: 180px;
      height: 80px;
      background-image: url("../src/lost.jpg");
      background-size:100% 100%;
    }
    .avatar{
      width: 40px;
      height: 40px;
      border-radius: 50%;
      padding-right:20px; 
    }
    .avatar img{
        width: 40px;
        height: 40px;
        border-radius: 50%;
        border:2px solid#fff;
        cursor: pointer;
    }
    .avatar img:hover{
        border:2px solid#66b1ff;
    }
    .el-menu-item-group__title{
      padding: 0;
    }
    .el-submenu__title,.el-menu-item{
      padding: 0 40px; 
    }
    .el-header {
      background-color: #fff;
      color: #333;
      line-height: 60px;
      display: flex;
      justify-content: flex-end;
      align-items: center;
    }
    .aside{
      width: 180px;
      height: 100%;
      position: relative;
      overflow: hidden;
    }
    .main{
      width: 100%;
      height: 100%;
      position: relative;
      overflow: hidden; 
      background: #f5f5f5;
    }
    .el-aside,.el-main {
      color: #333;
      position: absolute;
      left: 0;
      top: 0;
      right: -17px;
      bottom: 0;
      overflow-x: hidden;
      overflow-y: scroll;
    }

  
</style>
