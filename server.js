const express = require('express');
const mongoose = require('mongoose');
const ejs = require('ejs');

const buyerMainRouter = require('./routers/buyer/mainRouter');
const buyerApiRouter = require('./routers/buyer/apiRouter');

const sellerMainRouter = require('./routers/seller/mainRouter');
const sellerApiRouter = require('./routers/seller/apiRouter');

//创建服务器
const server = express();

//处理静态资源
server.use('/public',express.static('./static'))
server.use('/static',express.static('./static'))

//处理ajax
server.use('/api',buyerApiRouter);
server.use('/seller/api',sellerApiRouter);

//配置模板引擎
server.set('view engine','html');
server.engine('html',ejs.__express);

//处理页面
server.use('/seller',sellerMainRouter);
server.use('/',buyerMainRouter);


new Promise((resolve,reject)=>{
    mongoose.connect('mongodb://localhost:27017',{useNewUrlParser:true, dbName: 'test'},(error)=>{
        if(error){
            console.log('数据库连接失败')
        }else{
            console.log('数据库连接成功');
            resolve();
        }
    })
})

.then(()=>{
    server.listen(8080,(error)=>{
        if(error){
            console.log('服务器启动失败')
        }else{
            console.log('服务器启动成功')
        }
    })
})
