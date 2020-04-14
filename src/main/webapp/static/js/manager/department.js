$(function () {
    //新增
    $(document).on('click','#addSave',function () {
        var addPName = $('#addPName').val();
        $.ajax({
            type:'post',
            url:'/department/add',
            data:{
                name:addPName
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


    //数据回填
    var id = null;
    $(document).on('click',".updateModel",function () {
        id = $(this).parent('span').prev().text();
        $.ajax({
            type:'get',
            url:'/department/getById/'+id,
            dataType:'json',
            success:function (data) {
                if (data.status== 1){
                    var department = data.data;
                    $('#updatePName').val(department.name);
                    $('#update').modal('show');
                }else {
                    swal(data.msg,"","error");
                }
            },
            error:function () {
                swal("出现错误","","error");
            }
        })
    })

    //更新
    $(document).on("click",'#updateSave',function () {
        var updatePName = $('#updatePName').val();
        $.ajax({
            type:'post',
            url:'/department/update',
            data:{
                id:id,
                name:updatePName
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

    //部门搜索，根据部门名称搜索
   $(document).on('click','.positionQuery',function () {
       var  pName = $('#exampleInputName2').val();
       $.ajax({
           type:'get',
           url:'/department/manager/findByPage',
           data:{
               condition:pName
           },
           dataType:'json',
           success:function (data) {
               if (data.status == 1) {
                   var str = "";
                   var department = data.data;
                   for (var i = 0; i < department.list.length; i++) {
                       console.log(department.list[i]);
                       str += "<li>\n" +
                           "<span>" + (1 + i) + "</span>\n" +
                           "<span>" + department.list[i].name + "</span>\n" +
                           "<span>" + department.list[i].createTime + "</span>\n" +
                           "<span style='display: none;'>"+department.list[i].id+"</span>"+
                           "<span>\n" +
                           " <button href=\"#\" class=\"btn btn-primary updateModel\">修改</button>\n" +
                           "<a href=\"javaScript:void(0);\" class=\"btn btn-danger deleteBtn\">删除</a>\n" +
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
    //删除
   $(document).on('click','.deleteBtn',function () {
       var id = $(this).parent('span').prev().text();
       swal({
           title: '确定删除此部门么?',
           type: 'info',
           showCancelButton: true,
           confirmButtonText: '确定!',
           cancelButtonText: '取消'
       }).then(function(result) {
           if (result.value) {
               $.ajax({
                   type:'delete',
                   url:'/department/delete/'+id,
                   dataType:'json',
                   success:function (data) {
                       if (data.status == 1){
                           swal({
                               title: data.msg,
                               confirmButtonText:"确定",
                           }).then(function(result){
                               window.location.reload();
                           });
                       }
                       else{
                           swal(data.msg,"","error");
                       }
                   },
                   error:function () {
                       swal("出现错误");
                   }
               })
           }
       })

   })

})