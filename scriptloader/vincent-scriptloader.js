/*
##   INTRO   
*   load script Asynchronous.

* data: Wed Oct 12 2016 16:23:46 GMT+0800
*/

/*
## author info
*	`Vincent Lau`
* 	`mrliuyiman@foxmail.com`
*	`Guangzhou,China`
*/
(function(window){
	"use strict";
	window.vin = {};

/*
##  vin.loadScript(url,callback)
### parameters
*	`url` {string} script src
*	`callback` {function} callback when loaded	
*/
vin.loadScript = function(url,callback){
	var script = document.createElement("script");
	script.type = "text/javascript";
	if(script.readyState){//IE
		script.onreadystatechange = function(){
			if(script.readyState =="loaded" || 
				script.readyState =="complete"){
				script.onreadystatechange = null;
				callback();
				}
		};
	}else{//other browers
		script.onload = function(){
			callback();
		};
	}
	script.src = url;

	document.getElementsByTagName("head")[0].appendChild(script);
}

})(window);