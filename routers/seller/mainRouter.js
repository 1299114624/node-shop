const express = require('express');
const Cookies = require('cookies');
const seller = require('../../handleDB/handleSeller');
const goods = require('../../handleDB/handleGoods');


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

    //查询这个商家的商品
    let id = req.sellerId;
    goods.findAllGoodsBySeller(id)
    .then((result)=>{
        // console.log(result);
        //渲染页面
        res.render('seller/goodsList',{
            activeIndex:0,
            goodsList: result
        });
    })
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
    //查询原来的商品
    let goodsid = req.query.goodsid;
    res.render('seller/addGoods',{goodsid});
})

//删除商品
router.get('/delete/goods',(req,res)=>{
    //查询商品id
    let goodsid = req.query.goodsid;
    //操作数据库,删除商品
    goods.deleteGoodsByid(goodsid)
    .then(()=>{
        res.redirect('/seller/goods/list');
    })
})

//退出
router.get('/logout',(req,res)=>{
    let cookies = new Cookies(req,res);
    cookies.set('SELLERID',null);
    res.redirect('/seller/login');
})




module.exports = router;