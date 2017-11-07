
window.onload=function(){
	function $(id){
		return document.getElementById(id);
	}
	//二级导航
	var drop = $("list").getElementsByTagName("li");
	for(var i = 0 ; i < drop.length; i ++){
		drop[i].index = i ;
		drop[i].onmouseover = function(){
			for(var j = 0; j < drop.length; j ++){
				drop[j].style.background = "#ccc";
			}
			
			//console.log(drop.length);
			this.style.background = "#fff";
			/*if(this.index == drop.length -1){
				drop[this.index].style.background = "#ccc";
			}*/
		}
		drop[i].onmouseout = function(){
			for(var j = 0; j < drop.length ; j ++){
				drop[j].style.background = "#fff";
			}
			this.style.background = "#fff";
		}
	}



	//倒计时
	var timer1=null;
	timer1 = setInterval(function(){
		var time1 = new Date();
		var time2= new Date("2017/10/28");
		var i = Number(time2.getTime()-time1.getTime());
		var hour = parseInt(i/(1000*60*60));
		var min = parseInt(i/(1000*60))%60;
		var sec = parseInt(i/1000)%60;


		hour = hour<10? "0"+hour : hour;
		min = min<10? "0"+min : min;
		sec = sec<10? "0"+sec : sec;
		var aSpan = $("timeleft").children;
		aSpan[0].innerHTML = hour;
		aSpan[1].innerHTML = min;
		aSpan[2].innerHTML = sec;
		if(hour==0&&min==0&sec==0){
			clearInterval(timer1);
		}

	},1000)

	//热卖区右侧淡入淡出轮播
	var slider_top=$("slider_top").children[0].children;
	slider_top[0].style.opacity = 1;
	slider_top[0].style.filter = "alpha(opacity=100)";
	var size = slider_top.length;
	var timer = null;
	var index = 0;
	timer = setInterval(function(){
		index++;
		move();
	},3000)
	function move(){
		if (index >= size) {
			index = 0;
		}
		if (index < 0){
			index = size-1;
		}
		for (var i=0; i<slider_top.length; i++) {
			if (i == index) {
				animate(slider_top[index], {opacity:100});
			}
			else {
				animate(slider_top[i], {opacity:0});
			}
		}
	}
	$("slider_top").onmouseover = function(){
		clearInterval(timer);
	}
	$("slider_top").onmouseout = function(){
		timer = setInterval(function(){
			clearInterval(timer);
			index++;
			move();
		}, 3000);
	}

	//热销榜tab栏切换
	function hot_tab(obj) {
		var box = document.getElementById(obj);
		var aA = box.children[0].children;
		var tab_in = box.getElementsByClassName("tab-iner");
		for(var i = 0; i < aA.length; i++) {
			aA[i].index = i;
			aA[i].onmouseover = function(){
				for(var j = 0; j < aA.length; j++) {
					tab_in[j].className = "tab-iner hide";
					aA[j].className = "";
				}
				tab_in[this.index].className = "tab-iner show";
				aA[this.index].className = "current";
			}
		}
	}
	hot_tab("tab_out1")
	hot_tab("tab_out2")
	hot_tab("taber")
	hot_tab("tab_out3")
	hot_tab("tab_out4")
	hot_tab("tab_out5")

	//热卖区换一批
	$("hot_sale").onclick = function(){
		var tabc_iner = $("tabc_in").children;
		//$("tabc_in").appendChild(tabc_iner[0].cloneNode(true));
		var size = tabc_iner.length;
		var divW = tabc_iner[0].offsetWidth;
		$("tabc_in").style.width = size*divW + "px";
		index++;
		if (index >= size){
			$("tabc_in").style.left = 0;
			index = 0;
		}
		animate($("tabc_in"), {left:-index*divW});
	}



}

