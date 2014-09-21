//图表生成组件对象
//基于工具类Tool.js

//require('Tools.js')
var T = Tools;
var Graph ={
	_controls : {},
	_partsNum : 5,
	_dataStore : {},
	_bgColors : ["#666666","#21AA7C","#2277BB","#dc7644","#BBAA22","#AA22AA","#338800","#1099EE","#ffcc33","#ED3810"],
	//刷新图表
	fresh : function(data,colors){
		this._set_controls();
		this._setPartsNum();
		this._setBgColors(colors || this._bgColors);
		this._buildGraphDOM(data);
	},
	_setPartsNum: function(){
		this._partsNum = 5;
	},
	_setBgColors : function(bgColorArray){
		this._bgColors = bgColorArray;
	},
	_set_controls :function(){
		var self = this;
		self._controls.histogramContainer = T.query("#histogram-container");

		self._controls.histogramBgLineUL = T.children(self._controls.histogramContainer,{
			tag : 'div',
			className : 'histogram-bg-line'
		});

		self._controls.histogramContentUL = T.children(self._controls.histogramContainer,{
			tag : 'div',
			className : 'histogram-content'
		});

		self._controls.histogramY = T.children(self._controls.histogramContainer, {
			tag : 'div',
			className : 'histogram-y'
		});
	},
	//获取数据为空处理函数
	_renderNoData :function(){
		this._buildGraphDOM([{"word":"","word_frequency":0}]);
		alert('暂无数据~~~');
	},
	//渲染图表生成
	_buildGraphDOM : function(data){
		var len = data.length;
		if(len==0){
			this._renderNoData();
			return;
		}

		var self = this;
		this._dataStore['data'] = data;
		this._dataStore['word_frequency'] = [];
		this._dataStore['perWidth'] = Math.floor(100/len);

		var minWidth = len *20 + 60;
		T.css(self._controls.histogramContainer,{"min-width" : minWidth+"px"});

		T.forEach(data,function(index, item){
			self._dataStore['word_frequency'][index] = parseInt(item['word_frequency'],10);
		});

		var maxNum=String(this._dataStore['word_frequency'].max());

        if(maxNum.length>2){
            var x=parseInt(maxNum.substr(0,1))+1;
            var x1=parseInt(maxNum.substr(1,1));
            var pow = Math.pow(10,maxNum.length-1);
            if(x1<4){
                x = x-1;
                self._dataStore['maxYAxis']=x*pow + 5*pow/10;
            }else if(x1>=8) {
                self._dataStore['maxYAxis']=x*pow + 5*pow/10;
            }else{
                self._dataStore['maxYAxis']=x*pow;
            }


        }else{
            self._dataStore['maxYAxis']=Math.floor(parseInt(maxNum/10))*10+10;
        }
		self._buildYAxis();
		self._buildLine();
		self._bulidbgBox();
		var insertHTML = self._dataStore['bgLineAll'] + self._dataStore['contentStr'] + self._dataStore['YAxisStr'];
		T.html(self._controls.histogramContainer, insertHTML);

	},
	//y轴部分
	_buildYAxis : function(y){
		var self = this;
		var YAxisStr = "";
		var i = this._partsNum;
		if(y=="%"){
			YAxisStr += '<li>100%</li><li>80%</li><li>60%</li><li>40%</li><li>20%</li><li>0%</li>';			
		}else{
			var avg = (self._dataStore['maxYAxis'] || 100) /i;
			for(; i>=0; i--){
				YAxisStr += '<li>'+avg*i+'</li>';
			}
		}
		this._dataStore['YAxisStr'] = YAxisStr;
	},
	//柱状条部分
	_buildLine : function(){
		var self = this;
		var data = self._dataStore['data'];
		var maxYAxis = self._dataStore['maxYAxis'];
		var perWidth = self._dataStore['perWidth'];
		var bgColor = self._bgColors;
		var contentStr="", bgLineStr="";
		T.forEach(data,function(index, item){
			var perData = item['word_frequency'];
			var per=Math.floor(parseInt(perData)/maxYAxis*100,10);
			var n = Math.floor(parseInt(per,10)/10);
			var hashNum = Math.floor(T.hash(item['word'],10));
            var height = (perData/maxYAxis)*350 + 5;
            var wordCat = T.wordCat(item['word'],8);
			contentStr += '<li style="width:'+perWidth+'%">';
            contentStr+='<span class="histogram-per" style="bottom:'+ height + 'px">'+perData+'</span>';
			contentStr += '<span class="histogram-box"><a class="animation_height"  style="height:'+per+'%'+';background:'+bgColor[hashNum]+';" title="'+item['word']+':'+perData+'"></a></span><span class="histogram-name">'+wordCat+'</span>';
			contentStr += '</li>';
			bgLineStr += '<li style="width:'+perWidth+'%;"><div></div></li>';
		});

		self._dataStore['contentStr'] = contentStr;
		self._dataStore['bgLineStr'] = bgLineStr;
	},
	//背景方格部分
	_bulidbgBox : function(){
		var self = this;
		var bgLineStr = self._dataStore['bgLineStr'];
		var contentStr = self._dataStore['contentStr'];
		var YAxisStr = self._dataStore['YAxisStr'];
		var bgLineAll = "";
		for(var i=0;i<this._partsNum;i++){
			bgLineAll += '<ul>' + bgLineStr + '</ul>';
		}
		bgLineAll='<div class="histogram-bg-line">'+bgLineAll+'</div>';
		contentStr='<div class="histogram-content"><ul>'+contentStr+'</ul></div>';
		YAxisStr='<div class="histogram-y"><ul>'+YAxisStr+'</ul></div>';

		self._dataStore['bgLineAll'] = bgLineAll;
		self._dataStore['contentStr'] = contentStr;
		self._dataStore['YAxisStr'] = YAxisStr;
	}

};

Array.prototype.max = function(){//最大值
 return Math.max.apply({},this) 
} 

