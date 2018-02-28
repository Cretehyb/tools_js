//js数据类型判断
function type(target){
		var template = {
			"[object Array]" = "array",
			"[object Object]" = "object",
			"[object Number]" = "number - object",
			"[object Boolean]" = "boolean - object",
			"[object String]" = "string - object"
		}
		if(target == null){
			return "null";
		}
		if(typeof(target) == "object"){
			var str = Object.prototype.toString.call(target);
			return template[str];
		}else{
			return typeof(target);
		}
	}



//浅度拷贝
function clone(origin,target){
			var target = target || {}；
			for(var prop in origin){
				target[prop] = origin[prop];
			}
			return target;
		}



//深度拷贝
		function deepClone(origin,target){

			var target = target || {},
				toStr = Object.prototype.toString,
				arrStr ="[object Array]";

			for(var prop in origin){
				if(origin.hasOwnProperty(prop)){

					if (typeof(origin[prop])=='object'&&origin[prop]!=='null') {

						// if(toStr.call(origin[prop]) == arrStr){
						// 	target[prop] = [];
						// }else{
						// 	target[prop] = {};
						// }
						target[prop]=(toStr.call(origin[prop]) == arrStr) ? [] : {};
						
						deepClone(origin[prop],target[prop]);

					}else{
						target[prop] = origin[prop];
					}
				}
			}
			return target；	
		}

//数组去重



//添加事件
function addEvent(obj,type,fn){//obj目标对象,type事件类型,fn函数回调
    if(typeof obj.addEventListener!=='undefined'){//W3C 标准
        obj.addEventListener(type,fn,false);//type事件名称,fn执行函数,false捕获
    }else if(typeof obj.attachEvent!=='undefined'){//IE
        obj.attachEvent('on'+type,fn);
        fn.call(obj,window.event);//对象冒充
        
    }   
}


//删除事件
function removeEvent(obj,type,fn){
    if(typeof obj.removeEventListener!=='undefined'){
        obj.removeEventListener(type,fn,false);
    }else if(typeof obj.detachEvent!=='undefined'){
        obj.detachEvent('on'+type);
    }
}

//阻止默认事件(跨浏览器)
function preDef(event){
    var e=getEvent(event);
    if(typeof e.preventDefault!=='undefined'){//W3C标准
        e.preventDefault();
    }else{//IE
        e.returnValue=false;
    }
}







