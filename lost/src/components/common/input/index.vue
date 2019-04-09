
<template>
  <div>
    <div class="item">
        <div class="text"><label>发布人:</label></div>
        <el-input v-model="form.name" placeholder="发布人" :disabled="form.edit"></el-input>
      </div>
      <div class="item">
          <div class="text"><label>物品名称:</label></div>
          <el-input v-model="form.goodsname" placeholder="物品名称":disabled="form.edit"></el-input>
      </div>
      <div class="item">
        <div class="text"><label>物品图片:</label></div>
        <el-upload
        class="avatar-uploader"
        action="https://jsonplaceholder.typicode.com/posts/"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :disabled="form.edit"
        >
        <img v-if="imageUrl" :src="imageUrl" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </div>
      <div class="item">
          <div class="text"><label>丢失/拾取时间:</label></div>
          <el-date-picker
          v-model="form.date"
          type="datetime"
          placeholder="选择日期时间"
          :disabled="form.edit"
          >
        </el-date-picker>
      </div>
      <div class="item">
        <div class="text"><label>联系方式:</label></div>
        <el-input v-model="form.phone" placeholder="联系方式":disabled="form.edit"></el-input>
      </div>
      <div class="item">
          <div class="text"><label>发布类型:</label></div>
          <div class="radio">
              <el-radio v-model="form.type" label="1" :disabled="form.edit">失物招领</el-radio>
              <el-radio v-model="form.type" label="2" :disabled="form.edit">寻物启事</el-radio>
          </div>
      </div>
      <div class="item">
          <div class="text"><label>物品状态:</label></div>
          <el-select v-model="value4" clearable placeholder="请选择" :disabled="form.edit">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
                >
              </el-option>
            </el-select>
      </div>
      <div class="item">
          <div class="text"><label>物品特征:</label></div>
          <el-input
          type="textarea"
          :rows="5"
          placeholder="请输入物品特征"
          v-model="form.textarea"
          :disabled="form.edit"
          >
        </el-input>
      </div>
      <div class="item">
          <div class="text"><label>备注:</label></div>
          <el-input
            type="textarea"
            :rows="5"
            placeholder="请输入备注信息"
            v-model="form.remarks"
            :disabled="form.edit"
            >
          </el-input>
      </div>
      <div class="btn" v-if="!form.edit">
          <el-button type="info">返回</el-button>
          <el-button type="primary" @click='save'>保存</el-button>
      </div>
    </div>
</template>

<script>
  export default{
    props:{
      form:{
      }
    },
    data(){
      return {
        options: [{
          value: '1',
          label: '未领取'
        }, {
          value: '2',
          label: '已领取'
        }],
        value4: '1',
        imageUrl:''
      }
    },
    methods:{
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      save(){
        console.log(this.form.date.getFullYear());
        let { date,
              id,
              name,
              pic,
              type,
              address,
              goodsname,
              feature,
              state,
              phone,
              remarks}=this.form;
        console.log({ date,
              id,
              name,
              pic,
              type,
              address,
              goodsname,
              feature,
              state,
              phone,
              remarks})
        // axios.post("/user/addGoods", { userId, pwd }).then(res => {
        //   console.log(res);
        //   if (res.status == 200 && res.data.code == 0) {
        //     this.$message({
        //       message: "登陆成功",
        //       type: "success",
        //       center: "true"
        //     });
        //     this.$router.push({ path: "/index" });
        //   } else {
        //     this.$message({
        //       message: res.data.msg,
        //       type: "error",
        //       center: "true"
        //     });
        //   }
        // });
      }
    }
  }

</script>

<style lang="less">
    .item{
    display: flex;
    align-items: center;
    margin: 20px;
    font-size: 13px;
    color: #38393c;
    .el-input{
      width: 30%;
    }
    .el-select>.el-input {
      width: 70%;
    }
    .el-radio__label{
      color:#409EFF;
    }
    .text{
      width: 200px;
      padding-right:10px; 
      text-align: right;
    }
    .radio{
      padding-left:6px; 
    }
    /* .el-input.is-disabled .el-input__inner{
      color: #409EFF;
    }
    .el-radio__input.is-disabled.is-checked .el-radio__inner::after {
      background-color: #409EFF;
      width: 6px;
      height: 6px;
    } */
    .el-textarea{
      width: 70%;
    }
  }


  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
