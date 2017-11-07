

//创建xhr对象
function createXHR(){
	if (window.XMLHttpRequest) {  
		return new XMLHttpRequest(); //IE7+，非IE
	}
	return ActiveXObject("Microsoft.XMLHTTP"); //IE6
}






