$(function(){
	//获取购物车的cookie数据,并用节点显示
	refresh();
	function refresh() {
		
		var arr = $.cookie("cart");
		if (arr) {
			arr = JSON.parse(arr);
			
			//先清除旧节点
			$(".cartprice").empty();
			
			//再添加新节点
			var totalPrice = 0; //总价
			var allPrice = 0;
			
			//遍历数组
			for (var i=0; i<arr.length; i++) {
				var obj = arr[i];
				
				//创建li节点
				var li = $("<li></li>").appendTo(".cartprice");
				
				//是否选中
				if (obj.checked) {
					$("<div class='choose'><input type='checkbox' class='check' checked='checked'/></div>").appendTo(li);
				}
				else {
					$("<div class='choose'><input  class='check' type='checkbox'/></div>").appendTo(li);
				}
				var goodsname = $("<div class='goodsname'></div>");
				goodsname.appendTo(li);
				goodsname.html($("<img class='fl' src="+obj.img1+"><p class='fl'>"+obj.title+"</p>"));
					
				$("<div class='single-price'>"+obj.unit+obj.price+"</div>").appendTo(li);
				var goodsnum = $("<div class='num'></div>");
				goodsnum.appendTo(li);
				goodsnum.html($("<input type='text' class='text' value="+obj.num+
								"><input class='reduce' type='text' value='-'><input class='add' type='text' value='+'>"));
				
				$("<div class='count-price'>"+obj.price * obj.num+"</div>").appendTo(li);
				
				var goodsoperate = $("<div class='operate'></div>");
				goodsoperate.appendTo(li);
				goodsoperate.html($("<a href='javascript:;' class='del'>移除</a><a href='javascript:;'>移入收藏夹</a>"))
				
				//计算总价
				if (obj.checked) {
					totalPrice = obj.price * obj.num;
					allPrice += obj.price * obj.num;
				}
			console.log($(".cartprice li").length);
				
			}
			
			//显示总价
			$(".mycart-b-r .price").html(allPrice);
			
			console.log($(".cartprice li").length);
			 if($(".cartprice li").length > 0) {
				$("#ShoppingContent").hide();
				$(".mycart").show();
			}else{
				$("#ShoppingContent").show();
				$(".mycart").hide();
			}
			
		}
		
	}
	
	//+
	$(".cartprice").on("click", ".add", function(){
		var index = $(this).index(".cartprice .add");
		
		//获取cookie并修改
		var arr = JSON.parse($.cookie("cart"));
		arr[index].num++;
		$(".text").attr("value",arr[index].num);
		//覆盖原来的cookie
		$.cookie("cart", JSON.stringify(arr), {expires:30, path:"/"});
		
		//刷新节点数据
		refresh();
		
	})
	
	//-
	$(".cartprice").on("click", ".reduce", function(){
		var index = $(this).index(".cartprice .reduce");
		
		//获取cookie并修改
		var arr = JSON.parse($.cookie("cart"));
		arr[index].num--;
		if (arr[index].num < 1) {
			arr[index].num = 1;
		}
		$(".text").val(arr[index].num);
		//覆盖原来的cookie
		$.cookie("cart", JSON.stringify(arr), {expires:30, path:"/"});
		
		//刷新节点数据
		refresh();
		
	})
	
	
	//删除
	$(".cartprice").on("click", ".del", function(){
		var index = $(this).index(".cartprice .del");
		
		//获取cookie并修改
		var arr = JSON.parse($.cookie("cart"));
		arr.splice(index, 1); //删除数组arr的第index个
		
		//覆盖原来的cookie
		$.cookie("cart", JSON.stringify(arr), {expires:30, path:"/"});
		
		isAllSelect();
		
		//刷新节点数据
		refresh();
	})
	
	
	//勾选
	$(".cartprice").on("click", ".check", function(){
		var index = $(this).index(".cartprice .check");
		
		//获取cookie并修改
		var arr = JSON.parse($.cookie("cart"));
		arr[index].checked = !arr[index].checked;
		
		//覆盖原来的cookie
		$.cookie("cart", JSON.stringify(arr), {expires:30, path:"/"});
		
		//判断是否全选了
		isAllSelect();
		
		//刷新节点数据
		refresh();
	})
	
	//判断是否全部勾选了
	isAllSelect();
	function isAllSelect(){
		
		//判断是否为undefined
		var arr = $.cookie("cart");
		if (!arr) {
			return;
		}
		
		var arr = JSON.parse($.cookie("cart"));
		
		var sum = 0;
		for (var i=0; i<arr.length; i++) {
			sum += arr[i].checked;
		}
		
		//全选了
		if (arr.length!=0 && sum==arr.length) {
			$("#allSelect").prop("checked", true);
		}
		//未全选
		else {
			$("#allSelect").prop("checked", false);
		}
	}
	
	//全选
	$("#allchecked").click(function(){
		//判断是否为undefined
		var arr = $.cookie("cart");
		if (!arr) {
			return;
		}
		
		var arr = JSON.parse($.cookie("cart"));
		for (var i=0; i<arr.length; i++) {
			//全选
			if ($(this).prop("checked")){
				arr[i].checked = true;
			}
			//全不选
			else {
				arr[i].checked = false;
			}
		}
		$.cookie("cart", JSON.stringify(arr), {expires:30, path:"/"});
		
		//刷新
		refresh();
	})
	
	/*//删除选中
	$("#delSelect").click(function(){
		
		//获取cookie并修改
		var arr = JSON.parse($.cookie("cart"));
		
		//将未选中的商品添加到新数组newArr中，再将newArr保存到cookie
		var newArr = [];
		for (var i=0; i<arr.length; i++) {
			if (!arr[i].checked) {
				newArr.push(arr[i]);
			}
		}
		
		//覆盖原来的cookie
		$.cookie("cart", JSON.stringify(newArr), {expires:30, path:"/"});
		
		isAllSelect();
		
		//刷新节点数据
		refresh();
	})*/
	
	
	
	
})
