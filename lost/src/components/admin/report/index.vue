<template>
  <div class="index">
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
                <el-menu-item index="2-3">举报记录</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </el-aside>
      </div>

      <el-container>
        <el-header style="text-align: right; font-size: 12px">
          <div class="nav">
            <span>失物</span> > <span class="lost">举报记录</span>
          </div>
          <div class="tips">温馨提示：请丢失物品或拾取到物品的同学到综B一楼失物管理处交接物品，或者主动在该网站发布相关物品信息</div>
          <div class="avatar">
            <img :src="sex==1?'/static/img/ailiu.jpg':'/static/img/zhemu.jpg'" alt="" @click="handleLink">
            <span>{{name}}</span>
            <router-link :to="'/login'">退出</router-link>
          </div>
        </el-header>
        <div class="main">
          <el-main>
            <el-table :data="tableData" stripe type="selection">
              <el-table-column prop="goodsname" label="物品">
                <template slot-scope="scope">
                  <div class="goods_msg">
                    <img :src="scope.row.pic" class="goods_pic" />
                    <span class="goods_name">{{scope.row.goodsname}}</span>
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="userid" label="发布人学号">
              </el-table-column>
              <el-table-column prop="name" label="发布人姓名">
              </el-table-column>
              <el-table-column prop="reason" label="举报理由">
              </el-table-column>
              <el-table-column prop="details" label="操作">
                <template slot-scope="scope">
                  <el-button @click="handleClick(scope.row)" type="text" size="small">失物详情</el-button>
                  <el-button type="text" size="small" @click="handleDelete(scope.row)">删除举报记录</el-button>
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
  import axios from 'axios'
  export default {
    data() {
      return {
        name: '',
        tableData: [],
        index: '2-3',
        goodsname: '',
        feature: '',
        sex: 0,
        report: {},
        activeName: 'first',
        reportid: [],
        type: {
          "1": "失物招领",
          "2": "寻物启事"
        },
        status: {
          "1": "未领取",
          "2": "已领取"
        },
        searchData: {
          goodsname: '',
          feature: '',
          address: '',
          type: '0'
        }
      }
    },
    methods: {
      //导航栏
      handleSelect(key, keyPath) {
        switch (key) {
          case '1-1':
            this.$router.push({
              path: "/adminIndex"
            })
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
        }
      },
      //带参数跳转
      handleClick(row) {
        axios.get('/user/getGoodsList', {
          params: {
            id: row.id
          }
        }).then(res => {
          if (!res.data.data.length) {
            console.log(res)
            this.$message({
              message: "该失物已被删除，无法查看详情",
              type: "error",
              center: "true"
            });
          } else {
            this.$router.push({
              path: "/reportdetails",
              query: {
                id: row.id,
                edit: 1,
                admin: 1
              }
            });
          }
        })
      },
      //头像跳转
      handleLink() {
        this.$router.push({
          path: "/goodslist"
        });
      },
      //删除失物
      handleDelete(row) {
        this.$confirm('是否删除该记录？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          axios.post('/user/deleteReport', {
            _id: row._id
          }).then(res => {
            this.getData();
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      getData() {
        axios.get('/user/getreportlist').then(res => {
          let data = res.data.data.reverse();
          this.tableData = data;
        })
      }
    },
    beforeMount() {
      this.name = this.$cookies.get("username");
      this.sex = this.$cookies.get("sex");
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

    },
    created() {
      this.getData()
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

  .el-table .cell {
    text-overflow: -o-ellipsis-lastline;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  .search {
    padding: 20px 20px;
    display: flex;
    justify-content: flex-start;
    background: #f5f5f5;

    .el-input {
      width: 15%;
      padding-right: 10px;
    }
  }

  .tab {
    padding: 0 20px;
    justify-content: flex-start;
    background: #f5f5f5;
  }

  .goods_msg {
    display: flex;
    align-items: center;

    .goods_pic {
      width: 40px;
      height: 40px;
    }

    .goods_name {
      color: #66b1ff;
      padding-left: 10px;
    }
  }

</style>
