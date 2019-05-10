//引入express框架
const express = require('express');
//引用express框架的路由方法
const Router = express.Router();
//导入数据库
const db = require('./db');
//获取表
const User = db.getModel('user');
const Admin = db.getModel('admin');
const Goods = db.getModel('goods');
const Report = db.getModel('report');
//引入加密中间件
const utils = require('utility');
//引入图片上传中间件
const multer = require('multer')

//查看user表中所有数据
// Router.get('/list',(req,res)=>{

// });
//插入数据
// let pwds=md5Pwd('admins');
// let {adminId,adminName,sex,pwd}={adminId:'admins',adminName:'admins',sex:1,pwd:pwds};
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
  pwd = md5Pwd(pwd);
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
    res.cookie('username', doc.userName);
    res.cookie('userid', doc.userId);
    res.cookie('type', 0);
    res.cookie('sex', doc.sex);
    return res.json({
      code: 0,
      data: doc
    })
  })
})
//管理员登录
Router.post('/adminLogin', (req, res) => {
  let {
    adminId,
    pwd
  } = req.body;
  pwd = md5Pwd(pwd);
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
    res.cookie('userid', doc.adminId);
    res.cookie('username', doc.adminName);
    res.cookie('type', 1);
    res.cookie('sex', doc.sex);
    return res.json({
      code: 0,
      data: doc
    })
  })
})

//加密
function md5Pwd(pwd) {
  const salt = "novazero";
  return utils.md5(utils.md5(pwd + salt));
}

//新增物品
Router.post('/addGoods', (req, res) => {
  Goods.create(
    req.body, (err, doc) => {
      if (!doc) {
        return res.json({
          code: 1,
          msg: '新增失败'
        })
      } else {
        return res.json({
          code: 0,
          data: doc
        })
      }
    })
})
//获取失物列表信息
Router.get('/getGoodsList', (req, res) => {
  if (req.query) {
    if (req.query.type) {
      let page = Number(req.query.page);
      let pageSize = Number(req.query.pagesize);
      let queryResult = Goods.find({
        type: req.query.type
      }).limit(pageSize).skip((page - 1) * pageSize).sort({
        '_id': -1
      });
      queryResult.exec((err, doc) => {
        if (!doc) {
          return res.json({
            code: 1,
            msg: '没有数据返回'
          })
        } else {
          return res.json({
            code: 0,
            data: doc
          })
        }
      })
      if (req.query.type == "0") {
        let goodlist = Goods.find({}).limit(10).sort({
          '_id': -1
        })
        let total = Goods.find({}).count();
        let num = 0;
        total.exec((err, doc) => {
          num = doc
        })
        goodlist.exec((err, doc) => {
          if (!doc) {
            return res.json({
              code: 1,
              msg: '没有数据返回'
            })
          } else {
            return res.json({
              code: 0,
              data: doc,
              total: num
            })
          }
        })
      } else {
        let goodlist = Goods.find({
          type: req.query.type
        }).limit(10).sort({
          '_id': -1
        })
        let total = Goods.find({
          type: req.query.type
        }).count();
        let num = 0;
        total.exec((err, doc) => {
          num = doc
        })
        goodlist.exec((err, doc) => {
          if (!doc) {
            return res.json({
              code: 1,
              msg: '没有数据返回'
            })
          } else {
            return res.json({
              code: 0,
              data: doc,
              total: num
            })
          }
        })
      }
    }

  }
  if (JSON.stringify(req.query) == "{}") {
    let goodlist = Goods.find({}).limit(10).sort({
      '_id': -1
    })
    let total = Goods.find({}).count();
    let num = 0;
    total.exec((err, doc) => {
      num = doc
    })
    goodlist.exec((err, doc) => {
      if (!doc) {
        return res.json({
          code: 1,
          msg: '没有数据返回'
        })
      } else {
        return res.json({
          code: 0,
          data: doc,
          total: num
        })
      }
    })
  } else {
    // Goods.find({
    //     $and: [{
    //         type:req.query.type,
    //         goodsname: {
    //           $regex: req.query.goodsname
    //         }
    //       },
    //       {
    //         feature: {
    //           $regex: req.query.feature
    //         }
    //       },
    //       {
    //         address: {
    //           $regex: req.query.address
    //         }
    //       }, {
    //         state: req.query.state
    //       }
    //     ]
    //   }, (err, doc) => {
    //     if (!doc) {
    //       return res.json({
    //         code: 1,
    //         msg: '没有数据返回'
    //       })
    //     } else {
    //       return res.json({
    //         code: 0,
    //         data: doc
    //       })
    //     }
    //   })

    if (req.query.userId) {
      Goods.find({
        id: req.query.userId
      }, (err, doc) => {
        if (!doc) {
          return res.json({
            code: 1,
            msg: '没有数据返回'
          })
        } else {
          return res.json({
            code: 0,
            data: doc,
            msg: "学生发布记录"
          })
        }
      })
    }
    if (req.query.type) {
      if (req.query.type == "0") {
        let goodlist = Goods.find({}).limit(10).sort({
          '_id': -1
        })
        let total = Goods.find({}).count();
        let num = 0;
        total.exec((err, doc) => {
          num = doc
        })
        goodlist.exec((err, doc) => {
          if (!doc) {
            return res.json({
              code: 1,
              msg: '没有数据返回'
            })
          } else {
            return res.json({
              code: 0,
              data: doc,
              total: num
            })
          }
        })
      } else {
        let goodlist = Goods.find({
          type: req.query.type
        }).limit(10).sort({
          '_id': -1
        })
        let total = Goods.find({
          type: req.query.type
        }).count();
        let num = 0;
        total.exec((err, doc) => {
          num = doc
        })
        goodlist.exec((err, doc) => {
          if (!doc) {
            return res.json({
              code: 1,
              msg: '没有数据返回'
            })
          } else {
            return res.json({
              code: 0,
              data: doc,
              total: num
            })
          }
        })
      }
    }
    if (req.query.id) {
      Goods.find({
        "_id": req.query.id
      }, (err, doc) => {
        if (!doc) {
          return res.json({
            code: 1,
            msg: '没有数据返回'
          })
        } else {
          return res.json({
            code: 0,
            data: doc
          })
        }
      })
    }
    if (req.query.goodsname || req.query.feature || req.query.address) {
      if (req.query.stype == "0") {
        Goods.find({
          $and: [{
              goodsname: {
                $regex: req.query.goodsname
              }
            },
            {
              feature: {
                $regex: req.query.feature
              }
            },
            {
              address: {
                $regex: req.query.address
              }
            }, {
              state: req.query.state
            }
          ]
        }, (err, doc) => {
          if (!doc) {
            return res.json({
              code: 1,
              msg: '没有数据返回'
            })
          } else {
            return res.json({
              code: 0,
              data: doc
            })
          }
        })
      } else {
        Goods.find({
          $and: [{
              goodsname: {
                $regex: req.query.goodsname
              }
            },
            {
              feature: {
                $regex: req.query.feature
              }
            },
            {
              address: {
                $regex: req.query.address
              }
            },
            {
              type: req.query.stype
            }
          ]
        }, (err, doc) => {
          if (!doc) {
            return res.json({
              code: 1,
              msg: '没有数据返回'
            })
          } else {
            return res.json({
              code: 0,
              data: doc
            })
          }
        })
      }
    }
  }
  if (req.query.page && req.query.pagesize) {
    let page = Number(req.query.page);
    let pageSize = Number(req.query.pagesize);
    let queryResult = Goods.find({}).limit(pageSize).skip((page - 1) * pageSize).sort({
      '_id': -1
    });
    queryResult.exec((err, doc) => {
      if (!doc) {
        return res.json({
          code: 1,
          msg: '没有数据返回'
        })
      } else {
        return res.json({
          code: 0,
          data: doc
        })
      }
    })
  }
})

//获取失物列表（移动端）
Router.get('/getGoods', (req, res) => {
  if (req.query.search) {
    let searchCon = req.query.search.split(' ');
    let goodsname = Goods.find({
      $and: [{
        goodsname: {
          $regex: searchCon[0]
        }
      }, {
        feature: {
          $regex: searchCon[1]
        }
      }]
    }).limit(10).sort({
      '_id': -1
    })
    let total = Goods.find({}).count();
    let num = 0;
    total.exec((err, doc) => {
      num = doc
    })
    goodsname.exec((err, doc) => {
      if (!doc) {
        return res.json({
          code: 1,
          msg: '没有数据返回'
        })
      } else {
        return res.json({
          code: 0,
          data: doc
        })
      }
    })
  } else {
    let page = Number(req.query.page);
    let pageSize = Number(req.query.pagesize);
    let queryResult = Goods.find({}).limit(pageSize).skip((page - 1) * pageSize).sort({
      '_id': -1
    });
    queryResult.exec((err, doc) => {
      if (!doc) {
        return res.json({
          code: 1,
          msg: '没有数据返回'
        })
      } else {
        return res.json({
          code: 0,
          data: doc
        })
      }
    })
  }
})

//获取失物详情信息
Router.get('/getGoodsDetail', (req, res) => {
  Goods.findOne({
    _id: req.query.id
  }, (err, doc) => {
    if (!doc) {
      return res.json({
        code: 1,
        msg: '没有数据返回'
      })
    } else {
      return res.json({
        code: 0,
        data: doc
      })
    }
  })
})

//图片上传
let upload = multer({
  dest: './public/img'
}).any()

Router.post('/uploadImg', upload, (req, res) => {
  return res.json({
    code: 0,
    data: req.files
  })
})

//删除失物
Router.post('/deleteGoods', (req, res) => {
  Goods.remove({
    _id: req.body._id
  }, (err, doc) => {
    if (!doc) {
      return res.json({
        code: 1,
        msg: '删除失败'
      })
    } else {
      return res.json({
        code: 0,
        msg: '删除成功',
        data: doc
      })
    }
  })
})

//批量删除
// {"_id":{"$in":req.query.id}
Router.post('/deleteGoodsAll', (req, res) => {
  Goods.remove({
    _id: {
      "$in": req.body.delArray
    }
  }, (err, doc) => {
    if (!doc) {
      return res.json({
        code: 1,
        msg: '删除失败'
      })
    } else {
      return res.json({
        code: 0,
        msg: '删除成功',
        data: doc
      })
    }
  })
})
//更新失物信息
Router.post('/updateGoods', (req, res) => {
  Goods.update({
    "_id": req.body._id
  }, {
    $set: {
      "_id": req.body._id,
      "date": req.body.date,
      "name": req.body.name,
      "pic": req.body.pic,
      "type": req.body.type,
      "goodsname": req.body.goodsname,
      "feature": req.body.feature,
      "address": req.body.address,
      "phone": req.body.phone,
      "remarks": req.body.remarks,
      "state": req.body.state,
      "receivername": req.body.receivername,
      "receiverphone": req.body.receiverphone
    }
  }, (err, doc) => {
    if (!doc) {
      return res.json({
        code: 1,
        msg: '更新失败'
      })
    } else {
      return res.json({
        code: 0,
        msg: '更新成功',
        data: doc
      })
    }
  })
})

//举报
Router.post('/report', (req, res) => {
  Report.create({
    "id": req.body.id,
    "name": req.body.name,
    "userid": req.body.userid,
    "pic": req.body.pic,
    "goodsname": req.body.goodsname,
    "reason": req.body.reason
  }, (err, doc) => {
    if (!doc) {
      return res.json({
        code: 1,
        msg: '举报失败'
      })
    } else {
      return res.json({
        code: 0,
        msg: '举报成功，等待管理员审核',
        data: doc
      })
    }
  })
})

//获取举报列表
Router.get('/getreportlist', (req, res) => {
  Report.find({}, (err, doc) => {
    if (!doc) {
      return res.json({
        code: 1,
        msg: '数据返回失败'
      })
    } else {
      return res.json({
        code: 0,
        msg: '数据返回成功',
        data: doc
      })
    }
  })
  //获取举报详情
  Router.get('/getreportDetail', (req, res) => {
    Report.find({
      id: req.query.id
    }, (err, doc) => {
      if (!doc) {
        return res.json({
          code: 1,
          msg: '数据返回失败'
        })
      } else {
        return res.json({
          code: 0,
          msg: '数据返回成功',
          data: doc
        })
      }
    })
  })
  //删除举报记录
  Router.post('/deleteReport', (req, res) => {
    Report.remove({
      _id: req.body._id
    }, (err, doc) => {
      if (!doc) {
        return res.json({
          code: 1,
          msg: '删除失败'
        })
      } else {
        return res.json({
          code: 0,
          msg: '删除成功',
          data: doc
        })
      }
    })
  })
})

module.exports = Router;
