window.onload = function(){
	function $(id){
		return document.getElementById(id);
	}
	//二级导航
	var drop = $("list").getElementsByTagName("dl");
	for(var i = 0 ; i < drop.length; i ++){
		drop[i].index = i ;
		drop[i].onmouseover = function(){
			for(var j = 0; j < drop.length ; j ++){
				drop[j].style.background = "#ccc";
			}
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


}
