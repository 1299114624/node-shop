const Seller = require('../models/Seller');

//判断商家是否存在,是否可以注册
module.exports.canRegister = function(user){
    //数据库查询是异步的,必须查到结果之后才进行then或者catch的操作,所以要用promise
    return new Promise((resolve,reject)=>{
        Seller.findOne({sellername:user}).then(result=>{
            if(result){
                //存在商家,不可以注册
                reject();
            }else{
                //不存在,可以注册
                resolve()
            }
        })
    })
}

//保存商家信息,注册
module.exports.saveSellerInfo = function(info){
    
    return new Promise((resolve,reject)=>{
        let sellerInfo = new Seller(info);
        sellerInfo.save().then((result)=>{
            if(result){
                resolve(); //注册成功
            }else{
                reject(); //注册失败
            }
        })
    })
}

//查询商家是否存在,能否登陆
module.exports.canLogin = function(name,psd){
    return new Promise((resolve,reject)=>{
        Seller.findOne({sellername:name,password:psd}).then((result)=>{
            if(result){
                resolve(result);
            }else{
                reject();
            }
        })
    })
}

//查询cookies找到的id是否有效
module.exports.findSellerById = function(id){
    return new Promise((resolve,reject)=>{
        Seller.findById(id).then(result=>{
            if(result){
                // id有效
                resolve()
            }else{
                reject()
            }
        })
    })
}