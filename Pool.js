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
 * @since 2015-02-24 (API 1)
 * @author ChalkPE <amato0617@gmail.com>
 * @file Common utilized library for ModPE
 * @copyright 2015 if(Team);
 * @license Apache-2.0
 * @namespace
 */
var Pool = {};

/**
 * @since 2015-02-24 (API 1)
 * @author ChalkPE <amato0617@gmail.com>
 * @constant
 */
Pool.VERSION = "0.1";





/**
 * 엔티티 아이디
 * @typedef {Number} EntityId
 */

/**
 * 엔티티 타입 아이디
 * @typedef {Number} EntityTypeId
 * @example Cow: 11, Zombie: 32
 */





/* --------------------------- README ---------------------------
 * 코드를 작성하기 전에 아래 내용을 꼭 숙지하시기 바랍니다.
 * 
 * 1. 작성한 코드에는 반드시 JSDoc 형식의 주석을 달아야 합니다.
 *    - 필수 태그는 @since, @author입니다.
 *    - 설명은 한국어, 존댓말로 작성해 주시고, XX합니다로 문장을 끝내 주세요.
 *    - 메서드의 설명은 아래 규칙을 따라 주세요.
 *      * getXXX : XXX를 구합니다
 *      * setXXX : XXX를 설정합니다
 *      * isXXX : XXX인지 확인합니다
 *    
 * 2. 다른 사람이 작성한 코드를 편집하기 전 작성자와 상의해 주세요.
 *    - 코드를 많이 수정했다면 @author 태그에 자신을 추가하세요.
 *    
 * 3. 새로운 객체를 추가할 때에는 적절한 위치에 작성해 주세요.
 *    - 생성자 : Pool.Constructor
 *    - 메서드 : Pool.SubPackage.someMethod
 * 
 * 4. 클래스나 네임스페이스의 경계에는 다섯 줄의 간격을 유지해 주세요.
 *    - 같은 클래스나 네임스페이스의 멤버들의 경계에는 한 줄의 간격을 유지해 주세요.
 * 
 * 5. 클래스나 네임스페이스에는 PascalCase를 사용해 주시고, 메서드나 프로퍼티에는 camelCase를 사용해 주세요.
 * 
 * 6. K&R 코드 스타일을 사용해 주세요.
 * 
 * 7. catch 블럭의 오류 객체의 이름은 e이며, 오류 메세지는 영어로 작성해 주세요.
 * 
 * 8. for each 문이나 with 문은 사용하지 마시고, ABC.delete()는 ABC["delete"]()로 바꿔 주세요.
 * 
 * 9. ModPE 메서드의 경우 OOP 메서드를 사용해 주세요.
 *    - bl_spawnMob -> Level.spawnMob, setTile -> Level.setTile, getPlayerEnt -> Player.getEntity 등
 * --------------------------------------------------------------
 */





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
};

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
 * @author ChalkPE <amato0617@gmail.com>
 * @class
 */
Pool.Vector2 = function(x, z){
	if(typeof x !== "number" || isNaN(x) || typeof y !== "number" || isNaN(y) || typeof z !== "number" || isNaN(z)){
		throw new Error("argument must be a number");
	}
	
	this.x = Math.floor(x);
	this.z = Math.floor(z);
};

/**
 * @since 2015-02-26 (API 1)
 * @author IchiKaku <woni8708@naver.com>
 */
Pool.Vector2.prototype = {};

/**
 * 주어진 평면 좌표와 동일한 객체인지 비교합니다
 * 
 * @since 2015-02-26 (API 1)
 * @author IchiKaku <woni8708@naver.com>
 * @param {Number|Pool.Vector2} x
 * @param {Number} z
 * @return {Boolean} 동일 여부
 */
Pool.Vector2.prototype.equals = function(x, z){
	if(x instanceof Pool.Vector2){
		return x.x === this.x && x.z === this.z;
	}
	return Math.floor(x) === this.x && Math.floor(z) === this.z;
};

/**
 * 평면 좌표의 문자열 표현을 구합니다
 * 
 * @since 2015-02-26 (API 1)
 * @author IchiKaku <woni8708@naver.com>
 * @return {String} 좌표의 문자열 표현
 */
Pool.Vector2.prototype.toString = function(){
	return "[" + [this.x, this.z].join(", ") + "]";
};

/**
 * 평면 좌표의 배열을 구합니다
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
	if(typeof x === "number" && !isNaN(x)){
		this.x = Math.floor(x);
	}
	if(typeof z === "number" && !isNaN(z)){
		this.z = Math.floor(z);
	}
};

/**
 * 다른 평면 좌표와의 거리를 구합니다
 * 
 * @since 2015-02-26 (API 1)
 * @author ChalkPE <amato0617@gmail.com>
 * @param {Pool.Vector2} vec2
 * @return {Number} 자신과 vec2 사이의 거리
 */
Pool.Vector2.prototype.getDistance = function(vec2){
	if(!(vec2 instanceof Pool.Vector2)){
		throw new Error("argument must be a Vector2");
	}
	return Math.hypot(this.x - vec2.x, this.z - vec2.z);
};





/**
 * 3차원 좌표의 래퍼 클래스입니다
 * 
 * @since 2015-02-24 (API 1)
 * @author ChalkPE <amato0617@gmail.com>
 * @class
 */
Pool.Vector3 = function(x, y, z){
	if(typeof x !== "number" || isNaN(x) || typeof y !== "number" || isNaN(y) || typeof z !== "number" || isNaN(z)){
		throw new Error("argument must be a number");
	}
	
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
 * 주어진 입체 좌표와 동일한 객체인지 비교합니다
 * 
 * @since 2015-02-24 (API 1)
 * @author ChalkPE <amato0617@gmail.com>
 * @param {Number|Pool.Vector3} x
 * @param {Number} y
 * @param {Number} z
 * @return {Boolean} 동일 여부
 */
Pool.Vector3.prototype.equals = function(x, y, z){
	if(x instanceof Pool.Vector3){
		return x.x === this.x && x.y === this.y && x.z === this.z
	}
	return Math.floor(x) === this.x && Math.floor(y) === this.y && Math.floor(z) === this.z;
};

/**
 * 입체 좌표의 문자열 표현을 구합니다
 * 
 * @since 2015-02-24 (API 1)
 * @author ChalkPE <amato0617@gmail.com>
 * @return {String} 좌표의 문자열 표현
 */
Pool.Vector3.prototype.toString = function(){
	return "[" + [this.x, this.y, this.z].join(", ") + "]";
};

/**
 * 입체 좌표의 배열을 구합니다
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
	if(typeof x === "number" && !isNaN(x)){
		this.x = Math.floor(x);
	}
	if(typeof y === "number" && !isNaN(y)){
		this.y = Math.floor(y);
	}
	if(typeof z === "number" && !isNaN(z)){
		this.z = Math.floor(z);
	}
};

/**
 * 다른 입체 좌표와의 거리를 구합니다
 * 
 * @since 2015-02-26 (API 1)
 * @author IchiKaku <woni8708@naver.com>
 * @param {Pool.Vector3} vec3
 * @return {Number} 자신과 vec3 사이의 거리
 */
Pool.Vector3.prototype.getDistance = function(vec3){
	if(!(vec3 instanceof Pool.Vector3)){
		throw new Error("argument must be a Vector3");
	}
	return Math.hypot(this.x - vec3.x, this.y - vec3.y, this.z - vec3.z);
};

/**
 * 좌표에 대하여 더합니다
 *
 * @since 2015-02-26 (API 1)
 * @author onebone <jyc0410@naver.com>
 * @param {Number|Pool.Vector3} x
 * @param {Number} y
 * @param {Number} z
 * @return {Pool.Vector3} 결과 값
 */
Pool.Vector3.prototype.add = function(x, y, z){
	if(x instanceof  Pool.Vector3){
		return new Pool.Vector3(this.x + x.x, this.y + x.y, this.z + x.z);
	}
	return new Pool.Vector3(this.x + x, this.y + y, this.z + z);
};

/**
 * 좌표에 대하여 뺍니다
 * 
 * @since 2015-02-26 (API 1)
 * @author onebone <jyc0410@naver.com>
 * @param {Number|Pool.Vector3} x
 * @param {Number} y
 * @param {Number} z
 * @return {Pool.Vector3} 결과 값
*/
Pool.Vector3.prototype.subtract = function(x, y, z){
	if(x instanceof Pool.Vector3){
		return new Pool.Vector3(this.x - x.x, this.y - x.y, this.z - x.z);
	}
	return new Pool.Vector3(this.x - x, this.y - y, this.z - z);
};

/**
 * 좌표에 있는 엔티티들을 구합니다
 * @since 2015-02-26 (API 1)
 * @author ChalkPE <amato0617@gmail.com>
 * @returns {Array} 이 좌표에 있는 엔티티들의 엔티티 아이디의 배열
 *
 */
Pool.Vector3.prototype.getEntities = function(){
    var that = this;
    return Entity.getAll().filter(function(ent){
        return that.equals(new Pool.Entity(ent).getVector());
    });
};





/**
 * @since 2015-02-24 (API 1)
 * @author ChalkPE <amato0617@gmail.com>
 * @namespace
 */
Pool.Canvas = {};

/**
 * 두 입체 좌표를 잇는 선을 그립니다
 * 
 * @since 2015-02-24 (API 1)
 * @author ChalkPE <amato0617@gmail.com>
 * @param {Pool.Vector3} begin - 시작점의 좌표
 * @param {Pool.Vector3} end - 종료점의 좌표
 * @param {Number} blockId - 선을 이룰 블럭의 ID 값
 * @param {Number} blockDamage - 선을 이룰 블럭의 데미지 값
 * @see Bresenham's line algorithm
 * @todo 반복문을 빠져나오지 못하는 오류 해결
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
 * 주어진 입체 좌표를 중심으로 원을 그립니다
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
	var a = 0;
	var b = radius;
	var p = 1 - radius;
	
	var x = center.x;
	var z = center.z;
	
	do{
		Level.setTile(x + a, y, z + b, blockId, blbloclDamage);
		Level.setTile(x + b, y, z + a, blockId, blbloclDamage);
		Level.setTile(x - a, y, z + b, blockId, blbloclDamage);
		Level.setTile(x - b, y, z + a, blockId, blbloclDamage);
		Level.setTile(x + a, y, z - b, blockId, blbloclDamage);
		Level.setTile(x + b, y, z - a, blockId, blbloclDamage);
		Level.setTile(x - a, y, z - b, blockId, blbloclDamage);
		Level.setTile(x - b, y, z - a, blockId, blbloclDamage);
		
		if(p < 0){
			p += 3 + 2 * a++;
		}else{
			p += 5 + 2 * (a++ - b--);
		}
		
	}while(a <= b);
};

/**
 * 주어진 좌표를 중심으로 타원을 그립니다
 * 
 * @since 2015-02-24 (API 1)
 * @author affogatoman <colombia2@naver.com>
 * @param {Pool.Vector3} center - 타원의 중심점의 좌표
 * @param {Number} width - 타원의 가로 길이
 * @param {Number} height - 타원의 세로 길이
 * @param {Number} blockId - 타원을 이룰 블럭의 ID 값
 * @param {Number} blockDamage - 타원을 이룰 블럭의 데미지 값
 */
Pool.Canvas.drawEllipse = function(center, width, height, blockId, blockDamage){
	for(var a = 0; a <= 360; a++){
   		var x = java.lang.Math.cos(java.lang.Math.toRadians(a)) * width / 2;
    	var z = java.lang.Math.sin(java.lang.Math.toRadians(a)) * height / 2;
    	
		Level.setTile(center.x + Math.floor(x), center.y, center.z + Math.floor(z), blockId, blockDamage);
	}
};





/**
 * @since 2015-02-26 (API 1)
 * @author Choseul <chocoslime05@naver.com>
 * @namespace
 */
Pool.IO = {};

/**
 * 문자열을 파일이나 OutputStream 및 Writer에 저장합니다
 * 
 * @since 2015-02-26 (API 1)
 * @author affogatoman <colombia2@naver.com>
 * @author ChalkPE <amato0617@gmail.com>
 * @param {String|File|OutputStream|Writer} path - 문자열을 저장할 파일의 경로 및 파일 객체, OutputStream 및 Writer
 * @param {String} str - 문자열을 저장할 파일의 경로 및 파일 객체
 */
Pool.IO.saveAllLines = function(path, str){
	try{
		var file = null;
		var bw = null;
		
		if(path instanceof java.io.File){
			file = path;
		}else if(path instanceof String){
			file = new java.io.File(path);
		}else if(path instanceof java.io.OutputStream){
			file = null;
			bw = new java.io.BufferedWriter(new java.io.FileWriter(new java.io.OutputStreamWriter(file)));
		}else if(path instanceof java.io.Writer){
			bw = path;
		}else{
			throw new Error("Illegal argument type");
		}
		
		if(file !== null){
			file.getParentFile().mkdirs();
		}
		if(bw === null){
			bw = new java.io.BufferedWriter(new java.io.FileWriter(file));
		}
		
		bw.write(str);
		bw.close();
	}catch(e){
		Pool.showError(e);
	}
};

/**
 * 파일이나 InputStream 및 BufferedReader에서 문자열을 읽어옵니다
 * 
 * @since 2015-02-26 (API 1)
 * @author onebone <jyc0410@naver.com>
 * @author ChalkPE <amato0617@gmail.com>
 * @param {String|File|InputStream|BufferedReader} path - 문자열을 읽을 파일의 경로 및 파일 객체, InputStream 및 BufferedReader
 * @return {String} 파일 내의 문자열
 */
Pool.IO.readAllLines = function(path){
	try{
		var file = null;
		var br = null;
		
		if(path instanceof java.io.File){
			file = path;
		}else if(path instanceof String){
			file = new java.io.File(path);
		}else if(path instanceof java.io.InputStream){
			file = null;
			br = new java.io.BufferedReader(new java.io.FileReader(new java.io.InputStreamReader(file)));
		}else if(path instanceof java.io.BufferedReader){
			br = path;
		}else{
			throw new Error("Illegal argument type");
		}
		
		if(file !== null && !file.exists()){
			return null;
		}
		if(br === null){
			new java.io.BufferedReader(new java.io.FileReader(file));
		}
		
		var tmp = null, sb = new java.lang.StringBuffer();
		while((tmp = br.readLine()) !== null){
			sb.append(tmp);
			sb.append("\n");
		}
		
		br.close();
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
		var file = null;
		if(path instanceof java.io.File){
			file = path;
		}else if(path instanceof String){
			file = new java.io.File(path);
		}else{
			throw new Error("Illegal argument type");
		}
		
		return file["delete"](); //delete가 자바스크립트 키워드라...
	}catch(e){
		Pool.showError(e);
		return false;
	}
};

/**
 * 주어진 파일이나 스트림을 다른 곳으로 복사합니다
 *
 * @since 2015-02-26 (API 1)
 * @author onebone <jyc0410@naver.com>
 * @author ChalkPE <amato0617@gmail.com>
 * @param {String|File|InputStream} source - 원본 파일의 경로 혹은 파일 객체 및 InputStream
 * @param {String|File} target - 복사될 파일의 경로 혹은 파일 객체
 * @param {Boolean} deleteSourceAfterCopy - 복사 후 원본 파일을 삭제할 지의 여부
 * @return {Boolean} 파일 복사 성공 여부
 */
Pool.IO.copyFile = function(source, target, deleteSourceAfterCopy){
	try{
		var file = null;
		var bis = null;
		
		if(source instanceof java.io.File){
			file = source;
		}else if(source instanceof String){
			file = new java.io.File(source);
		}else if(source instanceof java.io.InputStream){
			bis = new java.io.BufferedInputStream(source);
		}else{
			throw new Error("Illegal argument type");
		}
		
		if(file !== null && !file.exists()){
			return false;
		}
		
		if(target instanceof java.io.File){
			target = target;
		}else if(target instanceof String){
			target = new java.io.File(target);
		}else{
			throw new Error("Illegal argument type");
		}
		
		target.getParentFile().mkdirs();
		
		if(bis === null){
			bis = new java.io.BufferedInputStream(new java.io.FileInputStream(file));
		}
		var bos = new java.io.BufferedOutputStream(new java.io.FileOutputStream(target));
		
		var buf = java.lang.reflect.Array.newInstance(java.lang.Byte.TYPE, 4096);
		var count = 0;
		
		while((count = bis.read(buf)) >= 0){
			bos.write(buf, 0, count);
		}
		
		bis.close();
		bos.close();
		
		if(file !== null && deleteSourceAfterCopy){
			Pool.IO.removeFile(file);
		}
		return true;
	}catch(e){
		Pool.showError(e);
		return false;
	}
};

/**
 * 파일이나 디렉토리(내부의 모든 디렉토리 및 파일을 포함한)를 압축합니다
 *
 * @since 2015-03-08 (API 1)
 * @author CI-CodeInside <scgtdy7151@gmail.com>
 * @param {String|File} inputPath - 압축을 할 파일 및 폴더
 * @param {String|File} outputPath - 출력할 zip 파일
 */
Pool.IO.zip = function(input, output){
	try{
		if(input instanceof java.io.File){
			var inputPath = input;
		}else if(input instanceof String){
			var inputPath = new java.io.File(input);
		}else{
			throw new Error("Illegal argument type");
		}
		
		if(inputPath !== null && !inputPath.exists()){
			return false;
		}
		
		if(output instanceof java.io.File){
			var outputPath = output;
		}else if(output instanceof String){
			var outputPath = new java.io.File(output);
		}else{
			throw new Error("Illegal argument type");
		}
		
		outputPath.getParentFile().mkdirs();
		
		var fileList = [];
		function getEveryFiles(dir){
			try{
				var files = dir.listFiles();
				for(var e in files){
					if(files[e].isFile()){
						fileList.push(files[e].getAbsolutePath());
					}else{
						getEveryFiles(files[e]);
					}
				}
			}catch(e){
				print(e);
			}
		};
		getEveryFiles(inputPath);
		var fos = new java.io.FileOutputStream(outputPath);
		var zos = new java.util.zip.ZipOutputStream(fos);
		for(var e in fileList){
			var ze = new java.util.zip.ZipEntry(fileList[e].substring(inputPath.getAbsolutePath().length()+1, fileList[e].length()));
			zos.putNextEntry(ze);
			var fis = new java.io.FileInputStream(fileList[e]);
			var buffer = java.lang.reflect.Array.newInstance(java.lang.Byte.TYPE, 1024);
			var content;
			while((content = fis.read(buffer)) > 0){
				zos.write(buffer, 0, content);
			}
			zos.closeEntry();
			fis.close();
		}
		zos.close();
		fos.close();
	}catch(err){
		print(err);
	}
};

/**
 * 주어진 압축 파일을 압축 해제 합니다
 *
 * @since 2015-02-26 (API 1)
 * @author affogatoman <colombia2@naver.com>
 * @author ChalkPE <amato0617@gmail.com>
 * @param {String|File} file - zip 파일의 경로 혹은 파일 객체
 * @param {String|File} target - 압축을 풀 폴더의 경로
 */
Pool.IO.unZip = function(file, target) {
	try{
		var zip = new java.util.zip.ZipFile(file);
		var elements = zip.entries();
		var element;
		
		if(target instanceof java.io.File){
			target = target;
		}else if(target instanceof String){
			target = new java.io.File(target);
		}else{
			throw new Error("Illegal argument type");
		}
		
		while(elements.hasNextElement()) {
			element = elements.nextElement();
			Pool.IO.copyFile(zip.getInputStream(element), new java.io.File(target, element.getName()));
		}
		zip.close();
	}catch(e){
		Pool.showError(e);
	}
};





/**
 * @since 2015-02-26 (API 1)
 * @author netherTNT <canghaun@naver.com>
 * @author ChalkPE <amato0617@gmail.com>
 * @class
 * @param {EntityId} ent
 */
Pool.Entity = function(ent){
	if(ent instanceof Pool.Entity){
		this.ent = ent.ent
	}else if(typeof ent === "number"){
		this.ent = ent;
	}else{
		throw new Error("Illegal argument type");
	}
};

/**
 * @since 2015-02-27 (API 1)
 * @author ChalkPE <amato0617@gmail.com>
 * @author IchiKaku <woni8708@naver.com>
 */
Pool.Entity.EntityType = {
    HUMAN: 0,
    
    CHICKEN: 10, COW: 11, PIG: 12, SHEEP: 13, WOLF: 14, VILLAGER: 15, MOOSHROOM: 16,
    
    ZOMBIE: 32, CREEPER: 33, SKELETON: 34, SPIDER: 35, PIGZOMBIE: 36, SLIME: 37, ENDERMAN: 38, SILVERFISH: 39,
    
    DROPPED_ITEM: 64, PRIMED_TNT: 65, FALLING_SAND: 66,
    
    ARROW: 80, SNOWBALL: 81, EGG: 82, PAINTING: 83, MINECART: 84,
    
    //Another name
    PLAYER: 0, MUSHROOM_COW: 16, ZOMBIE_PIGMAN: 36, ITEM: 64, TNT: 65, SAND: 66, SNOW: 81, CART: 84
};

/**
 * @since 2015-02-27 (API 1)
 * @author ChalkPE <amato0617@gmail.com>
 * @author IchiKaku <woni8708@naver.com>
 */
Pool.Entity.EntityTypeName = {
    "E0": "Player",
    
    "E10": "Chicken", "E11": "Cow", "E12": "Pig", "E13": "Sheep", "E14": "Wolf", "E15": "Villager", "E16": "Mooshroom",
    
    "E32": "Zombie", "E33": "Creeper", "E34": "Skeleton", "E35": "Spider", "E36": "PigZombie", "E37": "Slime", "E38": "Enderman", "39": "Silverfish",
    
    "E64": "DroppedItem", "E65": "PrimedTNT", "E66": "FallingSand",
    
    "E80": "Arrow", "E81": "Snowball", "E82": "Egg", "E83": "Painting", "E84": "Minecart"
};

/**
 * 엔티티의 이름을 구합니다
 *
 * @since 2015-02-27 (API 1)
 * @author Ichikaku <woni8708@naver.ccom
 * @param {EntityId} ent
 * @return {String} 엔티티의 이름
 */

Pool.Entity.getName = function(ent){
	return Pool.Entity.EntityTypeName["E" + Entity.getEntityTypeId(ent)];
};

/**
 * 엔티티와 가장 가까이에 있는 엔티티를 구합니다.
 *
 * @since 2015-03-06 (API 1)
 * @author programmerDark <angello10@naver.com>
 * @author ChalkPE <amato0617@gmail.com>
 * @return {EntityId}
 */

Pool.Entity.prototype.getNearestEntity = function (){
    var x = Entity.getX(this.ent);
    var y = Entity.getY(this.ent);
    var z = Entity.getZ(this.ent);

    var that = this;

    return Entity.getAll().reduce(function (a, b){
        if(that.ent === a){
            return b;
        }else if(that.ent === b){
            return a;
        }

        var distanceA = Math.hypot(Entity.getX(a) - x, Entity.getY(a) - y, Entity.getZ(a) - z);
        var distanceB = Math.hypot(Entity.getX(a) - x, Entity.getY(b) - y, Entity.getZ(b) - z);

        return distanceA < distanceB ? a : b;
    });
};

/**
 * 플레이어의 엔티티 객체를 구합니다
 * 
 * @since 2015-02-26 (API 1)
 * @author ChalkPE <amato0617@gmail.com>
 * @return {Pool.Entity}
 */
Pool.Entity.getPlayer = function(){
	return new Pool.Entity(Player.getEntity());
};

/**
 * 엔티티가 존재하는지 확인합니다
 * 
 * @since 2015-02-26 (API 1)
 * @author affogatoman <colombia2@naver.com>
 * @param {EntityId} ent
 * @returns {Boolean} - 엔티티의 존재 여부
 */
Pool.Entity.isEntity = function(ent){
	if(ent instanceof Pool.Entity){
		ent = ent.ent; 
	}
	
	if(ent === null || typeof ent !== "number" || ent < 0){
		return false;
	}
	
	return Entity.getAll().indexOf(entId) >= 0;
};


/**
 * 엔티티가 플레이어인지 확인합니다
 *
 * @since 2015-02-29 (API 1)
 * @author Choseul <chocoslime05@naver.com>
 * @param {EntityId|Pool.Entity} ent
 * @return {Boolean} 엔티티의 플레이어 여부
 */
Pool.Entity.isPlayer = function(ent){
	if(ent instanceof Pool.Entity){
		ent = ent.ent;
	}
	
	return Pool.Entity.isEntity(ent) && Player.isPlayer(ent);
};

 /**
 * 특정 엔티티를 모두 제거합니다
 * 
 * @since 2015-02-27 (API 1)
 * @author Choseul <chocoslime05@naver.com>
 * @author ChalkPE <amato0617@gmail.com>
 * @param {EntityTypeId} [id] - 제거할 엔티티 타입, 생략할 경우 플레이어가 아닌 모든 엔티티
 */
Pool.Entity.removeSpecificEntity = function(id){
	var player = Player.getEntity();
	var removeAll = id === null || typeof id !== "number" || (typeof id === "number" && id < 0);
	
	Entity.getAll().forEach(function(ent){
		if(ent !== player && (removeAll || Entity.getEntityTypeId(ent) === id)){
			Entity.remove(ent);
		}
	});
};

/**
 * @since 2015-02-26 (API 1)
 * @author ChalkPE <amato0617@gmail.com>
 */
Pool.Entity.prototype = {};

/**
 * 엔티티의 아이디를 얻습니다
 *
 * @since 2015-02-27 (API 1)
 * @author affogatoman <colombia2@naver.com>
 * @return {EntityId}
 */
Pool.Entity.prototype.getId = function(){
    return this.ent;
};

/**
 * 엔티티가 생명체인지 확인합니다
 *
 * @since 2015-02-28 (API 1)
 * @author netherTNT <canghaun@naver.com>
 * @param {EntityId|Pool.Entity} ent - 엔티티 아이디 또는 객체
 * @return {Boolean} - 엔티티의 생명체 여부
 */
Pool.Entity.prototype.isCreature = function(ent){
	if(ent instanceof Pool.Entity){
		ent = ent.ent;
	}
	
	return Pool.Entity.isEntity(ent) && Entity.getEntityTypeId(ent) < 64;
};

/**
 * 엔티티가 적대적인지 확인합니다
 *
 * @since 2015-02-27 (API 1)
 * @author IchiKaku <woni8708@naver.com>
 * @author affogatoman <colombia2@naver.com>
 * @param {EntityId|Pool.Entity} ent - 엔티티 아이디 또는 객체
 * @return {Boolean} - 엔티티의 적대 관계 여부
 */
Pool.Entity.prototype.isHostileMob = function(ent){
	if(ent instanceof Pool.Entity){
 		ent = ent.ent;
 	}
 	
 	return 32 <= Entity.getEntityTypeId(ent) && Entity.getEntityTypeId(ent) < 64;
};

/**
 * 엔티티의 현재 위치의 벡터를 얻습니다
 * @return {Pool.Vector3}
 */
Pool.Entity.prototype.getVector = function(){
	return new Pool.Vector3(Entity.getX(this.ent), Entity.getY(this.ent), Entity.getZ(this.ent));
};

/**
 * 엔티티를 이동시킵니다
 * 
 * @since 2015-02-26 (API 1)
 * @author affogatoman <colombia2@naver.com>
 * @param {Number|Pool.Vector3} x
 * @param {Number} y
 * @param {Number} z
 */
Pool.Entity.prototype.moveTo = function(x, y, z){
	if(x instanceof Pool.Vector3){
		Entity.setPosition(this.ent, x.x, x.y, x.z);
	}
	
	if(typeof x === "number" && typeof y === "number" && typeof z === "number"){
		Entity.setPosition(this.ent, x, y, z);
	}
};

/**
 * 엔티티의 스킨의 비트맵을 얻습니다
 * 
 * @since 2015-02-26 (API 1)
 * @author affogatoman <colombia2@naver.com>
 * @return {Bitmap} 엔티티 스킨의 비트맵
 */
 Pool.Entity.prototype.getSkinBitmap = function(){
	if(Entity.getEntityTypeId(this.ent) >= 64)
		return null;
	return android.graphics.BitmapFactory.decodeStream(ModPE.openInputStreamFromTexturePack("images/" + Entity.getMobSkin(this.ent)));
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
 * 주어진 범위 내에 있는 모든 엔티티를 구합니다
 * 
 * @since 2015-02-26 (API 1)
 * @author netherTNT <canghaun@naver.com>
 * @author ChalkPE <amato0617@gmail.com>
 * @param {Number} range
 * @param {EntityId|Pool.Entity|Pool.Vector3} [base = Pool.Entity.getPlayer().getVector()] - 범위의 중심이 되는 엔티티의 엔티티 아이디 또는 좌표
 * @returns {Array} 범위 내의 모든 엔티티
 */
Pool.Map.getEntitiesInRange = function(range, base){
	if(base instanceof Pool.Vector3){
		base = base;
	}else if(Pool.Entity.isEntity(base)){
		base = new Pool.Entity(base).getVector();
	}else{
		base = Pool.Entity.getPlayer().getVector();
	}
	
    return Entity.getAll().filter(function(ent){
        return Math.hypot(base.x - Entity.getX(ent), base.y - Entity.getY(ent), base.z - Entity.getZ(ent)) < range;
    });
};

/**
 * 문자열의 모양에 따라 블럭을 설치합니다
 *
 * @since 2015-03-01 (API 1)
 * @author affogatoman <colombia2@naver.com>
 * @param {String} pattern
 * @param {String} direction
 * @param {Array} declaration
 * @param {Number|Pool.Vector3} x
 * @param {Number} y
 * @param {Number} z
 * @example
 * Pool.Map.setShapedTiles("G-S", "x+", ["G", 2, 0, "S", 1, 0], 1, 1, 1);
 * //x축 방향으로 (1, 1, 1)좌표 부터 잔디, 공기, 돌 순으로 블럭이 설치됩니다
 */
Pool.Map.setShapedTiles = function(pattern, direction, declaration, x, y, z){
	if(typeof pattern !== "string" || typeof direction !== "string" || !Array.isArray(declaration)){
		return;
	}
		
	if(x instanceof Pool.Vector3){
		y = x.y;
		z = x.z;
		x = x.x;
	}
	
	for(var cur = 0; cur < pattern.length; cur++){
		if(pattern.charAt(cur) === "-" || declaration.indexOf(pattern.charAt(cur)) < 0){
			continue;
		}
		
		switch(direction){
			case "x+":
				Level.setTile(x+cur, y, z, declaration[declaration.indexOf(pattern.charAt(cur))+1], declaration[declaration.indexOf(pattern.charAt(cur))+2]);
				break;
			case "x-":
				Level.setTile(x-cur, y, z, declaration[declaration.indexOf(pattern.charAt(cur))+1], declaration[declaration.indexOf(pattern.charAt(cur))+2]);
				break;
			case "z+":
				Level.setTile(x, y, z+cur, declaration[declaration.indexOf(pattern.charAt(cur))+1], declaration[declaration.indexOf(pattern.charAt(cur))+2]);
				break;
			case "z-":
				Level.setTile(x, y, z-cur, declaration[declaration.indexOf(pattern.charAt(cur))+1], declaration[declaration.indexOf(pattern.charAt(cur))+2]);
				break;
		}
	}
};





/**
 * @since 2015-02-27 (API 1)
 * @author affogatoman <colombia2@naver.com>
 * @namespace
 */
Pool.Player = {};

/**
 * 플레이어의 인벤토리에서 특정 아이템의 총 개수을 구합니다
 *
 * @since 2015-02-27 (API 1)
 * @author affogatoman <colombia2@naver.com>
 * @param {Number} itemId
 * @param {Number} itemDam
 * @return {Number} 아이템의 갯수
 */
Pool.Player.getItemCount = function(itemId, itemDam){
	var result = 0;
	
	if(isNaN(itemDam) || typeof itemDam !== "number"){
		itemDam = 0;
	}
	
	for(var count = 9; count <= 44; count++){
		if(Player.getInventorySlot(count) === itemId && Player.getInventorySlotData(count) === itemDam){
			result += Player.getInventorySlotCount(count);
		}
	}
	
	return result;
};

/**
 * 플레이어의 인벤토리에서 특정 아이템을 주어진 만큼 제거합니다
 *
 * @since 2015-03-01 (API 1)
 * @author 우유맛비누 <nno88551@naver.com>
 * @param {Number} itemId
 * @param {Number} itemDam
 * @param {Number} count
 * @return {Boolean} 아이템 제거 성공 여부
 */
Pool.Player.removeItem = function(id, damage, count){
	var real = count;
	if(typeof damage !== "number" || isNaN(damage)){
		damage = 0;
	}
	
	for(var cc = 9; cc <= 44; cc++){
		if(Player.getInventorySlot(cc) === id && Player.getInventorySlotData(cc) === damage){
			var k = Player.getInventorySlotCount(cc);
			Player.addItemInventory(id, -Math.min(k, real), damage);
			real -= k;
			if(cc <= 0) return true;
		}
	}
	
	return real < count;
};

/**
 * 플레이어를 간접적인 방법을 사용해 특정 좌표로 이동합니다
 *
 * @since 2015-02-28 (API 1)
 * @author ChalkPE <amato0617@gmail.com>
 * @param {EntityId} player
 * @param {Number|Pool.Vector3} x
 * @param {Number} y
 * @param {Number} z
 */
Pool.Player.moveTo = function(player, x, y, z){
	if(x instanceof Pool.Vector3){
		y = x.y;
		z = x.z;
		x = x.x;
	}
	
	var snowball = Level.spawnMob(x, y, z, Pool.Entity.EntityType.SNOWBALL);
	Entity.rideAnimal(player, snowball);
	Entity.remove(snowball)
};

/**
 * 플레이어의 체력을 구합니다
 *
 * @since 2015-02-28 (API 1)
 * @author Choseul <chocoslime05@naver.com>
 * @return {Number} 플레이어의 체력
 */
Pool.Player.getHealth = function(){
	return Entity.getHealth(Player.getEntity());
};

/**
 * 플레이어가 들고 있는 아이템의 아이디를 구합니다
 *
 * @since 2015-03-01 (API 1)
 * @author Choseul <chocoslime05@naver.com>
 * @return {Number} 플레이어가 들고 있는 아이템의 아이디
 */
Pool.Player.getHoldingItemId = function(){
	return Player.getCarriedItem();
};

/**
 * 플레이어가 들고 있는 아이템의 개수를 구합니다
 *
 * @since 2015-03-01 (API 1)
 * @author Choseul <chocoslime05@naver.com>
 * @return {Number} 플레이어가 들고 있는 아이템의 개수
 */
Pool.Player.getHoldingItemCount = function(){
	return Player.getCarriedItemCount();
};

/**
 * 플레이어가 들고 있는 아이템의 데미지 값을 구합니다
 *
 * @since 2015-03-01 (API 1)
 * @author Choseul <chocoslime05@naver.com>
 * @return {Number} 플레이어가 들고 있는 아이템의 데미지 값
 */
Pool.Player.getHoldingItemDamage = function(){
	return Player.getCarriedItemDamage();
};

/**
 * 플레이어가 들고 있는 아이템을 구합니다
 *
 * @since 2015-03-04 (API 1)
 * @author 우유맛비누 <nno88551@naver.com>
 * @return {Pool.Item} 플레이어가 들고 있는 아이템
 */
Pool.Player.getHoldingItem = function(){
	return new Pool.Item(Player.getCarriedItem(), Player.getCarriedItemDamage(), Player.getCarriedItemCount());
};

/**
 * 모든 플레이어의 배열을 구합니다
 * 
 * @since 2015-03-02 (API 1)
 * @author netherTNT <canghaun@naver.com>
 * @returns {Array} 모든 플레이어
 */

Pool.Player.getAll = function(){
	return Entity.getAll().filter(function(ent){
		return Player.isPlayer(ent);
	});
};





/**
 * @since 2015-03-01 (API 1)
 * @author 우유맛비누 <nno88551@naver.com>
 * @class
 * @param {Number} id - 아이템의 아이디
 * @param {Number} damage - 아이템의 데미지 값
 * @param {Number} count - 아이템의 개수
 */
Pool.Item = function(id, damage, count){
	this.id = (typeof id === "number" && !isNaN(id)) ? id & 0xffff : 0;
	this.damage = (typeof damage === "number" && !isNaN(damage)) ? damage & 0xffff : 0;
	this.count = parseInt(count);
};

/**
 * @since 2015-03-01 (API 1)
 * @author 우유맛비누 <nno88551@naver.com>
 */
Pool.Item.prototype = {};

/**
 * 아이템의 아이디를 구합니다
 *
 * @since 2015-03-01 (API 1)
 * @author 우유맛비누 <nno88551@naver.com>
 * @return {Number} 아이템 아이디
 */
Pool.Item.prototype.getId = function(){
	return this.id;
};

/**
 * 아이템의 데미지 값을 구합니다
 *
 * @since 2015-03-01 (API 1)
 * @author 우유맛비누 <nno88551@naver.com>
 * @return {Number} 아이템 데미지
 */
Pool.Item.prototype.getDamage = function(){
	return this.damage;
};

/**
 * 아이템의 데미지를 설정합니다
 *
 * @since 2015-03-01 (API 1)
 * @author 우유맛비누 <nno88551@naver.com>
 * @param {Number} damage
 */
Pool.Item.prototype.setDamage = function(damage){
	this.damage = (typeof damage === "number" && !isNaN(damage)) ? damage & 0xffff : 0;
};

/**
 * 아이템의 개수를 구합니다
 *
 * @since 2015-03-01 (API 1)
 * @author 우유맛비누 <nno88551@naver.com>
 * @return {Number} 개수
 */
Pool.Item.prototype.getCount = function(){
	return this.count;
};

/**
 * 아이템의 개수를 설정합니다
 *
 * @since 2015-03-01 (API 1)
 * @author 우유맛비누 <nno88551@naver.com>
 * @param {Number} count
 */
Pool.Item.prototype.setCount = function(count){
	this.count = parseInt(count);
};





/**
 * @since 2015-02-26 (API 1)
 * @author onebone <jyc0410@naver.com>
 * @namespace
 */
 Pool.Utils = {};
 
 /**
  * 블럭런쳐에 스크립트를 불러옵니다
  * 
  * @since 2015-02-26 (API 1)
  * @author onebone <jyc0410@naver.com>
  * @param {String|File} path - 파일의 경로
  */
Pool.Utils.loadScript = function(path){
	if(path instanceof java.io.File){
		path = path;
	}else if(path instanceof String){
		path = new java.io.File(path);
	}else{
		throw new Error("Illegal argument type");
	}
	
	try{
		net.zhuoweizhang.mcpelauncher.ScriptManager.loadScript(file);
	}catch(e){
		Pool.showError(e);
	}
};

/**
 * 블럭런쳐에 적용된 모든 스크립트들의 메서드들을 호출합니다
 * 
 * @since 2015-02-26 (API 1)
 * @author onebone <jyc0410@naver.com>
 * @param {String} functionName - 함수의 이름
 * @param {...Object} args - 함수에 전달할 인자
 */
Pool.Utils.callScriptMethod = function(){
	var args = Array.slice(arguments);
	var functionName = args.shift();
	
	net.zhuoweizhang.mcpelauncher.ScriptManager.callScriptMethod(functionName, args);
};





/**
 * @since 2015-03-04 (API 1)
 * @author CodeInside <scgtdy7151@gmail.com>
 * @namespace
 */
Pool.Math = {};

/**
 * 0부터 주어진 수까지의 랜덤한 값을 출력합니다
 * 
 * @since 2015-03-04 (API 1)
 * @author CodeInside <scgtdy7151@gmail.com>
 * @author onebone <jyc0410@naver.com>
 * @param {Number} a - 주어지는 수
 * @param {Number} min - 나올 수 있는 가장 작은 수
 * @param {Boolean} raw - 내림을 할지 여부
 */
Pool.Math.random = function(a, min, raw){
	if(typeof raw === null) raw = false;
	if(typeof min !== "number" || isNaN(min)) min = 0;
	if(typeof a === "number" || parseInt(a) == a) {
		var random = Math.random() * a;
		return (((raw) ? random  : Math.floor(random)) + min);
	}else {
		throw new Error("Illegal argument type");
	}
};

/**
 * -1나 1을 출력합니다
 * 
 * @since 2015-03-04 (API 1)
 * @author CodeInside <scgtdy7151@gmail.com>
 */
Pool.Math.randomPM = function(){
	return (Math.random() >= 0.5 ? 1 : -1);
};

/**
 * 배열의 평균을 구합니다
 * 
 * @since 2015-03-05 (API 1)
 * @author CodeInside <scgtdy7151@gmail.com>
 * @author ChalkPE <amato0617@gmail.com>
 * @param {Number|Array} array - 숫자 혹은 숫자가 포함된 배열
 */
Pool.Math.avgArray = function(array){
	if(!Array.isArray(array)){
		if(typeof array === "number"){
			return array;
		}else{
			throw new Error("Illegal argument type");
		}
	}
	var sum = 0;
	var count = 0;
	array.forEach(function(num){
		if(typeof num === "number" && isFinite(num) && !isNaN(num)) {
			sum += num;
			count++;
		}
	});
	return sum / count;
};

/**
 * 두수의 기하평균을 구합니다
 * 
 * @since 2015-03-05 (API 1)
 * @author CodeInside <scgtdy7151@gmail.com>
 * @param {Number} a
 * @param {Number} b
 */
Pool.Math.geoAvg = function(a, b) {
	if(!isNaN(Number(a)) && isFinite(Number(a)) && !isNaN(Number(b)) && isFinite(Number(b)))
		return Math.sqrt(a * b);
	else
		throw new Error("Illegal argument type");
};

/**
 * 주어진 자연수의 팩토리얼을 구합니다
 * 
 * @since 2015-03-05 (API 1)
 * @author CodeInside <scgtdy7151@gmail.com>
 * @param {Number} n - 자연수
 */
 Pool.Math.fct = function(n) {
	if(Math.floor(n) == n && Math.abs(n) == n && isFinite(Number(n))){
		var sum = 1;
		for(var e = n; e > 0; e--)
			sum = sum * e;
		return sum;
	}else {
		throw new Error("Illegal argument type");
	}
};

/**
 * 주어진 수를 주어진 소수자리에서 반올림합니다
 * 
 * @since 2015-03-05 (API 1)
 * @author CodeInside <scgtdy7151@gmail.com>
 * @param {Number} a
 * @param {Number} b - 소숫점 자리수 (자연수)
 */
Pool.Math.roundCut = function(a, b) {
	if(!isNaN(Number(a)) && isFinite(Number(a)) && !isNaN(Number(b)) && isFinite(Number(b)) && Math.floor(b) == b){
		return Math.round(a*Math.pow(10, b))/Math.pow(10, b);
	}else
		throw new Error("Illegal argument type");
};

/**
 * 주어진 수를 주어진 소수자리에서 내림합니다
 * 
 * @since 2015-03-05 (API 1)
 * @author CodeInside <scgtdy7151@gmail.com>
 * @param {Number} a
 * @param {Number} b - 소숫점 자리수 (자리수)
 */
 Pool.Math.floorCut = function(a, b) {
	if((typeof a === "number" || parseInt(a) == a) && parseInt(b) == b){
		return Math.floor(a*Math.pow(10, b))/Math.pow(10, b);
	}else
		throw new Error("Illegal argument type");
};

/**
 * 주어진 수를 주어진 소수자리에서 올림합니다
 * 
 * @since 2015-03-05 (API 1)
 * @author CodeInside <scgtdy7151@gmail.com>
 * @param {Number} a
 * @param {Number} b - 소숫점 자리수 (자연수)
 */
Pool.Math.ceilCut = function(a, b) {
	if((typeof a === "number" || parseInt(a) == a) && parseInt(b) == b){
		return Math.ceil(a*Math.pow(10, b))/Math.pow(10, b);
	}else
		throw new Error("Illegal argument type");
};

/**
 * 주어진 수의 거듭제곱근을 구합니다
 * @since 2015-03-08 (API 1)
 * @author affogatoman <colombia2@naver.com>
 * @param {Number} n
 * @param {Number} target - n제곱근할 수
 * @example
 * //return 3
 * Pool.Math.radrt(3, 27);
 */
Pool.Math.radrt = function(n, target){
	if(typeof n === "number" && !isNaN(n) && typeof target === "number" && !isNaN(target))
		return Math.pow(target, 1/n);
	else
		throw new Error("Illegal argument type");
};





/**
 * @since 2015-03-07 (API 1)
 * @author CI-CodeInside <scgtdy7151@gmail.com>
 * @namespace
 */
Pool.Server = {};

/**
 * 방장이 서버원 모두에게 들리는 채팅메시지를 보냅니다
 * 
 * @since 2015-03-07 (API 1)
 * @author CI-CodeInside <scgtdy7151@gmail.com>
 * @param {String} str
 */
Pool.Server.broadcast = function(str){
	try{
		clientMessage("<" + Player.getName(Player.getEntity()) + "> " + str);
		net.zhuoweizhang.mcpelauncher.ScriptManager.nativeSendChat(str);
	}catch(e){
		Pool.showError(e);
	}
};


/**
 * @since 2015-03-23 (API 1)
 * @author 우유맛비누 <nno88551@naver.com>
 * @param {Object} key
 * @param {Object} value
 */
Pool.HashMap = function(key, value){
	Object.defineProperty(this, "key", {value: key, writable: false});
	Object.defineProperty(this, "value", {value: value, writable: false});
};

//사실 우유맛비누가 프로토타입 만들기 귀찮다네요 추후에 추가예정정


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
 * 맵에 입장할 때마다 라이브러리를 등록합니다
 * 
 * @since 2015-02-24 (API 1)
 * @author ChalkPE <amato0617@gmail.com>
 * @static
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
