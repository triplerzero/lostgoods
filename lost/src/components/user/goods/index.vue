<template>
    <div class="index">
    <el-container style="height: 710px; border: 1px solid #eee">
      <div class="aside">
          <el-aside width="200px" style="background-color: #eee">
              <el-menu :default-openeds="['1', '3']" :default-active="index" @select="handleSelect">
                <div class="logo">
                </div>
                <el-submenu index="1">
                  <template slot="title"><i class="el-icon-message"></i>失物管理</template>
                  <el-menu-item-group>
                    <el-menu-item index="1-1">失物信息</el-menu-item>
                    <el-menu-item index="1-2">失物详情</el-menu-item>
                  </el-menu-item-group>
                </el-submenu>
                <el-submenu index="2">
                  <template slot="title"><i class="el-icon-menu"></i>个人中心</template>
                  <el-menu-item-group>
                      <el-menu-item index="2-1">个人信息</el-menu-item>
                      <el-menu-item index="2-2">新增失物</el-menu-item>
                      <el-menu-item index="2-3">失物记录</el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
              </el-menu>
            </el-aside>
      </div>
  
      <el-container>
        <el-header style="text-align: right; font-size: 12px">
          <div class="nav">
            <span>失物</span> > <span class="lost">失物详情</span>
          </div>
          <div class="tips">温馨提示：请丢失物品或拾取到物品的同学到综B一楼失物管理处交接物品，或者主动在该网站发布相关物品信息</div>
          <div class="avatar">
            <img src="../src/zhemu.jpg" alt="">
            <span>{{name}}</span>
          </div>
        </el-header>
        <div class="search">
            <el-input v-model="goodsname" placeholder="物品名称"></el-input>
            <el-input v-model="feature" placeholder="物品特征"></el-input>
            <el-button type="primary">搜索</el-button>
        </div>
        <div class="main">
        <el-main>
          <el-table :data="tableData" stripe>
            <el-table-column prop="date" label="日期">
            </el-table-column>
            <el-table-column prop="name" label="学生姓名">
            </el-table-column>
            <el-table-column prop="type" label="发布类型">
            </el-table-column>
            <el-table-column prop="goodsname" label="物品名称">
            </el-table-column>
            <el-table-column prop="feature" label="物品特征">
            </el-table-column>
            <el-table-column prop="address" label="丢失地点">
            </el-table-column>
            <el-table-column prop="phone" label="联系方式">
            </el-table-column>
            <el-table-column prop="remarks" label="备注"> 
            </el-table-column>
            <el-table-column prop="details" label="操作"> 
                <template slot-scope="scope">
                    <el-button @click="handleClick(scope.row)" type="text" size="small">详情</el-button>
                    <!-- <el-button type="text" size="small">编辑</el-button> -->
                </template>
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
        index:'1-2',
        goodsname:'',
        feature:''
    }
  },
  methods: {
        handleSelect(key, keyPath) {
          console.log(key, keyPath);
        },
        handleClick(row) {
          console.log(row);
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
            type:'失物招领',
            address: '北街到综B的路途中',
            goodsname:'折叠伞',
            feature:'浅蓝色/带花纹',
            phone:'13800000000',
            remarks:'想取回失物请拨打联系电话13800000000联系拾主与约定时间地点取回',
            details:function(item){
              console.log(item);
            }
          }
          this.tableData=Array(20).fill(item)
    }
  };
  </script>
  
  <style lang="less">
      .logo{
        background: #66b1ff;
        width: 180px;
        height: 80px;
        background-image: url("../src/lost.jpg");
        background-size:100% 100%;
      }
      .tips{
        color: #66b1ff;
        font-size: 14px;
      }
      .nav{
        color: #b8b8b8;
        cursor: pointer;
        .lost:hover{
          color: #66b1ff;
        }
      }
  
      .avatar{
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .avatar img{
          width: 40px;
          height: 40px;
          border-radius: 50%;
          border:2px solid#fff;
          cursor: pointer;
          margin-right: 20px;
      }
      .avatar img:hover{
          border:2px solid#66b1ff;
      }
      .el-menu-item-group__title{
        padding: 0;
      }
      .el-submenu__title{
        padding: 0 40px; 
      }
      .el-submenu .el-menu-item{
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
      .el-main{
        padding:0 20px 20px;
      }
      .el-table .cell{
        text-overflow: -o-ellipsis-lastline;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
  }
  .search{
    padding:20px 20px;
    display: flex;
    justify-content: flex-start;
    background: #f5f5f5;
    .el-input{
      width: 15%;
      padding-right:10px;
    }
  }
  </style>
  
