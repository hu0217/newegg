window.onload = function(){
	function $(id){
		return document.getElementById(id);
	}
	var flag1 = false;//手机号
	var flag2 = false;//验证码
	var flag3 = false;//密码
	var flag4 = false;//确认密码

	//手机号
	$("telphone").onkeyup = function(){
		var value = this.value;
		var reg = /^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[05-9]))\d{8}$/;
		if (reg.test(value)){
			$("phone_tip").innerHTML = "手机号合法";

			flag1 = true;
		}
		else {
			 if(value.length<11){
				$("phone_tip").innerHTML = "手机号长度至少11位!";
			}else if(value.length >11){
				$("phone_tip").innerHTML = "手机号长度超过11位!";
			}
			
			flag1 = false;
		}
	}

	//验证码
//	$("pic").onkeyup = function(){
//		//var value = this.value;
//		fn();
//	}
//	//变换验证码按钮
//	$("change_code").onclick = function(){
//		//验证码的值
//		var str = "";
//		for (var i=0; i<4; i++){
//			str += parseInt(Math.random()*10);
//		}
//		$("pic_code").innerHTML = str;
//
//		fn();
//	}
//	function fn(){
//		if ($("pic").value == $("pic_code").innerHTML){
//			$("pic_tip").innerHTML = "验证码合法";
//			flag2 = true;
//		}
//		else {
//			$("pic_tip").innerHTML = "验证码不合法";
//			flag2 = false;
//		}
//	}
	$("change_code").onclick = function(){
		verifyCode.refresh();
	}
    
	var verifyCode = new GVerify("v_container");
	$("pic").onblur = function(){
		var res = verifyCode.validate($("pic").value);
		if(res){
			$("pic_tip").innerHTML = "验证码合法";
			flag2 = true;
		}else{
			$("pic_tip").innerHTML = "验证码不合法";
			flag2 = false;
		}
	}
	
	
	
	$("next").onclick = function(){
		if(flag1&&flag2){
			$("step_2").style.display = "block";
			$("step1").style.display = "none";
		}
	}


	//密码
	$("password").onkeyup = function(){
		var value = this.value;
		var reg = /^.{6,20}$/;
		if (reg.test(value)){
			flag3 = true;
			if (value.length <= 10){ //低
				$("passward_tip").innerHTML = "密码强度低";
			}
			else if (value.length <= 15) { //中
				$("passward_tip").innerHTML = "密码强度中";
			}
			else { //高
				$("passward_tip").innerHTML = "密码强度高";
			}
		}
		else {
			$("passward_tip").innerHTML = "密码不合法";
			flag3 = false;
		}
	}

	//确认密码
	$("makesure").onkeyup = function(){
		var value = this.value;

		if (value == $("password").value){
			$("passwardrepeat_tip").innerHTML = "重复密码一致";
			flag4 = true;
		}
		else {
			$("passwardrepeat_tip").innerHTML = "重复密码不 一致";
			flag4 = false;
		}
	}

	//注册按钮点击
	$("zhuce").onclick = function(){
		if($("read").checked){
			if(flag3&&flag4){
				$("step_2").style.display = "none";
				$("step_3").style.display = "block";
			}
		}

		//ajax
		var xhr = new XMLHttpRequest();
		xhr.open("post", "http://localhost/newegg/register.php", true);
		xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		var str = "username="+$("telphone").value  + "&pwd="+$("password").value;
		console.log(str);
		xhr.send(str);
		xhr.onreadystatechange = function () {
			if (xhr.readyState==4 && xhr.status==200) {
				console.log(JSON.parse(xhr.responseText).msg);
				//json解析
				//如果注册成功则进入登录页面
				//如果失败则弹出提示信息
			}
		}

	}

}
