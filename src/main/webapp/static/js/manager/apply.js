$(function () {

    //数据回填
    var id = null;
    $(document).on('click',".updateModel",function () {
        id = $(this).parent('span').prev().text();
        $('#applyId').val(id);
        var select = $(this).parent('span').prev().prev().text();
        $('#projectPorperty').val(select);
        $('#update').modal('show');
    })

    //更新
    $(document).on("click",'#updateSave',function () {
        debugger
        var applyId = $('#applyId').val();
        var select = $('#projectPorperty').val();
        $.ajax({
            type:'put',
            url:'/apply/update/state/'+applyId,
            data:{
                //待处理为动态值
                state: select
            },
            dataType:'json',
            success:function (data) {
                if (data.status == 1){
                    swal({
                        title: data.msg,
                        confirmButtonText:"确定",
                    }).then(function(result){
                        window.location.reload();
                    });
                }else{
                    swal(data.msg,"","error");
                }
            },
            error:function () {
                swal("出现错误","","error");
            }
        });
    })

    //职位搜索，根据职位名称搜索
   $(document).on('click','.positionQuery',function () {
       var  pName = $('#exampleInputName2').val();
       $.ajax({
           type:'get',
           url:'/apply/manager/findByPage',
           data:{
               condition:pName
           },
           dataType:'json',
           success:function (data) {
               if (data.status == 1) {
                   var str = "";
                   var apply = data.data;
                   for (var i = 0; i < apply.list.length; i++) {
                       console.log(apply.list[i]);
                       str += "<li>\n" +
                           "<span>" + (1 + i) + "</span>\n" +
                           "<span>" + apply.list[i].positionName + "</span>\n" +
                           "<span>" + apply.list[i].userName + "</span>\n" +
                           "<span>"+apply.list[i].applyTime+"</span>"+
                           "<span>"+apply.list[i].stateTrans+"</span>"+
                           "<span style='display: none'>" + apply.list[i].state + "</span>\n" +
                           "<span style='display: none'>" + apply.list[i].applyId + "</span>\n" +
                           "<span>\n" +
                           " <button href=\"#\" class=\"btn btn-primary updateModel\">修改状态</button>\n" +
                           " </span>\n" +
                           "</li>";
                   }
                   var trNode = $('#ulContainer');
                   trNode.html(str);
               } else {
                   swal(data.msg, "", "error");
               }
           },
           error:function () {
               swal('出现错误',"","error");
           }
       });
   })

})