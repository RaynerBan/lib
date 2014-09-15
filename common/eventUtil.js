var EventUtil = {
	addHandler: function (element, type, handler){
		if(element.addEventListener){
			element.addEventListener(type,handler);
		}else if(element.attachEvent){
			element.attachEvent('on'+type, handler);
		}else{
			element['on'+type] = handler;
		}
	},
	removeHandler: function(element, type, handler){
		if(element.removeEventListener){
			element.addEventListener(type,handler);
		}else if(element.detachEvent){
			element.detachEvent('on'+type, handler);
		}else{
			element['on'+type] = null;
		}
	},
	getEvent : function(e){
		e = window.event || e;
		return e;
	},
	getEventTarget : function(e){
		e = window.event || e;
		//e = this.getEvent();
		return e.srcElement || e.target;
	},
	// 得到相关对象针对mouserover ,mouserout
	//一个主要对象，一个相关对象
	getRelatedTarget : function(e){
		if(e.relatedTarget){
			return e.relatedTarget;
		}else if(e.toElement){
			return e.toElement;
		}else if(e.fromElement){
			return e.fromElement;
		}
	},
	stopPropagation : function(e){
		if(e.stopPropagation){
			e.stopPropagation;
		}else{
			event.cancelBubble = true; //case IE
		}
	},
	getCharKode : function(e){
		if(e.charCode){
			return e.charCode;
		}else if(e.keyCode){
			return e.keyCode;
		}
	},
	each : function(array,callback){
		if (Object.prototype.toString.call(array) !== '[object Array]'){
			return;
		}
		for(var i= 0,len = array.length;i<len;i++){
			callback.call(array[i],i,array[i]);
		}
	},
	trim : function(str){
		if(typeof String.prototype.trim !== 'function') {
				return str.replace(/^\s+|\s+$/g, '');
		}else{
			return str.trim();
		}
	},
	/* config = { 	method : "get/post",
	 *				url : "",
	 *				success : function}
	*/
	ajax : function(config){
		var xhr = new window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsfr.XMLHTTP');
		xhr.onreadystatechange = function(){
             if(xhr.readyState == 4 && xhr.status == 200){
                 config.success && config.success(xhr);
             }
         };
		if(config.method){
             xhr.open(config.method,config.url,true);
             config.method == 'get' ?
                 xhr.send() :
                 (xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded"),
                     xhr.send(serialize(config.data)));

         }
	}
};

var delegate = function(o,fn){
	return function(){
		return fn.apply(o,arguments);
	}
}
var d = delegate(obj,obj.method);
d();

jQuery.namespace = function(){
	var arr = arguments, 
		o = null,
		i,j,d;
	for(i=0; i<arr.length; i++){
		d = arr[i].split('.');
		for( j= (d[0]=='jQuery')?1:0; j<d.length;j++){
			o[d[j]] = o[d[j]];
			o = o[d[j]]
		}
	}
	return o;
};


$('input.cascade').on('keyup',function(){
	var keyword = $.trim($(this).val().toLowerCase());
	if(keyword){
		// var reg = new RegExp(keyword, 'i');
		$.each($('li.cascade-li'),function(index,item){
			if($(item).attr('data-titie').index(keyword) == -1){
				$(item).hide();
			}
			else{
				$(item).show();
			}
		});
	}
});


if(typeof String.prototype.trim !== 'function') {
  String.prototype.trim = function() {
    return this.replace(/^\s+|\s+$/g, '');
  }
}

function isNumber(n){
	return !isNaN(n);
	return 	typeof n === "string" ||
			typeof n === "boolean" ||
			typeof n === "function" ||
			typeof n === "undefined" ||
			n instanceof Array;
}