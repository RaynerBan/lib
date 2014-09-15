// $.browser.msie/mozilla/webkit/opera
// $.browser.version
// jQuery浏览器嗅探：基于navigator.userAgent的正则
// 缺点：容易被用户和浏览器欺骗，缺乏灵活性和不够全面；最好避免
//可改用基于功能方法
//参考@http://nuysoft.iteye.com/blog/1195296
var rwebkit = /(webkit)[ \/]([\w.]+)/,
ropera = /(opera)(?:.*version)?[ \/]([\w.]+)/,
rmsie = /(msie) ([\w.]+)/,
rmozilla = /(mozilla)(?:.*? rv:([\w.]+))?/,
userAgent = navigator.userAgent;

var jQuery = {
	browser : {},
	uaMatch : function(ua){
		ua = ua.toLowerCase();
		var match = webkit.exec( ua ) ||
    	   	ropera.exec( ua ) ||
    	   	rmsie.exec( ua ) ||
    	   	ua.indexOf("compatible") < 0 && rmozilla.exec( ua ) ||
    	   	[];
    	return { browser: match[1] || "", version: match[2] || "0" };
    }
};
var browserMatch = jQuery.uaMatch(userAgent);

if(browserMatch.browser){
	jQuery.browser[ browserMatch.browser ] = true;
    jQuery.browser.version = browserMatch.version;
}
// 不推荐使用safari标记，用webkit代替
if ( jQuery.browser.webkit ) {
    jQuery.browser.safari = true;
}
