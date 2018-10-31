const express = require('express');
const Cookies = require('cookies');
const seller = require('../../handleDB/handleSeller');

//创建路由对象
const router = new express.Router();


router.get('/register',(req,res)=>{
    res.render('seller/register');
})

router.get('/login',(req,res)=>{
    res.render('seller/login');
})

//除登录注册外的页面均要验证商家是否登录了
router.use((req,res,next)=>{
    //取得cookies,获得商家id
    let cookies = new Cookies(req,res);
    let id = cookies.get('SELLERID');

    if(id){
        //判断这个id是否有效
        seller.findSellerById(id)
        .then(()=>{
            //id有效,保存cookies的id在req中,提供给下一步使用
            req.sellerId = id;
            next();
        })
        .catch(()=>{
            res.redirect('/seller/login');
        })
    }else{
        //没有id,无法登陆
        res.redirect('/seller/login');
    }

})



//商品管理
router.get('/goods/list',(req,res)=>{
    res.render('seller/goodsList',{
        activeIndex:0
    });
})

//订单列表
router.get('/order',(req,res)=>{
    res.render('seller/order',{
        activeIndex:1
    });
})

//商家中心
router.get('/info',(req,res)=>{
    res.render('seller/info',{
        activeIndex:2
    });
})

//新增商品
router.get('/add/goods',(req,res)=>{
    res.render('seller/addGoods');
})

//修改商品
router.get('/modify/goods',(req,res)=>{
    res.render('seller/modifyGoods');
})

module.exports = router;