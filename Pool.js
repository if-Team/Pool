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
	if(x instanceof Pool.Vector2){
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
 * 다른 좌표와의 거리를 구합니다
 * 
 * @since 2015-02-26 (API 1)
 * @author ChalkPE <amato0617@gmail.com>
 * @param {Pool.Vector2} vec2
 * @return {Number} 자신과 vec2 사이의 거리
 */
Pool.Vector2.prototype.getDistance = function(vec2){
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
	if(x instanceof  Pool.Vector3){
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
	if(x instanceof  Pool.Vector3){
		return new Pool.Vector3(this.x - x.x, this.y - x.y, this.z - x.z);
	}
	return new Pool.Vector3(this.x - x, this.y - y, this.z - z);
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
	var a, b, p;
	a = 0;
	b = radius;
	p = 1 - radius;
	var x = center.x;
	var z = center.z;
	do {
		setTile(x+a, y, z+b, blockId, blbloclDamage);
		setTile(x+b, y, z+a, blockId, blbloclDamage);
		setTile(x-a, y, z+b, blockId, blbloclDamage);
		setTile(x-b, y, z+a, blockId, blbloclDamage);
		setTile(x+a, y, z-b, blockId, blbloclDamage);
		setTile(x+b, y, z-a, blockId, blbloclDamage);
		setTile(x-a, y, z-b, blockId, blbloclDamage);
		setTile(x-b, y, z-a, blockId, blbloclDamage);
		if(p < 0) p += 3 + 2*a++;
		else p += 5 + 2*(a++ - b--);
		
	} while(a<=b);
};

/**
 * 주어진 좌표를 중심으로 타원을 그립니다
 * 
 * @since 2015-02-24 (API 1)
 * @author affogatoman <colombia2@naver.com>
 * @param {Pool.Vector3} center - 타원의 중심점의 좌표
 * @param {Number} radius - 타원의 반지름
 * @param {Number} squashX - X좌표로 뭉개지는 정도 (1~0)
 * @param {Number} squashZ - Z좌표로 뭉개지는 정도 (1~0)
 * @param {Number} blockId - 타원을 이룰 블럭의 ID 값
 * @param {Number} blockDamage - 타원을 이룰 블럭의 데미지 값
 */
Pool.Canvas.drawEllipse = function(center, radius, squashX, squashZ, blockId, blockDamage){
	for(var a = 0; a <= 360; a++){
   		var x = java.lang.Math.cos(java.lang.Math.toRadians(a)) * radius * squashX;
    	var z = java.lang.Math.sin(java.lang.Math.toRadians(a)) * radius * squashZ;
    	
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
		
		if(!target.exists()){
			return false;
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
		
		if(deleteSourceAfterCopy){
			Pool.IO.removeFile(source);
		}
		return true;
	}catch(e){
		Pool.showError(e);
		return false;
	}
};

/**
 * 주어진 파일을 압축해제 합니다
 *
 * @since 2015-02-26 (API 1)
 * @author affogatoman <colombia2@naver.com>
 * @param {String|File} file - zip 파일의 경로 혹은 파일 객체
 * @param {String} target - 압축해제될 폴더의 경로
 */
Pool.IO.unZip = function(file, target) {
	try{
		var zip = new java.util.zip.ZipFile(file);
		var elements = zip.entries();
		var element;
		while(elements.hasNextElement()) {
			element = elements.nextElement();
			var bis = new java.jo.BufferedInputStream(zip.getInputStream(element));
			var tar = new java.io.File(target+element.getName());
			tar.getParentFile().mkdirs();
			var bos = new java.io.BufferedOutputStream(new java.io.FileOutputStream(tar));
			var read;
			while((read = bis.read()) != -1)
				bos.write(read);
			bis.close();
			bos.close();
		}
		zip.close();
	}catch(e){
		Pool.showError(e);
	}
};
/*
 * @author chalkPE <amato0617@gmaila.ccom
 * @author IchiKaku <woni8708@naver.com>o
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

Pool.Entity.EntityTypeName = {
    "0": "Player",
    
    "10": "Chicken", "11": "Cow", "12": "Pig", "13": "Sheep", "14": "Wolf", "15": "Villager", "16": "Mooshroom",
    
    "32": "Zombie", "33": "Creeper", "34": "Skeleton", "35": "Spider", "36": "PigZombie", "37": "Slime", "38": "Enderman", "39": "Silverfish",
    
    "64": "DroppedItem", "65": "PrimedTNT", "66": "FallingSand",
    
    "80": "Arrow", "81": "Snowball", "82": "Egg", "83": "Painting", "84": "Minecart"
};


/**
 * @since 2015-02-26 (API 1)
 * @author netherTNT <canghaun@naver.com>
 * @author ChalkPE <amato0617@gmail.com>
 * @class
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
 * 플레이어의 엔티티 객체를 구합니다
 * 
 * @since 2015-02-26 (API 1)
 * @author ChalkPE <amato0617@gmail.com>
 * @return {Pool.Entity}
 */
Pool.Entity.getPlayer = function(){
	return new Pool.Entity(Player.getEntity());
};

/*
 * 엔티티가 적대적인지 확인헙나다.
 * @since 2015-2-27 (API 1)
 * @author IchiKaku <woni8708@naver.com>
 * @param {Number|Pool.Entity} ent - 엔티티 아이디 또는 객체
 * @return {Boolean} - 엔티티와 플레이어의 적대관계여부
*/
Pool.Entity.isMob = function(ent) {
	if(ent instanceof Pool.Entity){
		ent = ent.ent;
	}
	
	return Entity.getEntityTypeId(ent) >= 32 && Entity.getEntityTypeId(ent) <= 39;
}

/**
 * 엔티티가 존재하는지 확인합니다
 * 
 * @since 2015-02-26 (API 1)
 * @author affogatoman <colombia2@naver.com>
 * @param {Number} ent - 엔티티 아이디
 * @returns {Boolean} - 엔티티의 존재 여부
 */
Pool.Entity.isEntity = function(ent){
	if(ent instanceof Pool.Entity){
		ent = ent.ent; 
	}
	
	if(typeof ent !== "number" || ent < 0){
		return false;
	}
	
	return Entity.getAll().indexOf(entId) >= 0;
};

/**
 * @since 2015-02-26 (API 1)
 * @author ChalkPE <amato0617@gmail.com>
 */
Pool.Entity.prototype = {};

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
 * @param {Number} range
 * @param {Number|Pool.Entity|Pool.Vector3} [base = Pool.Entity.getPlayer().getVector()] - 범위의 중심이 되는 엔티티의 엔티티 아이디 또는 좌표
 * @returns {Array} 범위 내의 모든 엔티티
 */
Pool.Map.getEntitiesInRange = function(range, base){
	var vec = null;
	if(Pool.Entity.isEntity(base)){
		base = new Pool.Entity(base).getVector();
	}else{
		base = Pool.Entity.getPlayer().getVector();
	}
	
    return Entity.getAll().filter(function(ent){
        return Math.hypot(base.x - Entity.getX(ent), base.y - Entity.getY(ent), base.z - Entity.getZ(ent)) < range;
    });
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
 * 블럭런쳐에 적용된 모든 스크립트들의 메서드들을 호출합니다
 * 
 * @since 2015-02-26 (API 1)
 * @author onebone <jyc0410@naver.com>
 * @param {String} functionName - 함수의 이름
 * @param {...Object} args - 함수에 전달할 인자
 */
Pool.Utils.launchEvent = function(){
	var args = Array.slice(arguments);
	var functionName = args.shift();
	
	net.zhuoweizhang.mcpelauncher.ScriptManager.callScriptMethod(functionName, args);
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
