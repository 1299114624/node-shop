const express = require('express');
const multiparty = require('multiparty');
const bodyParser = require('body-parser');
const seller = require('../../handleDB/handleSeller');
const Cookies = require('cookies');

//创建路由对象
const router = new express.Router();

router.use(bodyParser.urlencoded({extended: false}));

//注册请求处理
router.post('/register',(req,res)=>{
    //获得请求的参数
    let form = new multiparty.Form({
        uploadDir: 'static/images'
    });
    form.parse(req,(error,fields,files)=>{
        let user = fields.user.length>0 ? fields.user[0] : '';
        let psd = fields.psd.length>0 ? fields.psd[0] : '';
        let repsd = fields.repsd.length>0 ? fields.repsd[0] : '';

        let logoPath = files.logo.length>0 ? ('/'+files.logo[0].path) : '';
        let bannerPath = files.banner.length>0 ? ('/'+files.banner[0].path) : '';

        console.log(user,psd,repsd,logoPath,bannerPath)
        if(!user || !psd || !repsd || !logoPath || !bannerPath){
            res.json({
                status:1,
                message: '输入不能为空'
            })
            return;
        }else if(psd !== repsd){
            res.json({
                status:2,
                message: '两次输入密码不一致'
            })
            return;
        }

        // 查询数据库中是否存在这个商家
        seller.canRegister(user)
        .then(()=>{
            //不存在,注册
            seller.saveSellerInfo({
                sellername: user,
                password: psd,
                logo: logoPath,
                banner: bannerPath
            })
            .then(()=>{
                res.json({
                    status:0,
                    message:'注册成功'
                })
            })
            .catch(()=>{
                res.json({
                    status:3,
                    message:'数据库错误,注册失败'
                })
            })
        })
        .catch(()=>{
            res.json({
                status:4,
                message:'该商家已存在'
            })
        })
    })
})

//登陆请求处理
router.post('/login',(req,res)=>{
    //取得请求参数
    let {username,password} = req.body;
    //判断
    if(!username || !password){
        res.json({
            status:1,
            message:'输入不能为空'
        })
        return
    }
    //查询数据库,这个商家是否存在,密码是否正确
    seller.canLogin(username,password)
    .then(result=>{
        //保存登陆状态,cookies要传入login请求的req和res
        let cookies = new Cookies(req,res);
        cookies.set('SELLERID',result._id);

        res.json({
            status:0,
            message:'登陆成功'
        })
    })
    .catch(()=>{
        res.json({
            status:2,
            message:'登陆失败,用户名或密码错误'
        })
    })



})



module.exports = router;