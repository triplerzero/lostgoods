<template>
  <div class="index" style="position:fixed;top:0;bottom:0;left:0;width:100%;" v-if="!mobile">
    <el-container style="height: 100%; border: 1px solid #eee">
      <div class="aside">
        <el-aside width="200px" style="background-color: #eee">
          <el-menu :default-openeds="['1', '3']" :default-active="index" @select="handleSelect">
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
            <img :src="sex==1?'/static/img/ailiu.jpg':'/static/img/zhemu.jpg'" alt="" @click="handleLink">
            <span>{{name}}</span>
            <router-link :to="'/login'">退出</router-link>
          </div>
        </el-header>
        <div class="search">
          <el-input v-model="searchData.goodsname" placeholder="物品名称"></el-input>
          <el-input v-model="searchData.feature" placeholder="物品特征"></el-input>
          <el-input v-model="searchData.address" placeholder="丢失/拾取地点"></el-input>
          <el-select v-model="searchData.state" clearable placeholder="物品状态">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
          <el-button type="primary" @click="handleSearch">搜索</el-button>
        </div>
        <div class="tab">
          <el-tabs v-model="activeName" @tab-click="handleTab">
            <el-tab-pane label="全部" name="first"></el-tab-pane>
            <el-tab-pane label="失物招领" name="second"></el-tab-pane>
            <el-tab-pane label="寻物启事" name="third"></el-tab-pane>
          </el-tabs>
        </div>
        <div class="main">
          <el-main>
            <el-table :data="tableData" stripe height="100%">
              <el-table-column prop="goodsname" label="物品">
                <template slot-scope="scope">
                  <div class="goods_msg">
                    <img v-if="scope.row.pic" :src="scope.row.pic" class="goods_pic" />
                    <img v-if="!scope.row.pic" src="../../src/pic.jpg" class="goods_pic">
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
              <el-table-column prop="feature" label="物品特征" show-overflow-tooltip>
              </el-table-column>
              <el-table-column prop="address" label="地点" show-overflow-tooltip>
              </el-table-column>
              <el-table-column prop="phone" label="联系方式">
              </el-table-column>
              <el-table-column prop="remarks" label="备注" show-overflow-tooltip>
              </el-table-column>
              <el-table-column prop="state" label="失物状态">
                <template slot-scope="scope">
                  <span v-if="scope.row.type=='1'">{{status[scope.row.state]}}</span>
                  <span v-if="scope.row.type=='2'">{{statuse[scope.row.state]}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="details" label="操作">
                <template slot-scope="scope">
                  <el-button @click="handleClick(scope.row)" type="text" size="small">详情</el-button>
                  <el-button @click="handleReport(scope.row)" type="text" size="small">匿名举报</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-main>
        </div>
        <div class="footer">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
            :current-page="currentPage" :page-sizes="[10]" :page-size="10"
            layout="total, sizes, prev, pager, next, jumper" :total="total" class="pager">
          </el-pagination>
        </div>
      </el-container>
    </el-container>
    <el-dialog title="请填写举报理由" :visible.sync="centerDialogVisible" :modal-append-to-body='false' width="30%" center>
      <el-input type="textarea" :rows="4" placeholder="请输入举报理由" v-model="reason">
      </el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="cofirmReport">确 定</el-button>
      </span>
    </el-dialog>
  </div>
  <div v-else-if="mobile" class="mobileIndex">
    <Header :title="title"></Header>
    <div class="mobilesSearch">
      <el-input placeholder="物品名称/物品特征" class="searchInput" v-model="searchCon"></el-input>
      <el-button type="primary" class="searchBtn" @click="search">搜索</el-button>
    </div>
    <div class="scrollmain">
      <scroll :pullup='true' @scrollToEnd='scrollToEnd' class="main-content">
        <div class="mobileList">
          <div class="ListItem" v-for="(item,index) in lists" @click="handleDetail(item._id)">
            <div class="left">
              <img :src="item.pic" alt="" v-if="item.pic">
              <img src="../../src/pic.jpg" alt="" v-if="!item.pic">
            </div>
            <div class="right">
              <p>名称：{{item.goodsname}}</p>
              <p>类型：{{type[item.type]}}</p>
              <p>发布人学号：{{item.id}}</p>
              <p>发布人姓名：{{item.name}}</p>
              <p>物品特征：{{item.feature}}</p>
            </div>
            <div class="icon"></div>
          </div>
        </div>
      </scroll>
    </div>
    <Footer :curr="curr"></Footer>
    <div :class="loading?'loading':'loadinghide'" v-loading="loading" element-loading-lock="true"
      element-loading-text="加载中..." element-loading-background="rgba(0, 0, 0, 0.8)"></div>
  </div>
  </div>
  </div>
</template>

<script>
  import axios from 'axios';
  import Header from '../../common/header';
  import Footer from '../../common/footer';
  import Scroll from '../../common/scroll/scroll';
  export default {
    data() {
      return {
        name: '',
        tableData: [],
        index: '1-1',
        goodsname: '',
        feature: '',
        sex: '',
        reason: '',
        activeName: 'first',
        centerDialogVisible: false,
        goodstype:'',
        row: {},
        options: [{
            value: '1',
            label: '未领取/未找回'
          },
          {
            value: '2',
            label: '已领取/已找回'
          }
        ],
        type: {
          "1": "失物招领",
          "2": "寻物启事"
        },
        status: {
          "1": "未领取",
          "2": "已领取"
        },
        statuse: {
          "1": "未找回",
          "2": "已找回"
        },
        searchData: {
          goodsname: '',
          feature: '',
          address: '',
          type: '',
          state: ''
        },
        screenWidth: document.body.clientWidth,
        mobile: false,
        title: "失物信息",
        lists: [],
        curr: 1,
        total: 0,
        currentPage: 1,
        searchCon: "",
        page: 1,
        pagesize: 10,
        mobilepage: 1,
        loading: true
      }
    },
    methods: {
      //移动端详情跳转
      handleDetail(item) {
        this.$router.push({
          path: "/goodsdetails",
          query: {
            id: item
          }
        });
      },
      //分页
      handleSizeChange(val) {},
      handleCurrentChange(val) {
        this.page = val;
        this.getData()
      },
      //导航栏
      handleSelect(key, keyPath) {
        switch (key) {
          case '1-1':
            this.$router.push({
              path: "/index"
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
        this.$router.push({
          path: "/goodsdetails",
          query: {
            id: row._id
          }
        });
      },
      //头像跳转
      handleLink() {
        this.$router.push({
          path: "/goodslist"
        });
      },
      //举报
      handleReport(row) {
        this.centerDialogVisible = true;
        this.row = row;
      },
      cofirmReport() {
        let row = this.row;
        this.centerDialogVisible = false
        axios.post('/user/report', {
          id: row._id,
          userid: row.id,
          name: row.name,
          reason: this.reason,
          goodsname: row.goodsname,
          pic: row.pic
        }).then(res => {
          this.$message({
            message: res.data.msg,
            type: "success",
            center: "true"
          });
        })
      },
      //tab栏
      handleTab(tab, event) {
        this.searchData.type = tab.index;
        this.page=1;
        if(tab.index=="0"){
          this.searchData.type=""
        }
        this.getData();
      },
      //搜索
      handleSearch() {
        this.page=1;
        this.getData()
      },
      //获取移动端数据
      getMobileData(params) {
        axios.get('/user/getGoods', {
          params: params
        }).then(res => {
          if (res) {
            if (res.data.data) {
              let data = res.data.data;
              this.lists = this.lists.concat(data);
              setTimeout(() => {
                this.loading = false;
              }, 200)
            } else {
              this.loading = false;
            }
          }
        })
      },
      scrollTo() {
        scrollTo(0, 0);
      },
      //移动端搜索
      search() {
        this.scrollTo();
        this.loading = true;
        this.lists = [];
        this.mobilepage = 1;
        let params = {
          page: 1,
          pagesize: 10,
          search: this.searchCon
        }
        this.getMobileData(params);
      },
      getData() {
        if(this.searchData.state=="0"){
          this.searchData.state=""
        }
        axios.get('/user/getGoodsList', {
          params: {
            page: this.page,
            pagesize:10,
            type:this.searchData.type,
            goodsname:this.searchData.goodsname,
            feature:this.searchData.feature,
            address:this.searchData.address,
            state:this.searchData.state
          }
        }).then(res => {
          if (res) {
            let data = res.data.data;
            this.tableData = data;
            this.total = res.data.total;
          }
        })
      },
      //滚动加载
      scrollToEnd() {
        this.loading = true;
        if (this.loading) {
          this.mobilepage++;
          let params = {
            page: this.mobilepage,
            pagesize: 10,
            search: this.searchCon
          }
          this.getMobileData(params)
        }
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
      if (document.body.clientWidth < 1024) {
        this.mobile = true;
        let params = {
          page: this.mobilepage,
          pagesize: 10,
          search: this.searchCon
        }
        this.getMobileData(params)
      } else {
        this.mobile = false;
        this.getData()
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
        if (val <= 1024) {
          this.mobile = true;
          let params = {
            page: this.mobilepage,
            pagesize: 10,
            search: this.searchCon
          }
          this.getMobileData(params)
        } else {
          this.mobile = false;
          this.getData()
        }
      }
    },
    components: {
      Header,
      Footer,
      Scroll
    }
  };

</script>

<style lang="less">
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

  .el-select>.el-input {
    width: 80%;
  }

  .el-input__suffix {
    right: 12px;
    -webkit-transition: all .3s;
    transition: all .3s;
  }

  .mobileIndex {
    margin-top: 3rem;

    .mobilesSearch {
      display: flex;

      .searchInput {
        margin-right: .5rem;
      }

      margin-bottom:.5rem;
    }

    .mobileList {
      .ListItem {
        position: relative;
        display: flex;
        padding: .5rem;
        background: #fff;
        margin-bottom: .5rem;

        .left {
          width: 5rem;
          height: 5rem;

          img {
            width: 100%;
            height: 100%;
          }
        }
      }

      .right {
        margin-left: 1rem;
        width: 60%;

        p {
          font-size: .6rem;
          margin-bottom: .25rem;
          text-align: left;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
      }
    }

    .icon {
      width: 2rem;
      height: 2rem;
      background: url('/static/img/go.png') no-repeat;
      background-size: .7rem .7rem;
      background-position: right center;
      position: absolute;
      right: 2%;
      top: 50%;
      transform: translateY(-50%);
    }
  }

  .scrollmain {
    position: fixed;
    width: 100%;
    top: 5.5rem;
    bottom: 3.5rem;
  }

  .main-content {
    height: 100%;
    overflow: hidden
  }

  .footer {
    margin-bottom: 20px;

    .delBtn {
      float: left;
      margin: 0 20px 20px;
      width: 8%;
      min-width: 100px;
    }

    .pager {
      float: right;
    }
  }

  .loading {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 10;
  }

  .loadinghide {
    z-index: 0;
  }

</style>
