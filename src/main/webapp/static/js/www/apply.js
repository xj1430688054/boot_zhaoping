$(function () {
    $(document).on('click',"li.positionList>span.PName",function(){
        var a = $(this).text();
        var flag = $(this).prev().text();
        console.log("flag:"+flag + " "+flag.constructor);
        if (flag == 1){
            location.href="/position/getDetail?pName="+a;
        }else {
            location.href="/school/getDetail?pName="+a;
        }
    })
})