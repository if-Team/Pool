/*
 * Copyright 2015 if(Team);
 * 
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 *     http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

"use strict";

/**
 * @since 2015-02-24
 * @author ChalkPE <amato0617@gmail.com>
 * @file Common utilized library for ModPE
 * @namespace
 */
var Pool = {};

/**
 * @since 2015-02-24
 * @author ChalkPE <amato0617@gmail.com>
 * @constant
 */
Pool.VERSION = "0.1";

//Pool.SubPackage.someMethod
//Pool.Constructor


/**
 * 서브 모듈을 불러옵니다
 * 
 * @since 2015-02-26 (API 1)
 * @author onebone <jyc0410@naver.com>
 * @author ChalkPE <amato0617@gmail.com>
 * @param {String|File} path 서브 모듈이 저장된 소스 파일의 경로 및 파일 객체
 */
Pool.load = function(path){
	var content = Pool.IO.readAllLines(path);
	try{
		eval(content);
	}catch(e){
		Pool.showError(e);
	}
};


/**
 * @since 2015-02-26 (API 1)
 * @author onebone <jyc0410@naver.com>
 * @return {Number}
 */
Pool.getApiVersion = function(){
	return 1;
}

/**
 * 에러를 출력합니다
 * 
 * @since 2015-02-26 (API 1)
 * @author ChalkPE <amato0617@gmail.com>
 * @param {Error} error 출력할 에러
 */
Pool.showError = function(error){
	clientMessage(error.name + ": " + error.message + " at line " + error.lineNumber + "\n" + error.stack);
};





/**
 * 2차원 좌표의 래퍼 클래스입니다
 * 
 * @since 2015-02-26 (API 1)
 * @author IchiKaku <woni8708@naver.com>
 * @class
 */
Pool.Vector2 = function(x, z){
	this.x = Math.floor(x);
	this.z = Math.floor(z);
};

/**
 * @since 2015-02-26 (API 1)
 * @author IchiKaku <woni8708@naver.com>
 */
Pool.Vector2.prototype = {};

/**
 * 주어진 좌표와 동일한 객체인지 비교합니다
 * 
 * @since 2015-02-26 (API 1)
 * @author IchiKaku <woni8708@naver.com>
 * @param {Number|Pool.Vector2} x
 * @param {Number} y
 * @return {Boolean} 동일 여부
 */
Pool.Vector2.prototype.equals = function(x, z){
	if(x instanceof Pool.Vector2 && arguments.length === 1){
		return x.x === this.x && x.z === this.z;
	}
	return Math.floor(x) === this.x && Math.floor(z) === this.z;
};

/**
 * 좌표의 문자열 표현을 구합니다
 * 
 * @since 2015-02-26 (API 1)
 * @author IchiKaku <woni8708@naver.com>
 * @return {String} 좌표의 문자열 표현
 */
Pool.Vector2.prototype.toString = function(){
	return "[" + [this.x, this.z].join(", ") + "]";
};

/**
 * 좌표의 배열을 구합니다
 * 
 * @since 2015-02-26 (API 1)
 * @author affogatoman <colombia2@naver.com>
 * @return {Array}
 */
Pool.Vector2.prototype.toArray = function(){
	return [this.x, this.z];
};

/**
 * 좌표를 변경합니다
 * 
 * @since 2015-02-26 (API 1)
 * @author IchiKaku <woni8708@naver.com>
 * @param {Number} [x] - 생략할 경우 변경하지 않습니다
 * @param {Number} [z] - 생략할 경우 변경하지 않습니다
 */
Pool.Vector2.prototype.set = function(x, z){
	if(typeof x === "number"){
		this.x = Math.floor(x);
	}
	if(typeof z === "number"){
		this.z = Math.floor(z);
	}
};





/**
 * 3차원 좌표의 래퍼 클래스입니다
 * 
 * @since 2015-02-24 (API 1)
 * @author ChalkPE <amato0617@gmail.com>
 * @class
 */
Pool.Vector3 = function(x, y, z){
	this.x = Math.floor(x);
	this.y = Math.floor(y);
	this.z = Math.floor(z);
};

/**
 * @since 2015-02-24 (API 1)
 * @author ChalkPE <amato0617@gmail.com>
 */
Pool.Vector3.prototype = {};

/**
 * 주어진 좌표와 동일한 객체인지 비교합니다
 * 
 * @since 2015-02-24 (API 1)
 * @author ChalkPE <amato0617@gmail.com>
 * @param {Number|Pool.Vector2} x
 * @param {Number} y
 * @param {Number} z
 * @return {Boolean} 동일 여부
 */
Pool.Vector3.prototype.equals = function(x, y, z){
	if(x instanceof Pool.Vector3 && arguments.length === 1){
		return x.x === this.x && x.y === this.y && x.z === this.z
	}
	return Math.floor(x) === this.x && Math.floor(y) === this.y && Math.floor(z) === this.z;
};

/**
 * 좌표의 문자열 표현을 구합니다
 * 
 * @since 2015-02-24 (API 1)
 * @author ChalkPE <amato0617@gmail.com>
 * @return {String} 좌표의 문자열 표현
 */
Pool.Vector3.prototype.toString = function(){
	return "[" + [this.x, this.y, this.z].join(", ") + "]";
};

/**
 * 좌표의 배열을 구합니다
 * 
 * @since 2015-02-26 (API 1)
 * @author affogatoman <colombia2@naver.com>
 * @return {Array}
 */
Pool.Vector3.prototype.toArray = function(){
	return [this.x, this.y, this.z];
};

/**
 * 좌표를 변경합니다
 * 
 * @since 2015-02-24 (API 1)
 * @author ChalkPE <amato0617@gmail.com>
 * @param {Number} [x] - 생략할 경우 변경하지 않습니다
 * @param {Number} [y] - 생략할 경우 변경하지 않습니다
 * @param {Number} [z] - 생략할 경우 변경하지 않습니다
 */
Pool.Vector3.prototype.set = function(x, y, z){
	if(typeof x === "number"){
		this.x = Math.floor(x);
	}
	if(typeof y === "number"){
		this.y = Math.floor(y);
	}
	if(typeof z === "number"){
		this.z = Math.floor(z);
	}
};

/**
<<<<<<< HEAD
 * 다른 좌표와의 거리를 구합니다
 * 
 * @since 2015-02-26 (API 1)
 * @author IchiKaku <woni8708@naver.com>
 * @param {Pool.Vector3} vec3
 * @return {Number} 자신과 vec3 사이의 거리
 */
Pool.Vector3.prototype.getDistance = function(vec3){
	return Math.hypot(this.x - vec3.x, this.y - vec3.y, this.z - vec3.z);
};





/**
 * @since 2015-02-24 (API 1)
 * @author ChalkPE <amato0617@gmail.com>
 * @namespace
 */
Pool.Canvas = {};

/**
 * 두 좌표를 잇는 선을 그립니다
 * 
 * @since 2015-02-24 (API 1)
 * @author ChalkPE <amato0617@gmail.com>
 * @param {Pool.Vector3} begin - 시작점의 좌표
 * @param {Pool.Vector3} end - 종료점의 좌표
 * @param {Number} blockId - 선을 이룰 블럭의 ID 값
 * @param {Number} blockDamage - 선을 이룰 블럭의 데미지 값
 * @see Bresenham's line algorithm
 */
Pool.Canvas.drawLine = function(begin, end, blockId, blockDamage){
	function drawLine2D(x0, y0, x1, y1, height, blockId, blockDamage){
	    var dx = Math.abs(x1 - x0);
	    var dy = Math.abs(y1 - y0);
	    var sx = (x0 < x1) ? 1 : -1;
	    var sy = (y0 < y1) ? 1 : -1;
	    var err = dx - dy;
	    
	    while(true){
	        Level.setTile(x0, height, y0, blockId, blockDamage);
	        
	        if((x0 == x1) && (y0 == y1)){
	            break;
	        }
	        var e2 = 2 * err;
	        if(e2 > -dy){
	            err -= dy;
	            x0 += sx;
	        }
	        if(e2 < dx){
	            err += dx;
	            y0 += sy;
	        }
	    }
	}

	function drawLine3D(x0, y0, z0, x1, y1, z1, blockId, blockDamage){
	    var x0i = Math.floor(x0);
	    var y0i = Math.floor(y0);
	    var z0i = Math.floor(z0);
	    
	    var x1i = Math.floor(x1);
	    var y1i = Math.floor(y1);
	    var z1i = Math.floor(z1);
	    
	    var sx = (x1i > x0i) ? 1 : (x1i < x0i) ? -1 : 0;
	    var sy = (y1i > y0i) ? 1 : (y1i < y0i) ? -1 : 0;
	    var sz = (z1i > z0i) ? 1 : (z1i < z0i) ? -1 : 0;
	    
	    var x = x0i;
	    var y = y0i;
	    var z = z0i;
	    
	    var xp = x0i + (x1i > x0i ? 1 : 0);
	    var yp = y0i + (y1i > y0i ? 1 : 0);
	    var zp = z0i + (z1i > z0i ? 1 : 0);
	    
	    var vx = (x1 === x0) ? 1 : x1 - x0;
	    var vy = (y1 === y0) ? 1 : y1 - y0;
	    var vz = (z1 === z0) ? 1 : z1 - z0;
	    
	    var vxvy = vx * vy;
	    var vxvz = vx * vz;
	    var vyvz = vy * vz;
	    
	    var errx = (xp - x0) * vyvz;
	    var erry = (yp - y0) * vxvz;
	    var errz = (zp - z0) * vxvy;
	    
	    var derrx = sx * vyvz;
	    var derry = sy * vxvz;
	    var derrz = sz * vxvy;

	    do{
	        Level.setTile(x, y, z, blockId, blockDamage);
	        
	        if(x === x1i && y === y1i && z === z1i){
	            break;
	        }
	        
	        var xr = Math.abs(errx);
	        var yr = Math.abs(erry);
	        var zr = Math.abs(errz);
	        
	        if(sx !== 0 && (sy === 0 || xr < yr) && (sz === 0 || xr < zr)){
	            x += sx;
	            errx += derrx;
	        }else if(sy !== 0 && (sz === 0 || yr < zr)){
	            y += sy;
	            erry += derry;
	        }else if(sz !== 0){
	            z += sz;
	            errz += derrz;
	        }
	    }while(true);
	}
	
	if(begin.equals(end)){ //Point
		Level.setTile(begin.x, begin.y, begin.z, blockId, blockDamage);
	}else if(begin.x === end.x){
		drawLine2D(begin.y, begin.z, end.y, end.z, begin.x, blockId, blockDamage);
	}else if(begin.y === end.y){
		drawLine2D(begin.x, begin.z, end.x, end.z, begin.y, blockId, blockDamage);
	}else if(begin.z === end.z){
		drawLine2D(begin.x, begin.y, end.x, end.y, begin.z, blockId, blockDamage);
	}else{
		drawLine3D(begin.x, begin.y, begin.z, end.x, end.y, end.z, blockId, blockDamage);
	}
};

/**
 * 주어진 좌표를 중심으로 원을 그립니다
 * 
 * @since 2015-02-24 (API 1)
 * @author ChalkPE <amato0617@gmail.com>
 * @author IchiKaku <woni8708@naver.com>
 * @param {Pool.Vector3} center - 원의 중심점의 좌표
 * @param {Number} radius - 원의 반지름
 * @param {Number} blockId - 원을 이룰 블럭의 ID 값
 * @param {Number} blockDamage - 원을 이룰 블럭의 데미지 값
 */
Pool.Canvas.drawCircle = function(center, radius, blockId, blockDamage){
	for(var a = 0; a <= 360; a += 0.1){
   		var x = java.lang.Math.cos(java.lang.Math.toRadians(a)) * radius;
    	var z = java.lang.Math.sin(java.lang.Math.toRadians(a)) * radius;
    	
		Level.setTile(center.x + x, center.y, center.z + z, blockId, blockDamage);
	}
};





/**
 * @since 2015-02-26 (API 1)
 * @author Choseul <chocoslime05@naver.com>
 * @namespace
 */
Pool.IO = {};


/**
 * 문자열을 파일에 저장합니다
 * 
 * @since 2015-02-26 (API 1)
 * @author affogatoman <colombia2@naver.com>
 * @param {String|File} path - 문자열을 저장할 파일의 경로 및 파일 객체
 */
Pool.IO.saveFile = function(path, str){
	try{
		var file = path;
		if(path instanceof String){
			file = new java.io.File(path);
		}
		file.getParentFile().mkdirs();
		
		var bw = new java.io.BufferedWriter(new java.io.FileWriter(file));
		bw.write(str);
		bw.close();
	}catch(e){
		Pool.showError(e);
	}
};

/**
 * 파일에서 문자열을 읽어옵니다
 * 
 * @since 2015-02-26 (API 1)
 * @author onebone <jyc0410@naver.com>
 * @param {String|File} path - 문자열을 읽을 파일의 경로 및 파일 객체
 * @return {String} 파일 내의 문자열
 */
Pool.IO.readAllLines = function(path){
	try{
		var file = path;
		if(path instanceof String){
			file = new java.io.File(path);
		}
		
		if(!file.exists()){
			return null;
		}
		
		var br = new java.io.BufferedReader(java.io.FileReader(file));
		var sb = new java.lang.StringBuffer();
		
		var tmp;
		while((tmp = br.readLine()) !== null){
			sb.append(tmp);
			sb.append("\n");
		}
		
		return sb.toString() + "";
	}catch(e){
		Pool.showError(e);
		return null;
	}
};

/**
 * 주어진 파일을 삭제합니다
 * 
 * @since 2015-02-26 (API 1)
 * @author ChalkPE <amato0617@gmail.com>
 * @param {String|File} path - 삭제할 파일의 경로 및 파일 객체
 * @return {Boolean} 파일 삭제 성공 여부
 */
Pool.IO.removeFile = function(path){
	try{
		var file = path;
		if(path instanceof String){
			file = new java.io.File(path);
		}
		return file["delete"](); //delete가 자바스크립트 키워드라...
	}catch(e){
		Pool.showError(e);
		return false;
	}
};





/**
 * @since 2015-02-26 (API 1)
 * @author netherTNT <canghaun@naver.com>
 * @namespace
 */
Pool.Entity = {};

/**
 * 주어진 범위 내에 있는 모든 엔티티를 구합니다
 * 
 * @since 2015-02-26 (API 1)
 * @author netherTNT <canghaun@naver.com>
 * @param {Number} range
 * @param {Number} [baseEntity = Player.getEntity()] - 범위의 중심이 되는 엔티티의 엔티티 아이디
 * @returns {Array} 범위 내의 모든 엔티티
 */
Pool.Entity.getEntitiesInRange = function(range, baseEntity){
	if(baseEntity === null || typeof baseEntity === "undefined" || baseEntity < 0){
		baseEntity = Player.getEntity();
	}
	
    return Entity.getAll().filter(function(ent){
        return Math.hypot(Player.getX() - Entity.getX(ent), Player.getY() - Entity.getY(ent), Player.getZ() - Entity.getZ(ent)) < range;
    });
};





/**
 * @since 2015-02-26 (API 1)
 * @author affogatoman <colombia2@naver.com>
 * @author IchiKaku <woni8708@naver.com>
 * @namespace
 */
Pool.Map = {};

/**
 * 주어진 평면 좌표에서 가장 높은 곳에 있는 블럭의 좌표를 구합니다
 * 
 * @since 2015-02-26 (API 1)
 * @author affogatoman <colombia2@naver.com>
 * @param {Pool.Vector2} vec2 - 중심이 되는 블럭의 평면적 좌표
 * @return {Pool.Vector3} 가장 높은 곳에 있는 블럭의 좌표
 */
Pool.Map.getHighestVector = function(vec2){
	for(var y = 128; y >= 0; y--){
		if(Level.getTile(vec2.x, y, vec2.z) > 0){
			return new Pool.Vector3(vec2.x, y, vec2.z);
		}
	}
	return null;
};





/**
 * @since 2015-02-26 (API 1)
 * @author ChalkPE <amato0617@gmail.com>
 * @memberof Math
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/hypot
 */
Math.hypot = Math.hypot || function(){
	var y = 0;
	for(var i = 0; i < arguments.length; i++){
		if(arguments[i] === Infinity || arguments[i] === -Infinity){
			return Infinity;
		}
		y += arguments[i] * arguments[i];
	}
	return Math.sqrt(y);
};


/**
 * @since 2015-02-26 (API 1)
 * @author onebone <jyc0410@naver.com>
 */
 Pool.Utils = {};
 
 
 /**
  * @since 2015-02-26 (API 1)
  * @author onebone <jyc0410@naver.com>
  * @param path{String | java.io.File} 파일의 경로
  */
Pool.Utils.loadScript = function(path){
	var file = path;
	
	if(file instanceof String){
		file = new java.io.File(file);
	}
	
	try{
		net.zhuoweizhang.mcpelauncher.ScriptManager.loadScript(file);
	}catch(e){
		Pool.showError(e);
	}
};

/**
 * @since 2015-02-26 (API 1)
 * @author onebone <jyc0410@naver.com>
 * @param functionName {String} 함수의 이름
 * @param args {object...} 이벤트 호출 시 인자
 */
Pool.Utils.launchEvent = function(functionName){
	net.zhuoweizhang.mcpelauncher.ScriptManager.callScriptMethod(functionName, arguments);
}





/**
 * 맵에 입장할 때 라이브러리를 등록합니다
 * 
 * @since 2015-02-24
 * @author ChalkPE <amato0617@gmail.com>
 */
function selectLevelHook(){
	var scripts = net.zhuoweizhang.mcpelauncher.ScriptManager.scripts;
    var ScriptableObject = org.mozilla.javascript.ScriptableObject;
    
	for(var i = 0; i < scripts.size(); i++) {
		var scope = scripts.get(i).scope;
		if(!ScriptableObject.hasProperty(scope, "Pool")){
			ScriptableObject.putProperty(scope, "Pool", Pool);
		}
	}
}
