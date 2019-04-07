
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
          <div class="text"><label>发布时间:</label></div>
          <el-date-picker
          v-model="form.date"
          type="datetime"
          placeholder="选择日期时间"
          :disabled="form.edit"
          >
        </el-date-picker>
      </div>
      <div class="item">
          <div class="text"><label>发布类型:</label></div>
          <div class="radio">
              <el-radio v-model="form.radio" label="1" :disabled="form.edit">失物招领</el-radio>
              <el-radio v-model="form.radio" label="2" :disabled="form.edit">寻物启事</el-radio>
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
            v-model="form.textarea"
            :disabled="form.edit"
            >
          </el-input>
      </div>
      <div class="btn" v-if="!form.edit">
          <el-button type="info">返回</el-button>
          <el-button type="primary">保存</el-button>
      </div>
    </div>
</template>

<script>
  export default{
    props:{
      form:{
        edit:'',
        radio:'',
        name:'',
        goodsname:'',
        date:'',
        feature:'',
        textarea:''
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
        value4: '1'
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
    /* .el-radio__input.is-disabled+span.el-radio__label {
      color:#409EFF;
    } */
    .text{
      width: 200px;
      padding-right:10px; 
      text-align: right;
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
</style>
