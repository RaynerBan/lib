//基础工具类
//包含选择器操作，事件绑定，操作类、属性, 异步请求及字符串函数等

var Tools = {
	query : function(string){
		return document.querySelectorAll(string) || [];
	},
	ready : function(callback){
		var self = this;
		self.addHandler(window,'load',callback);
	},
	addClass : function(objs, className){
		var self = this;
		var className = this.trim(className);
		if(objs.length === undefined){
			if(!self.hasClass(objs,className)){
				objs.className += " " + className;
			}
		}else{
			self.forEach(objs, function(index, obj){
				if(!self.hasClass(obj,className)){
					obj.className += " " + className;
				}
			});
		}
		return objs;
	},
	removeClass : function(objs, className){
		var self = this;
		var className = this.trim(className);
		self.forEach(objs, function(index, obj){
			if(self.hasClass(obj,className)){
				obj.className = obj.className.replace(className," ");
				obj.className = self.trim(obj.className);
			}
		});
		return objs;
	},
	hasClass:function(obj, className){
		var self = this;
		if(typeof className != 'string'){
			return false;
		}
		return obj.className && (obj.className.indexOf(self.trim(className))!=-1 ? true : false);
	},
	addHandler: function (element, type, handler){
		var self = this;
		if(element === window || element === document || element.length===undefined){
			self._addSingleHandler(element, type, handler);
		}else{
			self.forEach(element,function(index,item){
				self._addSingleHandler(item, type, handler);
			});
		}

	},
	_addSingleHandler: function (element, type, handler){
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
	//返回事件对象
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
	forEach : function(array,callback){
		if (array.length === undefined){
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
	/* config = {	method : "get/post",
	*				url : "",
	*				data : {key:value}
	*				success : function}
	*/
	ajax : function(config){
		var xhr = new window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsfr.XMLHTTP');
		xhr.onreadystatechange = function(){
            if(xhr.readyState == 4 && xhr.status == 200){
                config.success && config.success(xhr.responseText);
            }
        };
        if(config.data){
        	var data = config.data;
        	var arr=[];
			for(var key in data){
				if(data.hasOwnProperty(key)){
					arr.push(key+'='+data[key]);
				}
			}
			data = arr.join('&');
        }
		if(config.method){
            xhr.open(config.method,config.url+'?'+data,true);
            config.method == 'get' ?
                xhr.send() :
                (xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded"),
					xhr.send(data));
         }
	},
	//设置style
	//css格式：{key:value, key:value}
	css : function(objs, css){
		var self = this;
		if(objs.length === undefined){
			for(var attr in css){
				objs.style[attr] = css[attr];
			}
		}else{
			self.forEach(objs,function(index,obj){
				for(var attr in css){
					obj.style[attr] = css[attr];
				}
			});
		}
		return objs;
	},
	//设置属性
	//参数格式：attrName及attrValue都为string
	setAttr : function(objs, attrName, attrValue){
		var self = this;
		if(objs.length === undefined){
			objs.setAttribute(attrName, attrValue);
		}else{
			self.forEach(objs,function(index,obj){
				obj.setAttribute(attrName, attrValue);
			});
		}
		return objs;
	},
	getAttr : function(objs, attrName){
		var attrValue = "";
		if(objs.length >0 ){
			attrValue = objs[0].getAttribute(attrName) || attrValue;
		}else{
			attrValue =   objs.getAttribute(attrName) || attrValue;
		}
		return attrValue;
	},
	//插入子节点，返回当前元素
	appendChild : function(objs, el){
		var self = this;
		if(objs.length === undefined){
				objs.appendChild(el);
		}else{
			self.forEach(objs,function(index,obj){
				obj.appendChild(el);
			});
		}
		return objs;
	},
	//插入子节点，返回子节点队列
	//config格式：{
	//	tag : 标签名
	//	className : 类名
	//  css : 样式对象
	//}
	children : function(parent, config){
		var ele = document.createElement(config.tag);
		this.addClass(ele, config.className);
		this.appendChild(parent, ele);
		return ele;
	},
	find : function(objs, children){
		if(objs.length === undefined){
			return objs.querySelectorAll(children);
		}else{
			return objs[0].querySelectorAll(children);
		}
	},
	//插入DOM节点，content为string
	html : function(objs, content){
		var self = this;
		if(objs.length === undefined){
			objs.innerHTML = content;
		}else{
			self.forEach(objs,function(index,obj){
				obj.innerHTML = content;
			});
		}
		return objs;
	},
	//返回元素高度
	height : function(objs){
		if(objs.length === undefined){
			return objs.style.height;
		}else{
			return objs[0].style.height;
		}
	},
	//对字符串求取哈希值，hashNum为哈希数
	hash :function(string, hashNum){
		var total = 0;
		var hashNum = hashNum || 8;
		if(typeof string === "string"){
			T.forEach(string,function(index,item){
				total += item.charCodeAt(0);
			});
			return total % hashNum;
		}
	},
	//将过长的字符截取最多显示n个
	wordCat : function(str, n){
          var r=/[^\x00-\xff]/g;
                if(str.replace(r,"mm").length<=n){return str;}
                var m=Math.floor(n);
                for(var i=m;i<str.length;i++){
                    if(str.substr(0,i).replace(r,"mm").length>=n){
                        return str.substr(0,i)+"..";
                    }
                }
                return str;
		
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