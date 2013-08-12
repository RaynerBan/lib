/***************************************************
 * PUILoad: encapsulated select
 * Used for PTS
 * author:jianhong.wangjh@alibaba-inc.com
 * depend on:jquery-1.6.2.min.js
 * example(the basic usage):
 * <html>
 * ...
 * <div id="example"></div>
 * ...
 * </html>
 * <script>
 *  var exConfig = {
 *    url : "img/spinner_signin.png",
 *    height : "42",
 *    roundNum : "12",
 *    interval : "50"
 *  };
 * $(function(){
 *   $("#example").PUILoad(config);
 * });
 * </script>
 *
 * Date: 2011.10.13
 * ************************************************/
function g(p,s){
	if(p){
		return p;
	}
	return s;
}
var GET_LOAD_URL = g(GET_LOAD_URL,'http://ptsstyle.data.alibaba-inc.com/');
(function(){if($ && $.PUILoad) {return;}
  //start
  var defaultconfig = {
    blackBig : {
      url : GET_LOAD_URL+"img/spinner_signin.png",
      height : "42",
      roundNum : "12",
      interval : "50"
    },
    whiteBig : {
      url : GET_LOAD_URL+"img/spinner.png",
      height : "42",
      roundNum : "12",
      interval : "50"
    },
    blackSmall : {
      url :　GET_LOAD_URL+"img/spinner_signin_lite.png",
      height : "28",
      roundNum : "12",
      interval : "40"
    },
    whiteSmall : {
      url :　GET_LOAD_URL+"img/spinner_lite.png",
      height : "28",
      roundNum : "12",
      interval : "40"
    }
  }

  $.fn.PUILoad = function (settings){
    var config = {};
    if(typeof settings == "string"){
      config = defaultconfig[settings];
    }else{
      $.extend(config,settings);
    }
    var returnValue = this, timer="";
    //initial css
    //returnValue.attr("style","background-image:url("+config.url+");background-position:0px 0px;background-repeat:no-repeat;display:block;width:"+config.height+"px;height:"+config.height+"px");
    returnValue.css({"background-image":"url("+config.url+")","background-position":"0px 0px","background-repeat":"no-repeat","display":"block","width":config.height+"px","height":config.height+"px"});
    var imgConfig = {
      blackSmall :GET_LOAD_URL+ "img/spinner_signin_lite.png",
      blackBig : GET_LOAD_URL+"img/spinner_signin.png",
      whiteSmall : GET_LOAD_URL+"img/spinner_lite.png",
      whiteBig : GET_LOAD_URL+"img/spinner.png"
    };
    //interval fn
    var changePos = function(){
      var posC = returnValue.css("background-position"),posY=0;
      if(posC){
        posC = posC.replace(/px/g,"");
        posC = posC.replace(/%/g,"");
        posY = (posC.split(" "))[1];
      }
      if(posY > (-config.height*(config.roundNum-1))){
        posY -= config.height;
      }else{
        posY = 0;
      }
      returnValue.css("background-position","0 " + posY + "px");
    }
    //set interval
    //timer = setInterval(changePos, config.interval);
		timer = true;
		var fn = function(){
			changePos();
			if(timer){
				setTimeout(fn,config.interval);
			}
		}
		fn();
    //return the timer
    return timer;
  }
  $.PUILoad = {
    stop : function(timer){
						 timer = false;
             //clearInterval(timer);
           },
    show : function(handle){
             handle.show();
           },
    hide : function(handle){
             handle.hide();
           }
  }
})()
