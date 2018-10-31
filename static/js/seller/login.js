$('#confirm').on('click',function(){
    //获取用户输入的内容
    var username = $('input[type=text]').val();
    var password = $('input[type=password]').val();

    //判断是否为空
    if(!username || !password){
        alert('输入不能为空');
        return
    }

    //发送ajax请求
    $.ajax({
        url:'/seller/api/login',
        method:'POST',
        data:{
            username,
            password
        },
        success:function(data){
            console.log(data);
            if(data.status===0){
                window.location.href = '/seller/goods/list';
            }else{
                alert(data.message)
            }
        },
        fail:function(){
            console.log('请求失败')
        }
    })
})