/*
##   INTRO   
* `README.md provides MORE infomation`
*  This is a JavaScript Library aiming at making Three.js Things canvas things 
 More simple and More efficient.

### rely on 
*	[three.js](https://threejs.org/)
*	[MTLLoader.js](https://github.com/mrdoob/three.js/tree/dev/examples/js/loaders)
*	[OBJLoader.js](https://github.com/mrdoob/three.js/tree/dev/examples/js/loaders)
*	[OrbitControls.js](https://github.com/mrdoob/three.js/blob/dev/examples/js/controls/OrbitControls.js)

* data: Thu Oct 20 2016 14:54:31 GMT+0800 
*/

/*
## author info
*	`Vincent Lau`
* 	`mrliuyiman@foxmail.com`
*	`Guangzhou,China`
*/
(function(window){
	"use strict";

	window.vt = {};//vt means vincent-threejs

	
	/*
	##	vt.MTLOBJLoader(mtlURL,objURL,success,error,progress)
	load an 3D model , .mtl & .obj
	###	paramerters
	*	`mtlURL` {string}
	*	`objURL` {string}
	*	`success` {function} call:success(object)
	*	`error` {function} call:error(xhr)
	*	`progress` {function} call:progrees(xhr)
	*/
	vt.MTLOBJLoader = function(mtlURL,objURL,success,error,progress)
	{
		var onError = function(xhr){
			if(typeof error == "function"){
				error(xhr);
			}
		}
		var onProgress = function(xhr){
			if(typeof progress == "function"){
				progress(xhr);
			}
		}
		var mtlLoader = new THREE.MTLLoader();
		mtlLoader.load(mtlURL,function(materials){
			var objLoader = new THREE.OBJLoader();
			objLoader.setMaterials(materials);
			objLoader.load(objURL,function(object){
				if(typeof success == "function"){
					success(object);
				}
			},onProgress,onError);
		},onProgress,onError);
	}

	/*
	## vt.base3DshowStateInitial(options)
	initialize a base 3D model show state,by initialing
	a base scene with PerspectiveCamera,5 width PointLights,
	camera controls,background and WebGLRenderer.
	## parameters
	*	`options` valid keys:(+ means necessary)
		*	`canvasid` {string} + 
		*	`canvaswidth` {num} +
		*	`canvasheight` {num} +
		*	`modelboxsize` {num} + the max length,(minimeter)
		*	`backgroud` {string} default "#FFFFFF"
		*	`axisHelper` {boolean} default: false
		*	`dampingFactor` {num} defaule: 0.7
		*	`enableZoom` {boolean} defaule: true
		*	`autoRotate` {boolean} defaule: true
		*	`enableDamping` {boolean} defaule: true
		*	`lightOn` {boolean} defaule: true
	## return
	*	{
			scene:scene
			,camera:camera
			,renderer:renderer
		}
	*/
	vt.base3DshowStateInitial = function(options)
	{
		var renderer = new THREE.WebGLRenderer({
			canvas:document.getElementById(options.canvasid)
		});
		var background = options.backgroud||"#FFFFFF";
		renderer.setClearColor(background,1);
		var scene = new THREE.Scene();	
		var viwerate = options.canvaswidth/options.canvasheight;
		var viwefar = options.modelboxsize*10
		var camera = new THREE.PerspectiveCamera(60,viwerate,0.1,viwefar)
		camera.position.set(options.modelboxsize
			,options.modelboxsize
			,options.modelboxsize*2);
		//set poitlight
		var lightOn = options.lightOn||true;
		if(lightOn){
			var distance = options.modelboxsize*2;
			var x = distance;
			var y = distance;
			var z = distance;
			for(var i = 0;i<8;i++){
				var light = new THREE.PointLight( 0x404040 ,2);
				
				x = -x;
				if(i%2 == 0){
					y = -y;
				}
				if(i%4 ==0){
					z = -z;
				}
				console.log(x,y,z);
				light.position.set(x,y,z);
				scene.add(light)
			}
		}
		//set camera control
		var controls = new THREE.OrbitControls(camera,renderer.domElement);
		controls.dampingFactor = options.dampingFactor||0.7;
		controls.enableZoom = true;
		controls.autoRotate = true;
		controls.enableDamping = true;
		if (options.enableZoom === false) {
			controls.enableZoom = options.enableZoom;
		}
		if (options.autoRotate === false) {
			controls.autoRotate = options.autoRotate;
		}
		if (options.enableDamping === false) {
			controls.enableDamping = options.enableDamping;
		}
		
		//set axisHelper
		if(options.axisHelper){
			var axisHelper = new THREE.AxisHelper( options.modelboxsize*10 );
			scene.add( axisHelper );
		}

		//set animationframe
		 window.requestAnimationFrame = window.requestAnimationFrame 
		         || window.mozRequestAnimationFrame
		         || window.webkitRequestAnimationFrame
		         || window.msRequestAnimationFrame;
		 function render()
		 {
		 		
		 		controls.update(); 
		 		renderer.render(scene, camera);//rendering
		 		
				requestAnimationFrame(render);
		 }
		 render();


		return {
			scene:scene
			,camera:camera
			,renderer:renderer
		}
	}


})(window)