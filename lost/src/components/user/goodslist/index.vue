<template>
  <div class="index">
  <el-container style="height: 740px; border: 1px solid #eee">
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
          <span>失物</span> > <span class="lost">失物信息</span>
        </div>
        <div class="tips">温馨提示：请丢失物品或拾取到物品的同学到综B一楼失物管理处交接物品，或者主动在该网站发布相关物品信息</div>
        <div class="avatar">
          <img src="../src/zhemu.jpg" alt="">
          <span>{{name}}</span>
        </div>
      </el-header>
      <div class="goodsLidtMain">
      <el-main>
        <el-table :data="tableData" stripe>
          <el-table-column prop="goodsname" label="物品">
              <template slot-scope="scope">
                <div class="goods_msg">
                  <img :src="scope.row.pic" class="goods_pic"/>
                  <span class="goods_name">{{scope.row.goodsname}}</span>
                </div>
              </template>
          </el-table-column>
          <el-table-column prop="date" label="丢失/拾取时间">
          </el-table-column>
          <el-table-column prop="id" label="发布人学号">
          </el-table-column>
          <el-table-column prop="name" label="发布人姓名">
          </el-table-column>
          <el-table-column prop="type" label="发布类型">
              <template slot-scope="scope">
                <span>{{type[scope.row.type]}}</span> 
              </template>
          </el-table-column>
          <el-table-column prop="feature" label="物品特征">
          </el-table-column>
          <el-table-column prop="address" label="地点">
          </el-table-column>
          <el-table-column prop="phone" label="联系方式">
          </el-table-column>
          <el-table-column prop="remarks" label="备注"> 
          </el-table-column>
          <el-table-column prop="state" label="失物状态"> 
              <template slot-scope="scope">
                  <span>{{status[scope.row.state]}}</span> 
                </template>
          </el-table-column>
          <el-table-column prop="details" label="操作"> 
              <template slot-scope="scope">
                  <el-button @click="handleClick(scope.row)" type="text" size="small">编辑</el-button>
                  <el-button type="text" size="small" @click="handleDelete(scope.row)">删除</el-button>
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
      id:'',
      tableData:[],
      index:'2-3',
      goodsname:'',
      feature:'',
      activeName: 'first',
      type:{
        "1":"失物招领",
        "2":"寻物启事"
      },
      status:{
        "1":"未领取",
        "2":"已领取"
      },
      searchData:{
        goodsname:'',
        feature:'',
        address:''
      }
  }
},
methods: {
      //导航栏
      handleSelect(key, keyPath) {
        switch(key){
          case '1-1':
          this.$router.push({path:"user/addgoods"})
          break;
          case '2-1':
          this.$router.push({path:"user/addgoods"})
          break;
          case '2-2':
          this.$router.push({path:"user/addgoods"})
          break;
          case '2-3':
          this.$router.push({path:"user/goodslist"});
          break;
        }
      },
      //带参数跳转
      handleClick(row) {
        this.$router.push({path:"/goods/goodsdetails",query:{id:row._id,edit:1}});
      },
      //删除失物
      handleDelete(row){
        this.$confirm('此操作将永久删除失物信息, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            axios.post('/user/deleteGoods',
            {_id:row._id}
          ).then(res=>{
            this.getData();
            console.log(res);
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
      //tab栏
      handleTab(tab, event) {
        let params={type:tab.index};
        this.getData(params);

      },
      //搜索
      handleSearch(){
        axios.get('/user/getGoodsList',{
        params:{
          goodsname:this.searchData.goodsname
        }}).then(res=>{
          if(res){
            let data=res.data.data;
            this.tableData=data;
          }
        })
      },
      getData(){
        axios.get('/user/getGoodsList',{
        params:{
          userId:this.id
        }}).then(res=>{
          if(res){
            let data=res.data.data.reverse();
            this.tableData=data;
          }
        })       
      }
},
  beforeCreated() {
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
      this.name = this.$cookies.get("username");
      this.id=this.$cookies.get("userid");
      this.getData()
  }
};
</script>

<style lang="less">
    body{
      background: f5f5f5;
    }
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
    .goodsLidtMain{
      width: 100%;
      height: 100%;
      position: relative;
      overflow: hidden; 
      background: #f5f5f5;
      margin-top: 20px;
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
      padding:20px 20px ;
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

.tab{
  padding: 10px 20px 10px;
  justify-content: flex-start;
  background: #f5f5f5;
}
.goods_msg{
  display: flex;
  align-items: center;
.goods_pic{
  width: 40px;
  height: 40px;
}
.goods_name{
  color:#66b1ff;
  padding-left:10px; 
}
}
</style>
