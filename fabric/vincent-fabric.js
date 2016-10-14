/*
##   INTRO   
* `README.md provides MORE infomation`
*  This is a JavaScript Library aiming at making canvas things 
 More simple and More efficient.

*rely on [fabric.js](http://fabricjs.com/)

* data: Mon, 10 Oct 2016 14:11:54 GMT
*/

/*
## author info
*	`Vincent Lau`
* 	`mrliuyiman@foxmail.com`
*	`Guangzhou,China`
*/


(function(window){
	"use strict";
	window.vf = {};
})(window);


(function(vf){
	"use strict";

//insure fabric.js is concluded
if(!fabric){
	console.error("vincent-fabric relys on fabric.js  (http://fabricjs.com/)");
	return false;
}


/*
## vf.canvasObjSelectEventOn(canvas,handlers)
add event"object:selected" listener to a canvas,and set handlers 
triggering according to deffrent object type(text ,image by now,
more types is updating).
### parameters
*		`canvas` [object] a fabric canvas object
*		`handlers` [object] handlers,valid keys:
	*		`beforecheck` {function} call when selected happened
	* 		`all` {function} call when an object(all types,target exited)
	 being selected
	* 		`text` {function}  call when text object being selected
	* 		`image` {function}  call when image object being selected
	* 		`othertype` {function}  call when an object(no defined handler)
being selected
*/
vf.canvasObjSelectEventOn = function(canvas,handlers)
{
	//check arguments
	if(!(canvas instanceof fabric.Canvas)){
		console.error("canvas must be fabric a canvas object");
		return false;
	}
	if(!(typeof handlers =="object")){
		console.warn("handlers must be an object");
		return false;
	}
	else{
		canvas.on("object:selected",function(options){

			if (typeof handlers.beforecheck == "function") {
				handlers.beforecheck(options);
			}

			if(options.target){
				if (typeof handlers.all == "function") {
					handlers.all(options.target);
				}

				switch (options.target.type)
				{
					case "text":
						if(typeof handlers.text == "function"){
							handlers.text(options.target);
							break;
						}		
					case "image":
						if(typeof handlers.image == "function"){
							handlers.image(options.target);
							break;
						}	
					//more case is coming
					//.....
					default:
					{
						if(typeof handlers.othertype == "function"){
							handlers.othertype(options.target);
						}
						break;
					}
				}
			}
		});
	}
}


/*
## vf.setCvsBorderFromImgdom(imgDom,canvas,callback)
use an image dom as the border of Fabric Canvas Instance
### parameters
*		`imgDom` [object] must be img html dom object
*		`canvas` [object] canvas must be fabric canvas object
*		`callback` [funtion] [optional] call when all things done

### return
*		`imgBorder` [object] an Fabric Image Instance
*/
vf.setCvsBorderFromImgdom = function(imgDom,canvas,callback)
{	
	//check arguments
	if(typeof imgDom === "object"
		?(!imgDom.nodeType===1)
		:true){
		console.error("imgDom must be a htmldom object");
		return false;
	}
	if(!(canvas instanceof fabric.Canvas)){
		console.error("canvas must be fabric a canvas object");
		return false;
	}
	else{
		console.log("setCvsBorderFromImgdom begin");
		var imgBorder = new fabric.Image(
			imgDom,{left:0,top:0});
		//full the cavans
		imgBorder.set({
			width:canvas.getWidth()
			,height:canvas.getHeight()
			,visible:true
		});

		//set a fabric image as overlay of canvas
		canvas.setOverlayImage(imgBorder
			,function(){
				canvas.renderAll.bind(canvas);
				if(typeof callback =="function"){
						callback();
					}
			});
		return imgBorder;
	}
}


/*
## vf.changeCvsBorderFromImgdom(imgDom,canvas,callback)
use an image dom to change the border of Fabric Canvas Instance
###	parameters 
*	imgDom  [object] must be img html dom object
*	canvas  [object] canvas must be fabric canvas object
*	allback  [funtion] [optional]  call when all things done

###	return
*	mgBorder [object] an Fabric Image Instance
*/
vf.changeCvsBorderFromImgdom = function(imgDom,canvas,callback)
{	
	//check arguments
	if(typeof imgDom === "object"
		?(!imgDom.nodeType===1)
		:true){
		console.error("imgDom must be a htmldom object");
		return false;
	}
	if(!(canvas instanceof fabric.Canvas)){
		console.error("canvas must be a fabric canvas object");
		return false;
	}
	//check overlayimage
	if(!canvas.overlayImage){
		console.error("there is no overlayimage of this canvas");
		return false;
	}
	else{
		console.log("changeCvsBorderFromImgdom begin");
		//change the overlayImage if EXISTED
		canvas.overlayImage.setElement(imgDom
			,function(){
				canvas.overlayImage.set({
					width:canvas.getWidth()
					,height:canvas.getHeight()
					,visible:true
				});
				canvas.renderAll();
				if(typeof callback =="function"){
					callback();
				}
			});
		return canvas.overlayImage;
	}	
}


/*
## vf.addImgFromImgDom(imgDom,canvas,callback)
### parameters
*	`imgDom` {htmldom object}
*	`canvas` {fabric.Canvas object} 
*	`callback` {function} call:callback(addImg);when added
*/
vf.addImgFromImgDom = function(imgDom,canvas,callback)
{	
	console.log("addImgFromImgDom");
	try{
		var addImg = new fabric.Image(imgDom,{
		});
		canvas.add(addImg);
		canvas.renderAll();
		if (typeof callback == "function") {
			callback(addImg);
		}	
	}catch(e){throw(e);}
}

/*
##	vf.addImgFromFile(file,canvas,callback)
add image file (reader as base64) in to canvas
### parameter 
*	`file` {object} input filelist file
*	`canvas` {object} fabric canvas object
*	`callback` {function} call:callback(addImg);we can do something with
 	the fabric image added right now
*/ 
vf.addImgFromFile = function(file,canvas,callback)
{
	try{
		//check arguments
		console.log(file.name,file.size);
		var reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = function(){
			var base64 = this.result;
			var imgDom = new Image();
			imgDom.src = base64;
			var addImg = new fabric.Image(imgDom,{
			});
			canvas.add(addImg);
			canvas.renderAll();
			if (typeof callback == "function") {
				callback(addImg);
			}
		}
	}catch(e){throw(e);}
	
}

//TODO change image from ImgDom
vf.changeImgFromImgDom = function(imgObj,canvas,imgURL,callback,options)
{

}

vf.addText = function(text,canvas,callback)
{
	try{
		var toAddText = new fabric.Text(text,{});
		canvas.add(toAddText);
		canvas.renderAll();
		if(typeof callback == "function"){
			callback(toAddText);
		}
	}catch(e){throw(e);}	
}

})(vf);


