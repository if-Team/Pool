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
 * 2차원 벡터를 구합니다
 * @since 2015-05-02 (API 1)
 * @author affogatoman <colombia2@naver.com>
 * @returns {Pool.Vector2} 2차원 벡터
 */
Pool.Vector3.prototype.getVector2 = function(){
    return new Pool.Vector2(this.x, this.z);
};
