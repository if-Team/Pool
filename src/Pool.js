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
