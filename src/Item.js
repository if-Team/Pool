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
