
<template>
  <div>
      <div class="item">
          <div class="text"><label>发布人学号:</label></div>
          <el-input v-model="form.id" placeholder="发布人学号" disabled="disabled"></el-input>
        </div>
      <div class="item">
        <div class="text"><label>发布人:</label></div>
        <el-input v-model="form.name" placeholder="发布人" disabled="disabled"></el-input>
      </div>
      <div class="item">
          <div class="text"><label>物品名称:</label></div>
          <el-input v-model="form.goodsname" placeholder="物品名称":disabled="edit"></el-input>
      </div>
      <div class="item">
        <div class="text active"><label>物品图片:</label></div>
        <el-upload
        class="avatar-uploader"
        action=""
        :show-file-list="false"
        :disabled="edit"
        :http-request="uploadImg"
        >
        <img v-if="form.pic" :src="form.pic" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <label for="file" class="filelabel"></label>
      </div>
      <div class="item">
          <div class="text"><label>丢失/拾取时间:</label></div>
          <el-date-picker
          v-model="form.date"
          type="date"
          placeholder="选择日期时间"
          :disabled="edit"
          >
        </el-date-picker>
      </div>
      <div class="item">
        <div class="text"><label>丢失/拾取地点:</label></div>
        <el-input v-model="form.address" placeholder="丢失/拾取地点":disabled="edit"></el-input>
      </div>
      <div class="item">
        <div class="text"><label>联系方式:</label></div>
        <el-input v-model="form.phone" placeholder="联系方式":disabled="edit"></el-input>
      </div>
      <div class="item">
          <div class="text"><label>发布类型:</label></div>
          <div class="radio">
              <el-radio v-model="form.type" label="1" :disabled="edit">失物招领</el-radio>
              <el-radio v-model="form.type" label="2" :disabled="edit">寻物启事</el-radio>
          </div>
      </div>
      <div class="item">
          <div class="text"><label>物品状态:</label></div>
          <el-select v-model="form.state" clearable placeholder="请选择" :disabled="edit">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
                >
              </el-option>
            </el-select>
      </div>
      <div class="item" v-if="form.state=='2'">
        <div class="text"><label>领取人姓名:</label></div>
        <el-input v-model="form.receivername" placeholder="领取人姓名":disabled="edit"></el-input>
      </div>
      <div class="item" v-if="form.state=='2'">
        <div class="text"><label>领取人联系方式:</label></div>
        <el-input v-model="form.receiverphone" placeholder="领取人联系方式":disabled="edit"></el-input>
      </div>
      <div class="item">
          <div class="text"><label>物品特征:</label></div>
          <el-input
          type="textarea"
          :rows="5"
          placeholder="请输入物品特征"
          v-model="form.feature"
          :disabled="edit"
          >
        </el-input>
      </div>
      <div class="item">
          <div class="text active"><label>备注:</label></div>
          <el-input
            type="textarea"
            :rows="5"
            placeholder="请输入备注信息"
            v-model="form.remarks"
            :disabled="edit"
            >
          </el-input>
      </div>
      <div class="btn" v-if="!edit">
          <el-button type="info">返回</el-button>
          <el-button type="primary" @click='save' :disabled="btn">保存</el-button>
      </div>
      <input type="file" @change="upload" ref="upload" id="file" name="file" accept="image/*" class="file" :disabled="edit">
    </div>
</template>

<script>
  import axios from 'axios';
  export default{
    props:{
      form:{
      },
      edit:{
        type:Boolean,
        default:function(){
          return true
        }
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
        btn:false
      }
    },
    methods:{
      upload(){
        var formData = new FormData();
        formData.append('file',this.$refs.upload.files[0]);
        console.log(formData.getAll('file'))
        axios.post('/user/uploadImg',formData,
        { anync:true,
          contentType:false,
          processData:false}).then(res=>{
          let url="img/";
          this.form.pic=''+url+''+res.data.data[0].filename+'';
        })
      },
      uploadImg(){

      },
      save(){
        console.log(this.edit)
        this.btn=true;
        if(this.form.goodsname==""){
          this.$message({
                message: "物品名称不能为空",
                type: "error",
                center: "true"
              });
          this.btn=false;
          return false;
        }
        if(this.form.address==""){
          this.$message({
                message: "丢失/拾取地点不能为空",
                type: "error",
                center: "true"
              });
          this.btn=false;
          return false;
        }
        if(this.form.phone==""){
          this.$message({
                message: "联系方式不能为空",
                type: "error",
                center: "true"
              });
          this.btn=false;
          return false;
        }
        if(this.form.state=='2'){
          if(this.form.receivername==""){
          this.$message({
                message: "领取人名字不能为空",
                type: "error",
                center: "true"
              });
          this.btn=false;
          return false;
        }
        if(this.form.receiverphone==""){
          this.$message({
                message: "领取人联系方式不能为空",
                type: "error",
                center: "true"
              });
          this.btn=false;        
          return false;
        }
        }
        if(this.form.feature==""){
          this.$message({
                message: "物品特征不能为空",
                type: "error",
                center: "true"
              });
          this.btn=false;
          return false;
        }


        let year=this.form.date.getFullYear();
        let month=this.form.date.getMonth()+1;
        let day=this.form.date.getDate();
        this.form.date=''+year+'-'+month+'-'+day+'';
        this.$emit('save',this.form);
      }
    },
    beforeMount() {
      if(!this.$cookies.get("username")){
        this.$message({
                message: "请登陆后再进行访问",
                type: "error",
                center: "true"
              });
        this.$router.push({path:"login"});
      }
      this.form.id=this.$cookies.get("userid");
      this.form.name = this.$cookies.get("username");
    },
    created(){
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
    .text::before{
      content: '*';
      color: red;
      margin-right:6px; 
    }
    .active::before{
      content: '';
    }
    .radio{
      padding-left:6px; 
    }
    .el-input.is-disabled .el-input__inner{
      color: #409EFF;
    }
    .el-radio__input.is-disabled.is-checked .el-radio__inner::after {
      background-color: #409EFF;
      width: 6px;
      height: 6px;
    }
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
  .item{
    position: relative;
    .avatar {
    width: 178px;
    height: 178px;
    display: block;
    } 
    .filelabel{
      display: block;
      width: 178px;
      height: 178px;
      position: absolute;
      left: 211px;
      bottom: 5px;
  }
  }
  .file{
    display: none;
  }
  .el-textarea.is-disabled .el-textarea__inner {
    background-color: #f5f7fa;
    border-color: #E4E7ED;
    color: #409EFF;;
    cursor: not-allowed;
}


</style>
