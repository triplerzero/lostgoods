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
    res.cookie('username',doc.adminName);
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
  let {
    date,
    id,
    name,
    pic,
    type,
    address,
    goodsname,
    feature,
    state,
    phone,
    remarks 
  }=req.body;
  Goods.create({
    date,
    id,
    name,
    pic,
    type,
    address,
    goodsname,
    feature,
    state,
    phone,
    remarks
  },(err,doc)=>{
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
})

module.exports = Router;
