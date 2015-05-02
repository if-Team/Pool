/**
 * 2차원 좌표의 래퍼 클래스입니다
 * 
 * @since 2015-02-26 (API 1)
 * @author IchiKaku <woni8708@naver.com>
 * @author ChalkPE <amato0617@gmail.com>
 * @class
 */
Pool.Vector2 = function(x, z){
    if(typeof x !== "number" || isNaN(x) || typeof z !== "number" || isNaN(z)){
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
