$(function () {
    var totalPage = $('span#totalPage').text();
    var a = parseInt(totalPage);
    $('#pagination-demo').twbsPagination({
        totalPages: a,
        visiblePages: 3,
        first:null,
        prev:"<<",
        next:'>>',
        last:'最后一页',
        onPageClick: function (event, page) {
            event.preventDefault();
            $('#page-content').text('Page ' + page);
            $.ajax({
                type:'get',
                url:'/position/user/apply/findByPage',
                data:{
                    pageIndex:page
                },
                dataType:'json',
                success:function(data){
                    var liStr = "";
                    if(data.status == 1){
                        var positions = data.data;
                        for(var i=0;i<positions.list.length;i++){
                            console.log(positions.list[i]);

                            liStr += "\n" +
                                "<li class=\"positionList\">\n" +
                                " <span style=\"display:none;\">"+positions.list[i].applyId+"</span>\n" +
                                "<span style=\"display:none;\">"+positions.list[i].flag+"</span>\n" +
                                "<span class=\"PName\">"+positions.list[i].positionName+"</span>\n" +
                                "<span>"+positions.list[i].stateTrans+"</span>\n" +
                                "</li>"
                        }
                        $('#ulPosition').html(liStr);
                    }else {
                        console.data(data.msg);
                    }
                },
                error:function(){
                    swal("查询失败");
                }
            });
        }
    });
})