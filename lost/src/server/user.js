//引入express框架
const express = require('express');
//引用express框架的路由方法
const Router = express.Router();
//导入数据库
const db = require('./db');
//获取表
const User = db.getModel('user');
const Admin=db.getModel('admin');
const Goods=db.getModel('goods');
//引入加密中间件
const utils = require('utility');
//引入图片上传中间件
const multer=require('multer')

//查看user表中所有数据
// Router.get('/list',(req,res)=>{

// });
//插入数据
// let pwds=md5Pwd('admin');
// let {adminId,adminName,sex,pwd}={adminId:'admin',adminName:'admin',sex:0,pwd:pwds};
// Admin.create({adminId,adminName,sex,pwd});

//用户表插入数据
// let psw=md5Pwd(2015354100);
// let {userId,userName,sex,pwd}={userId:'2015354100',userName:'2015354100',sex:1,pwd:psw};
// User.create({userId,userName,sex,pwd})

//清空user表中的数据
Router.get('/remove', (req, res) => {
  User.remove({}, () => {});
  res.json({
    code: 0
  });
});

//用户登录
Router.post('/login', (req, res) => {
  let {
    userId,
    pwd
  } = req.body;
  pwd=md5Pwd(pwd);
  User.findOne({
    userId,
    pwd
  }, (err, doc) => {
    if (!doc) {
      return res.json({
        code: 1,
        msg: '学号或密码有误'
      })
    }
    res.cookie('username',doc.userName);
    res.cookie('userid',doc.userId);
    res.cookie('type',0)
    return res.json({code:0,data:doc})
  })
})
//管理员登录
Router.post('/adminLogin',(req,res)=>{
  let {
    adminId,
    pwd
  } = req.body;
  pwd=md5Pwd(pwd);
  Admin.findOne({
    adminId,
    pwd
  }, (err, doc) => {
    if (!doc) {
      return res.json({
        code: 1,
        msg: '账号或密码有误'
      })
    }
    res.cookie('userid',doc.adminId);
    res.cookie('username',doc.adminName);
    res.cookie('type',1);
    return res.json({code:0,data:doc})
  })  
})

//加密
function md5Pwd(pwd){
  const salt = "novazero";
  return utils.md5(utils.md5(pwd+salt));
}

//新增物品
Router.post('/addGoods',(req,res)=>{
  Goods.create(
    req.body
    ,(err,doc)=>{
    if (!doc) {
      return res.json({
        code: 1,
        msg: '新增失败'
      })
    }else{
      return res.json({
        code: 0,
        data: doc
      })
    }
  })
})
//获取失物列表信息
Router.get('/getGoodsList',(req,res)=>{
  if(JSON.stringify(req.query) == "{}"){
    Goods.find({},(err,doc)=>{
      if (!doc) {
        return res.json({
          code: 1,
          msg: '没有数据返回'
        })
      }else{
        return res.json({
          code: 0,
          data: doc
        })
      }
    })
  }
  if(req.query.userId){
    Goods.find({
      id:req.query.userId
    },(err,doc)=>{
      if (!doc) {
        return res.json({
          code: 1,
          msg: '没有数据返回'
        })
      }else{
        return res.json({
          code: 0,
          data: doc,
          message:"学生发布记录"
        })
      }
    })
  }
  if(req.query.type){
    if(req.query.type=="0"){
      Goods.find({},(err,doc)=>{
        if (!doc) {
          return res.json({
            code: 1,
            msg: '没有数据返回'
          })
        }else{
          return res.json({
            code: 0,
            data: doc
          })
        }
      })
    }
    else{
      Goods.find({
        type:req.query.type
      },(err,doc)=>{
        if (!doc) {
          return res.json({
            code: 1,
            msg: '没有数据返回'
          })
        }else{
          return res.json({
            code: 0,
            data: doc
          })
        }
      })
    }
  }
  if(req.query.goodsname||req.query.feature||req.query.address){
    if(req.query.stype=="0"){
    Goods.find({
      $and:[
        { goodsname:{$regex:req.query.goodsname}},
        { feature:{$regex:req.query.feature}},
        { address:{$regex:req.query.address}}
      ]
    },(err,doc)=>{
      if (!doc) {
        return res.json({
          code: 1,
          msg: '没有数据返回'
        })
      }else{
        return res.json({
          code: 0,
          data: doc
        })
      }
    })  
  }
  else{
    Goods.find({
      $and:[
        { goodsname:{$regex:req.query.goodsname}},
        { feature:{$regex:req.query.feature}},
        { address:{$regex:req.query.address}},
        { type:req.query.stype }
      ]
    },(err,doc)=>{
      if (!doc) {
        return res.json({
          code: 1,
          msg: '没有数据返回'
        })
      }else{
        return res.json({
          code: 0,
          data: doc
        })
      }
    })   
  }
}
})
//获取失物详情信息
Router.get('/getGoodsDetail',(req,res)=>{
  Goods.findOne({
    _id:req.query.id
  },(err,doc)=>{
    if (!doc) {
      return res.json({
        code: 1,
        msg: '没有数据返回'
      })
    }else{
      return res.json({
        code: 0,
        data: doc
      })
    }   
  })
})

//图片上传
let upload=multer({dest:'./public/img'}).any()
Router.post('/uploadImg',upload,(req,res)=>{
  return res.json({
    code: 0,
    data: req.files
  })
})

//删除失物
Router.post('/deleteGoods',(req,res)=>{
  Goods.remove({
    _id:req.body._id
  },(err,doc)=>{
    if (!doc) {
      return res.json({
        code: 1,
        msg: '删除失败'
      })
    }else{
      return res.json({
        code: 0,
        message: '删除成功',
        data:doc
      })
    }  
  })
})
//更新失物信息
Router.post('/updateGoods',(req,res)=>{
  Goods.update(
    {
      "_id":req.body._id
    }, {
      $set:{
        "_id":req.body._id,
        "date":req.body.date,
        "name":req.body.name,
        "pic":req.body.pic,
        "type":req.body.type,
        "goodsname":req.body.goodsname,
        "feature":req.body.feature,
        "address":req.body.address,
        "phone":req.body.phone,
        "remarks":req.body.remarks,
        "state":req.body.state,
        "receivername":req.body.receivername,
        "receiverphone":req.body.receiverphone
      }
    }
    ,(err,doc)=>{
      if (!doc) {
        return res.json({
          code: 1,
          msg: '更新失败'
        })
      }else{
        return res.json({
          code: 0,
          message: '更新成功',
          data:doc
        })
      }  
  })
})

module.exports = Router;
