$('#confirm').on('click',function(){

    //获得文本输入框中的数据
    var user = $('input[name=user]').val();
    var psd = $('input[name=psd]').val();
    var repsd = $('input[name=repsd]').val();
    var logo = $('input[name=logo]').val();
    var banner = $('input[name=banner]').val();
    //判断是否为空
    if(!user || !psd || !repsd || !logo || !banner){
        alert('输入不能为空');
        return;
    }
    // 判断密码是否一致
    else if(psd !==repsd){
        alert('两次密码不一致');
        return;
    }
    // 发送ajax请求
    var formDom = document.querySelector('form');
    var formData = new FormData(formDom);
    $.ajax({
        url:'/seller/api/register',
        method: 'POST',
        data: formData,
        processData: false,
        contentType: false,
        success: function(data){
            console.log(data);
            if(data.status === 0){
                window.location.href = '/seller/login';
            } else {
                alert(data.message);
            }
        },
        fail: function(){
            console.log(请求失败);
        }
    })


})