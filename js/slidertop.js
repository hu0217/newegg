$(function(){

	//先获取轮播图的数据
	$.get("json/topslider.json", function(data){
	console.log(data)
		var arr = data;

		for (var i=0; i<arr.length; i++) {
			var obj = arr[i];

			$("<li><img src="+ obj.img +" ></li>").appendTo("#topslider_top");
			var li = $("<li>"+ (i+1) +"</li>").appendTo("#topslider_bt");

			if (i==0) {
				li.addClass("active");
			}
		}

		//轮播
		sliderInout();
	})

	//jq轮播图
	function sliderInout(){

		var list1 = $("#topslider_top");
		var list2 = $("#topslider_bt");
		var li1 = $("#topslider_top li");
		var li2 = $("#topslider_bt li");

		//复制第一张图到最后
		li1.eq(0).show().siblings().hide();

		//
		var size = $("#topslider_top li").size();
		console.log(size);

		//开启定时器
		var i = 0;
		var timer = setInterval(function(){
			i++;
			move();
		}, 2000);

		function move(){

			if (i == size){
				i = 0;
			}

			li1.eq(i).stop().fadeIn().siblings().stop().fadeOut();

			li2.eq(i).removeClass().addClass("active").siblings().removeClass("active");

		}
		li2.mouseenter(function(){
			var index = $(this).index();
			i = index;
			move();
		})

		$("#topslider").hover(function(){
			clearInterval(timer);
		},
		function(){
			timer = setInterval(function(){
				i++;
				move();
			}, 2000);
		})
	}


	//固定栏
 	$(window).scroll(function(){
 		$("#to_top").css("display","block");
 		$("#to_top").click(function(){
 			$("html,body").stop(true).animate({scrollTop: 0});
 			$(this).css("display","none");
 		})
 	})

	
	
	

})