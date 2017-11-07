$(function(){
	//放大镜效果
	//等比公式
	//小图width/大图width == 小区域width/大区域width
	$("#smallArea").width( $("#smallImg").width() * $("#bigArea").width() / $("#bigImg").width() );
	$("#smallArea").height( $("#smallImg").height() * $("#bigArea").height() / $("#bigImg").height() );

	//放大系数
	var scale = $("#bigImg").width() / $("#smallImg").width();

	//在小图中移动
	$("#smallImg").mousemove(function(e){
		$("#smallArea").show(); //显示小区域
		$("#bigArea").show(); //显示大区域


		var x = e.pageX - $("#smallImg").offset().left - $("#smallArea").width()/2;
		var y = e.pageY - $("#smallImg").offset().top - $("#smallArea").height()/2;

		//控制不超出左右边界
		if (x < 0){
			x = 0;
		}
		else if (x > $("#smallImg").width()-$("#smallArea").width()){
			x = $("#smallImg").width()-$("#smallArea").width();
		}
		//控制不超出上下边界
		if (y < 0){
			y = 0
		}
		else if (y > $("#smallImg").height()-$("#smallArea").height()) {
			y = $("#smallImg").height()-$("#smallArea").height();
		}

		//小区域移动
		$("#smallArea").css({left:x, top:y});

		//大图移动
		$("#bigImg").css({left: -scale*x,top: -scale*y});
	})

	//移除小图
	$("#smallImg").mouseleave(function(){
		$("#smallArea").hide(); //隐藏小区域
		$("#bigArea").hide(); //隐藏大区域
	})


	//吸顶效果
	var fixedTop = $(".fixed").offset().top;

	$(window).scroll(function(){
		var scrollTop = $(window).scrollTop();

		if (scrollTop >= fixedTop){
			$(".fixed2").fadeIn();
		}
		else {
			$(".fixed2").fadeOut();
		}
	})




	//分享按钮
	$("#share_icon").click(function(){
		$(".share-icon").addClass("share-icon-all");
		$(this).addClass("more").removeClass("less").click(function(){
			$(this).addClass("less").removeClass("more");
			$(".share-icon").removeClass("share-icon-all");
		});
	})


	//回到顶部
	$(window).scroll(function(){
		$("#goTop").css("display","block").click(function(){
			$("html,body").stop(true).animate({scrollTop: 0},function(){
				$("#go_top").attr("src","images/ToTop_Press.gif");
			});
		});
		/*$("#go_top").mouseenter(function(){
			$(this).attr("src","images/ToTop_Press.gif");
		}).mouseleave(function(){
			$(this).attr("src","images/ToTop_Normal.gif");
		})*/

	})



	//goods详情部分
	//获取从首页传过来的id
	// location.search : 参数部门， 如:?id=1002&name=lisi
	var param = location.search.substring(1);
	var pid = getParams(param, "id");
	//获取json中的数据
	$.get("json/goods1.json", function(data){
		var arr = data;

		for (var i=0; i<arr.length; i++) {
			var obj1 = arr[i]; //每个商品数据
			//$(".smI").attr("src")=$(".bigImg").attr("src");

			//找到id相同的商品后，就可以使用obj了
			if (obj1.id == pid) {
				loadUI(obj1)
				var obj = obj1;
				

				//放大镜下面部分
				//console.log($("#piclist li").length);
				var len = $("#piclist li").length;
				console.log(len);
				//箭头显示
				if(len < 4){
					$(".goodsall-bt .arrow").hide();
				}
				$("#piclist li").hover(function(){
					$(this).addClass("cur");
					$(".smI").attr("src",$(this).find("img").attr("src"));
					$(".bigImg").attr("src",$(this).find("img").attr("src"));
				},function(){
					$(this).removeClass("cur");
				})
				//$(".smI").attr("src","obj.img2.index($(this))")=$(".bigImg").attr("src");

				//var that = arr.index();
				
				// 型号显示部分
				$(".goods-color .goodsdata a").click(function(){
					$("<s></s>").appendTo($(this));
					$(this).css("border-color","#f60").siblings().css("border-color","#bfbfbf");
					//$(this).children("s").show().siblings().children("s").hide();
					$(this).siblings().children("s").hide();
					
				})
				//数量部分的点击
				var number = $(".num").val();
				//-
				$(".minus").on("click",function(){
					//count=number--;
					 $(".num").val(number--);
					 if(number<=1){
						number=1;
					}
				})
				//+
				$(".plus").on("click",function(){
					$(".num").val(number++);
					/*if(number>=obj.limit){
						number = obj.limit;
					}*/
				})
				//console.log($(".num").val());
				//点击商品
				$(".cartquick").click(function(){

					//var index = $(this).index(".goods .cartquick");
					//console.log(index);

					//var obj = arr[that]; //所点击的商品

					
					//console.log(obj)
					//将当前点击的商品数据加入购物车（cookie）
					var arr2 = $.cookie("cart") ? JSON.parse($.cookie("cart")) : [];
					

					//判断原来的购物车中是否有相同商品
					var isExist = false;
					for (var i=0; i<arr2.length; i++) {
						if (arr2[i].id == obj.id) {
							arr2[i].num += Number($(".num").val());
							isExist = true;
							break;
						}
					}
					if (isExist ==  false) {
						obj.num = 1;
						obj.checked = true; //是否选中， 默认选中
						arr2.push(obj);
					}
					


					//将arr2添加到cookie中
					$.cookie("cart", JSON.stringify(arr2), {expires:30, path:"/"});
					//console.log( $.cookie("cart") );
					
				})


			}
			
		}
		
	})

	function loadUI(obj){
		$(".pinpai .goodsdata").html(obj.pinpai);
		$(".xinghao .goodsdata").html(obj.xinghao);
		$(".price-now .goodsdata strong").html(obj.price);
		//$(".goods-cnts-tips span").html(obj.limit);
		$(".smI").attr("src",obj.img1);
		$(".bigImg").attr("src",obj.img1);
		$(".goods-title h1").html(obj.title);
		for(var j =0 ; j < obj.img2.length;j++){
			var li=$("<li></li>");
			li.appendTo($("#piclist"));
			li.html($("<img src="+obj.img2[j]+">"));
		}
		for(var i =0 ; i <obj.xh.length;i++){
			var a=$("<a href='javascript:void(0);'></a>");
			a.appendTo($(".goods-color .goodsdata"));
			console.log(obj.xh.length);
			a.html(obj.xh[i]);
		}


	}



	//查找参数对应的值
	function getParams(str, name){
		var arr = str.split("&");
		for (var i=0; i<arr.length; i++) {
			var str1 = arr[i];
			var arr1 = str1.split("=");
			if (arr1[0] == name) {
				return arr1[1];
			}
		}
		return "";
	}



	//结算部分显示
	$(".cartquick").click(function(){
		$(".gotocount").show();
	})
	$(".close").click(function(){
		$(".gotocount").hide();
	})
	$(".goonshopping").click(function(){
		$(".gotocount").hide();
	})

})
