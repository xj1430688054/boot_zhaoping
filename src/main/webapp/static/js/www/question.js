$(function () {

    $(document).on('change','input[name="type"]',function(){
        var type = $(this).val();
        $.ajax({
            type:'post',
            url:'/question/getByType',
            data:{
                type:type,
            },
            dataType:'json',
            success:function (data) {
                var str = "";
                if (data.status == 1){
                   var questions = data.data;
                   for (var i = 0;i<questions.length;i++){
                       str+="<span class=\"number\">"+(i+1)+"</span>、"+questions[i].qName+"<br>";
                       for (var j = 0;j<questions[i].qChose.length;j++){
                           str+="<input type='radio' name=radio_"+(i+1)+" value="+(j+1)+">"+questions[i].qChose[j]+"<br>";
                       }
                   }
                    str+="<hr/>\n" +
                        "\t\t\t<button type=\"button\" class=\"btn btn-primary\" id=\"btnSubmit\" value=\"考试完成\">考试完成</button>"
                   $('#question').html(str);
                }else{
                    swal(data.msg);
                }
            },
            error:function () {
                swal('出现错误');
            }
        })
    });

    $(document).on('click','#btnSubmit',function () {
        var type = $('input[name="type"]:checked').val();
        var a = $('#question>span.number:last').text();
        var b = parseInt(a); //字符串的转换
        var list = new Array();
        for (var i = 1;i<= b;i++) {
            if($("input[name=radio_"+i+"]:checked").val()!=null){
               list.push({"i":i,"ans":$("input[name=radio_"+i+"]:checked").val()});
            }
        }
        $.ajax({
            type:'post',
            url:'/question/submit',
            data: {
                map:JSON.stringify(list),
                classify:type
            },
            dataType:'json',
            //contentType : 'application/json;charset=utf-8',
            success:function (data) {
                if (data.status == 1){
                    swal("提交成功");
                }else {
                    swal(data.msg,"","error");
                }
                //setTimeout("location.reload(true)",2000);
            },
            error:function () {
                swal("出现错误","","error");
            }
        });

    })
    initQuestType();
})


function initQuestType(){
    $.ajax({
        type:'get',
        url:'/questType/manager/findByPage',
        dataType:'json',
        success:function (data) {
            if (data.status == 1) {
                var str = "";
                var questType = data.data;
                var template = '';
                for (var i = 0; i < questType.list.length; i++) {
                    if(i ==0){
                        template  = '<input type="radio" checked="checked" name="type" value="'+ questType.list[i].name+'">'+questType.list[i].name;
                    }else{
                        template = '<input type="radio" name="type" value="'+ questType.list[i].name+'">'+questType.list[i].name;
                    }
                    str = str + template;
                }
                var trNode = $('#title');
                trNode.append(str);
            } else {
                swal(data.msg, "", "error");
            }
        },
        error:function () {
            swal('出现错误',"","error");
        }
    });

    $('.timer').startTimer({
    	  onComplete: function(element){
    		  swal("时间到");
    		  $("#btnSubmit").click();
              $("#btnSubmit").hide();
    	  }
    	})
    
}