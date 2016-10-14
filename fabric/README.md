
##   INTRO   
* `README.md provides MORE infomation`
*  This is a JavaScript Library aiming at making canvas things 
 More simple and More efficient.

* rely on [fabric.js](http://fabricjs.com/)

* data: Mon, 10 Oct 2016 14:11:54 GMT

## author info
*	`Vincent Lau`
* 	`mrliuyiman@foxmail.com`
*	`Guangzhou,China`

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

## vf.setCvsBorderFromImgdom(imgDom,canvas,callback)
use an image dom as the border of Fabric Canvas Instance
### parameters
*		`imgDom` [object] must be img html dom object
*		`canvas` [object] canvas must be fabric canvas object
*		`callback` [funtion] [optional] call when all things done

### return
*		`imgBorder` [object] an Fabric Image Instance

## vf.changeCvsBorderFromImgdom(imgDom,canvas,callback)
use an image dom to change the border of Fabric Canvas Instance
###	parameters 
*	imgDom  [object] must be img html dom object
*	canvas  [object] canvas must be fabric canvas object
*	allback  [funtion] [optional]  call when all things done

###	return
*	mgBorder [object] an Fabric Image Instance

## vf.addImgFromImgDom(imgDom,canvas,callback)
### parameters
*	`imgDom` {htmldom object}
*	`canvas` {fabric.Canvas object} 
*	`callback` {function} call:callback(addImg);when added

##	vf.addImgFromFile(file,canvas,callback)
add image file (reader as base64) in to canvas
### parameter 
*	`file` {object} input filelist file
*	`canvas` {object} fabric canvas object
*	`callback` {function} call:callback(addImg);we can do something with
 	the fabric image added right now