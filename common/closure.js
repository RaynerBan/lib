var url = "http://www.cnblogs.com/liaopr/p/3928802.html";
//method 1
var o =$('.blockHead');
for(var i=0; i<o.length; i++){
	o[i].onclick = (function dealI(ii){
		return function(){
			alert(ii);
		}
	})(i);
}
//method 2
var o =$('.blockHead');
for(var i=0; i<o.length; i++){
	(function attach(ii,o){
		o.onclick = function(){
			alert(ii);
		};
	})(i,o[i]);
}
//method 2.1
var o =$('.blockHead');
for(var i=0; i<o.length; i++){
	attach(i,o[i]);
	function attach(ii,o){
		o.onclick = function(){
			alert(ii);
		};
	}
}

