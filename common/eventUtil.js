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
	getEventTarget : function(e){
		e = window.event || e;
		return e.srcElement || e.target;
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