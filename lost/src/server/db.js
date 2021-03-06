//引包
const mongoose=require('mongoose')
//连接mongodb并且创建数据库
const DB_URL='mongodb://localhost:27017/db_user'
mongoose.connect(DB_URL)

//表对象，一个或多个
const models={
  user:{
    userId:{type:'String',require:'true'},
    userName:{type:'String',require:'true'},
    sex:{type:'String',require:'true'},
    pwd:{type:'String',require:'true'}
    // power:{type:Number,require:'true'}
  },
  admin:{
    adminId:{type:'String',require:'true'},
    adminName:{type:'String',require:'true'},
    sex:{type:'String',require:'true'},
    pwd:{type:'String',require:'true'}
  },
  goods:{
    date:{type:'String'},
    id:{type:'String'},
    name:{type:'String'},
    pic:{type:'String'},
    type:{type:'String'},
    goodsname:{type:'String',require:'true'},
    feature:{type:'String',require:'true'},
    address:{type:'String',require:'true'},
    phone:{type:'String',require:'true'},
    remarks:{type:'String'},
    state:{type:'String'},
    receivername:{type:'String'},
    receiverphone:{type:'string'}
  },
  report:{
    id:{type:'String'},
    userid:{type:'String'},
    name:{type:'String'},
    reason:{type:'String'},
    pic:{type:'String'},
    goodsname:{type:'String'}
  }
}

//循环遍历数据库表
for(m in models){
mongoose.model(m,new mongoose.Schema(models[m]))
}

//导出数据库表
module.exports={
  getModel:function(name){
    return mongoose.model(name)
  }
}