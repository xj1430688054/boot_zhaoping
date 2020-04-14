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
                    url: '/job/manager/findByPage',
                    data: {
                        pageIndex: page,
                        condition: condition
                    },
                    dataType: 'json',
                    success: function (data) {
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
                    error: function () {
                        swal('出现错误', "", "error");
                    }
                });
            }
        });
    }
})