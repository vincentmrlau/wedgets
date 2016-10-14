
/*
##   INTRO   
*   improve qiniu SDK.

*rely on [qiniu.js](https://github.com/iwillwen/qiniu.js/tree/develop)

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
})(window);

(function(vin){
	"use strict";
	if(!(typeof vin == "object")){
		console.error("vin is undefined");
		return false;
	}
/*
##  vin.qiniuInitialize(options)
### parameters
*	`options` {object} valid keys:
	*	`button` {htmlElement} clicked to call file-select-window
	*	`accept` {string} defaut:"image/*",the same 
	as tag input-"type=file" option"accept"
	*	`multiple` {boolean} defaut:true
	*	`domains` {string} domains to upload
	*	`uptoken` {string} upload token
	*	`before` {function} call:before(name,file);called when file 
	selected but before upload start.We can do something with name or file,
	return should be an object with keys `name` and `file`.
	*	`success` {function} call:success(reply);callback when upload done
	*	`error`	{function} call:error(err);callback when error comes out
	*	`title` upload title defaut:"vincent-qiniu"
*/

vin.qiniuInitialize = function(options)
{
	if (!(typeof options == "object")) {
			console.error("qiniuInitialize:options is undefined");
			return false;
		}
		
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
		try{
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
		}catch(e){throw(e);}
		var bucket = qiniu.bucket(
			options.title?options.title:"vincent-qiniu"
			,{
				putToken:options.uptoken
				,url:options.domains
			});
		inputDom.onchange = function(){
			var files = inputDom.files;
			var uploadstuts = files.length;//when success 0
			for(var i =0;i<files.length;i++){

				var name =null;
				if(typeof options.before == "function"){
					var beforeReturn = options.before(name,files[i]);
					if(typeof beforeReturn =="object"){
						name = beforeReturn.name
								?beforeReturn.name
								:name;
						files[i] = beforeReturn.file
								?beforeReturn.file
								:files[i];
					}				
				}
				//upload files
				bucket.putFile(name,files[i])
				.then(
					function(reply){
					    // success
					    if (typeof options.success == "function") {
					    	options.success(reply);
					    }
					    uploadstuts -= 1;
					    if (uploadstuts == 0) {
					    	formDom.reset();
					    }  
					}
					,function(err){
						if (typeof options.error == "function") {
							options.error(err);
						}
						uploadstuts -= 1;
						if (uploadstuts == 0) {
							formDom.reset();
						}      
					}
					);
			}
		}
}

})(vin)