$(function () {
    var totalPage = $('span#totalPage').text();
    var a = parseInt(totalPage);
    var condition = $('#exampleInputName2').val();
    if(a > 0) {
        $('#pagination-demo').twbsPagination({
            totalPages: a,
            visiblePages: 3,
            first: '第一页',
            prev: "<<",
            next: '>>',
            last: '最后一页',
            onPageClick: function (event, page) {
                event.preventDefault();
                $.ajax({
                    type: 'get',
                    url: '/apply/manager/findByPage',
                    data: {
                        pageIndex: page,
                        condition: condition
                    },
                    dataType: 'json',
                    success: function (data) {
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
                    error: function () {
                        swal('出现错误', "", "error");
                    }
                });
            }
        });
    }
})