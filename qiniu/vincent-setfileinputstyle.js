/*
##   INTRO   
*   set html tag input type=file style.

* data: 10/14/2016 3:24:15 PM

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
})(window);

(function(vin){
	"use strict";
	if(!(typeof vin == "object")){
		console.error("vin is undefined");
		return false;
	}
/*
##  vin.setInputfileStyle(options)
### parameters
*	`options` {object} valid keys:
	*	`button` {htmlElement} clicked to call file-select-window
	*	`accept` {string} defaut:"image/*",the same 
	as tag input-"type=file" option"accept"
	*	`multiple` {boolean} defaut:true
### return
*	`{
		formDom:formDom
		,inputDom:inputDom
	}`
*/
 
vin.setInputfileStyle = function(options)
{
	try{
		// set form
		var formDom = document.createElement("form");
		var inputDom = document.createElement("input");
		inputDom.setAttribute("type","file");
		inputDom.setAttribute("accept"
			,options.accept?options.accept:"image/*");
		var multipleAtt = document.createAttribute("multiple");
		if (options.multiple === false) {
		}
		else{
			inputDom.setAttributeNode(multipleAtt);
		} 
		
		//set button
		//compute button style
		var setWidth = 0;
		var setHight = 0;
		
		//if display = none, show it first
		if(window.getComputedStyle(options.button).display =="none"){
			// console.log("none");
			var isNone = true;
			options.button.style.display = "inline-block";
		}
		var buttonStyle = window.getComputedStyle(options.button);
		var buttonWidth = parseFloat(buttonStyle.width);
		var buttonHeight = parseFloat(buttonStyle.height);
		var buttonPaddingLeft = parseFloat(buttonStyle.paddingLeft);
		var buttonPaddingRight = parseFloat(buttonStyle.paddingRight);
		var buttonPaddingTop = parseFloat(buttonStyle.paddingTop);
		var buttonPaddingBottom = parseFloat(buttonStyle.paddingBottom);
		var buttonBorderLeft = parseFloat(buttonStyle.borderLeft);
		var buttonBorderRight = parseFloat(buttonStyle.borderRight);
		var buttonBorderTop = parseFloat(buttonStyle.borderTop);
		var buttonBorderBottom = parseFloat(buttonStyle.borderBottom);
		setWidth = buttonWidth;
		setHight = buttonHeight;
		console.log($(options.button).css("width"));					
		formDom.style.position = "relative";					
		formDom.style.display = "inline-block";
		formDom.style.top = (0-buttonPaddingTop-buttonBorderTop+2)+"px";
		formDom.style.left = (0-buttonPaddingLeft-buttonBorderLeft+2)+"px";
		formDom.style.float = "left";
		formDom.style.width = "0px";
		formDom.style.height = "0px";
		formDom.style.margin = "0px";
		formDom.style.padding = "0px";
		formDom.style.border = "0px";
		formDom.style.zIndex = "10000";
		inputDom.style.border = "0px";
		inputDom.style.margin = "0px";
		inputDom.style.padding = "0px";
		inputDom.style.width = (setWidth-5)+"px";
		inputDom.style.height = (setHight-5)+"px";
		inputDom.style.position = "relative";
		inputDom.style.overflow = "hidden";
		formDom.style.zoom = "1";
		inputDom.style.opacity = "0";
		inputDom.style.filter = 'alpha(opacity=0)';
		formDom.style.zIndex = 100000;

		formDom.appendChild(inputDom);
		if (options.button.firstChild){
			options.button.insertBefore(formDom,options.button.firstChild);
		}else{
			options.button.appendChild(formDom);
		}						
		//set ori-display
		if(isNone){
			options.button.style.display = "none";
		}
		return {
			formDom:formDom
			,inputDom:inputDom
		}
	}catch(e){throw(e);}
}


})(vin)