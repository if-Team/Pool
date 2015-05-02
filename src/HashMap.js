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

//사실 우유맛비누가 프로토타입 만들기 귀찮다네요 추후에 추가예정
