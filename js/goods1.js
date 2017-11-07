

$(function(){
	
	//电脑平板部分
	//全局变量， 用来保存获取到json中的所有商品数据
	var arr = [];

	//先获取数据并创建节点，显示数据
	$.get("json/goods1.json", function(data){
		console.log(data.length);
		arr = data;
		
		
		//遍历json中的所有商品数据，并用节点显示
		for (var i=0; i<arr.length; i++) {
			var obj = arr[i];
			var li = $("<li></li>").appendTo("#adlistshow");
			var pImg = $("<p class='img'></p>");
			pImg.appendTo(li);
			pImg.html("<a href='#' target='_blank'><img src="+obj.img1+"></a>");
			var pTitle = $("<p class='title'></p>");
			pTitle.appendTo(li);
			pTitle.html("<a href='#' style='color:#666;' target='_blank'>"+obj.title+"</a>");
			var pPrice = $("<p class='price'></p>");
			pPrice.appendTo(li);
			pPrice.html("<span class='price-in'>"+obj.unit+obj.price+"</span>");
			
		}
		
	})
	
	//点击商品
	$("#adlistshow").on("click", "li", function(){
		
		var index = $(this).index(); 
		var obj = arr[index];
		
		
		//进入详情页， 且将当前点击的商品的id传入
		location.href = "goods.html?id=" + obj.id;
		
	})
				

	//首页购物车部分
	//获取购物车的cookie数据,并用节点显示
	refresh();
	function refresh() {
		
		var arr = $.cookie("cart");
		if (arr) {
			arr = JSON.parse(arr);
			
			//先清除旧节点
			$("#route").empty();
			
			//再添加新节点
			var allPrice = 0; //总价
			var allnum = 0;
			
			//遍历数组
			for (var i=0; i<arr.length; i++) {
				var obj = arr[i];
				
				//创建li节点
				var li = $("<li></li>").appendTo("#route");
				var pImg = $("<p class='img'></p>");
				pImg.appendTo(li);
				pImg.html("<a href='javascript:;'><img src="+obj.img1+"></a>");
				var pTitle = $("<p class='title'>"+obj.title+"</p>");
				pTitle.appendTo(li);
				var pPrice = $("<p class='price'></p>");
				pPrice.appendTo(li);
				pPrice.html("<span class='price-in'>"+obj.unit+obj.price+"</span><span class='num'>*"+obj.num+"</span>");
				$("<div class='icon'></div>").appendTo(li);
				
				
				//计算总价
				allPrice += obj.price * obj.num;
				//计算总数
				allnum += obj.num;
			}	
			
			//显示总价
			$(".cartlist-t em").html(allPrice);
			//显示总数
			$("#allnum").html(allnum);
			
			
			 if($("#route li").length > 0) {
				$(".cartlist").show();
				$(".cart .tip-iner").hide();
			}else{
				$(".cartlist").hide();
				$(".cart .tip-iner").show();
			}
		
			
		}
		
	}
	
	//鼠标移动过程
	$("#route").on("mouseenter", "li",function(){
		$(this).css("background","#ccc").siblings().css("background","#fff");
		
	})
	$("#route").on("mouseleave", "li",function(){
		$(this).css("background","#fff");
		
	})
	//删除
	$("#route").on("click", ".icon", function(){
		var index = $(this).index("#route .icon");
		
		//获取cookie并修改
		var arr = JSON.parse($.cookie("cart"));
		arr.splice(index, 1); //删除数组arr的第index个
		
		//覆盖原来的cookie
		$.cookie("cart", JSON.stringify(arr), {expires:30, path:"/"});
	
		
		//刷新节点数据
		refresh();
	})
	
	
})
