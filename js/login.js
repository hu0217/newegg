window.onload = function(){
    function $(id){
        return document.getElementById(id);
    }
    $("login_go").onclick = function () {
        //ajax
        var xhr = new XMLHttpRequest();
        xhr.open("post", "http://localhost/newegg/login.php", true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        var str = "username="+$("uesername").value   + "&pwd="+$("mima").value;
        xhr.send(str);
        xhr.onreadystatechange = function () {
            if (xhr.readyState==4 && xhr.status==200) {
                console.log(xhr.responseText);
                //json解析
                //如果登录成功直接进入首页
                //如果失败则弹出提示信息
                if(JSON.parse(xhr.responseText).status){
                    location.href = "index.html";
                }else{
                    alert("用户名或者密码错误");
                }

            }
        }
    }
}
