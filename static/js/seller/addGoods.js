$('.btn').on('click',function(){
    //获取输入值
    var name = $('input[name="name"]');
    var price = $('input[name="price"]');
    var description = $('textarea[name="description"]');
    var images = $('input[name="images"]');
    var count = $('input[name="count"]');
    //判断是否为空
    if(!name || !price || !description || !images || !count){
        console.log('输入不能为空')
    }
    //发送ajax
    $.ajax({
        url:'/seller/api/add/goods',
        method:'POST',
        //FormData传入一个dom对象而不是jq对象
        data:new FormData(document.querySelector('form')),
        processData:false,
        contentType:false,
        success(data){
            console.log(data);
            if(data.status === 0){
                window.location.href='/seller/goods/list';
            }else{
                alert(data.message);
            }
        },
        fail(){
            console.log('添加失败');
        }
    })
})