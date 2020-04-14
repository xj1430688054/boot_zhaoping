<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring" %>
<%@ taglib uri="http://www.springframework.org/tags/form" prefix="form" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:set var="contextPath" value="<%=request.getContextPath()%>"></c:set>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8" />
		<title>华仁通电力科技有限公司招聘筛选</title>	
		<link rel="stylesheet" href="${contextPath}/static/css/login.css" />
		<link rel="stylesheet" href="${contextPath}/static/css/bootstrap.css">
		<script type="text/javascript" src="${contextPath}/static/js/jquery-1.11.3.js" ></script>
		<script type="text/javascript" src="${contextPath}/static/js/bootstrap.min.js" ></script>
	    <script type="text/javascript" src="${contextPath}/static/js/jquery.validate.js"></script>
		<script type="text/javascript" src="${contextPath}/static/js/localization/messages_zh.js"></script>
		<script type="text/javascript" src="${contextPath}/static/js/sweetAlert.js"></script>
		<script type="text/javascript" src="${contextPath}/static/js/main.js"></script>
	</head>
	<body>
		
		<!--头部导航条-->
		<nav class="navbar navbar-default">
		  
        </nav>
		<div id="login">
			<p>登录</p>
		</div>
		<div id="container">
		  <!-- Nav tabs -->
		  <ul class="nav nav-tabs" role="tablist">
		    <li role="presentation" class="active"><a href="#home" aria-controls="home" role="tab" data-toggle="tab">登录</a></li>
		    <li role="presentation"><a href="#profile" aria-controls="profile" role="tab" data-toggle="tab">验证密保</a></li>
		    <li role="presentation"><a href="#messages" aria-controls="messages" role="tab" data-toggle="tab">重置密码</a></li>
		  </ul>
		
		  <!-- Tab panes -->
		  <div class="tab-content">
		    <div role="tabpanel" class="tab-pane active" id="home">
		    	<form method="post" action="/loginCheck">
					<div class="form-group">
					    <label for="username">用户名：</label>
					    <input type="text" class="form-control"  name="username" placeholder="输入你的帐号" required="required">
					</div>
					<div class="form-group">
				        <label for="exampleInputPassword1">密码：</label>
					    <input type="password" class="form-control" name="password"  placeholder="输入密码" required="required">
					</div>

					<c:if test="${flag eq'failed'}">
						<p style="color: red"><c:out value="用户名或密码错误"></c:out></p>
					</c:if>

					<div class="row">
						<div class="col-xs-6 pull_left">
							<div class="form-group">
								<input class="form-control" type="tel" id="verify_input" name="verifyInput" placeholder="请输入验证码"
									   maxlength="4">
							</div>
						</div>
						<div class="col-xs-6 pull_left">
							<a href="javascript:void(0);" title="点击更换验证码">
								<img id="imgVerify" src="login/getVerify" alt="更换验证码" height="36" width="140"
									 onclick="getVerify(this);">
							</a>
						</div>
					</div>
					<c:if test="${verifyCode eq'false'}">
						<p style="color: red"><c:out value="验证码错误"></c:out></p>
						<script>
                            getVerify();
						</script>
					</c:if>
					<div class="checkbox">
					    <label>
					      <input type="checkbox" name="rememberMe"> 记住我
					    </label>
					  </div>
					<button type="submit" class="btn btn-primary"  style="width: 170px;">登录</button>
				</form>

		    </div>
		    <div role="tabpanel" class="tab-pane" id="profile">
		    	<p>请输入帐号和回答两个密保问题：</p>
		    	<form id="profile1">
		    		<div class="form-group">
					    <label for="username">请输入你的帐号：</label>
					    <input type="text" class="form-control" id="username" name="username" placeholder="张三" required="required">
					</div>
					<div class="form-group">
					    <label for="answer1">你的母亲的名字是?</label>
					    <input type="text" class="form-control" id="answer1"  placeholder="张三" required="required">
					</div>
					<div class="form-group">
				        <label for="exampleInputPassword1">你的电话号码是?</label>
					    <input type="text" class="form-control" id="answer2" placeholder="1234567" required="required">
					</div>

					<input type="submit" class="btn btn-primary" value="提交" style="width: 170px;"/>
				</form>
		    </div>
		    <div role="tabpanel" class="tab-pane" id="messages">
		    	<form id="messages1">
					<div class="form-group">
					    <label for="password1">新密码</label>
					    <input type="password" class="form-control" id="password1" name="password1" placeholder="输入你的密码" required="required">
					</div>
					<div class="form-group">
				        <label for="Password2">再输入一次密码：</label>
					    <input type="password" class="form-control" id="password2"  name="password2" placeholder="再输入一次密码" required="required">
					</div>
					<button type="submit" class="btn btn-primary" style="width: 170px;">提交</button>
				</form>
		   </div>
		  </div>

		</div>
		
		<!--注册用户-->
		<div id="register">
		    <label>欢迎注册本公司网站</label>
		    <p>您可以免费注册一个帐号，以获取更多的便利</p>
		    <a href="/register" class="btn btn-success">注册</a>
		</div>
		
	   <%-- <footer>
	    	<div id="desc">
       		  <p style="padding-left: 600px;">版权所有@EdenJia</p>
            </div>
	    </footer>--%>

		<script type="text/javascript">
			$('#myTabs a').click(function (e) {
			  e.preventDefault();
			  $(this).tab('show')
			})
            function getVerify() {
                $("#imgVerify").attr("src", 'login/getVerify?' + Math.random());//jquery方式
            }

            function aVerify(){
                var value =$("#verify_input").val();
                // alert(value);
                $.ajax({
                    async: false,
                    type: 'post',
                    url: 'login/checkVerify',
                    dataType: "json",
                    data: {
                        verifyInput: value
                    },
                    success: function (result) {
                        if (result) {
                            alert("success!");
                        } else {
                            alert("failed!");
                        }
                        getVerify();
                    }
                });
            }
		</script>
	</body>
</html>
