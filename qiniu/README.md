##   INTRO   
*   improve qiniu SDK.

* rely on [qiniu.js](https://github.com/iwillwen/qiniu.js/tree/develop)

* data: Wed Oct 12 2016 16:23:46 GMT+0800

## author info
*	`Vincent Lau`
* 	`mrliuyiman@foxmail.com`
*	`Guangzhou,China`

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

## example 
    vin.qiniuInitialize({
				uptoken:result.uptoken
				,domains:"http://mydomains.bkt.clouddn.com/"
				,button:document.getElementById('mybutton')
				,before:function(name,file){
					var beforeReturn = {};
					beforeReturn.name = new Date().getTime();
					beforeReturn.file = "what you want to do with upload file";
					return beforeReturn;					
				}
				,success:function(reply){
					//any things you want to do when uploading succeeded
				    var sourceLink = domains
				    	+reply.key;
				}
				,error:function(err){
					//any things you want to do when uploading failed			
				}
			});