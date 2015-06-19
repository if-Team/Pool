/**
 * @since 2015-06-19
 * @author IchiKaku<woni8708@naver.com>
 * @namespace
 */
Pool.Set = {};

/**
 * @since 2015-06-19
 * @author IchiKaku<woni8708@naver.com>
 * @param ele "array"
 * @constructor
 */
Pool.Set = function(ele) {
  if(typeof ele !== "array") throw new Error("parameter must be array");
  this.elements = ele;
};

/**
 * @since 2015-06-20
 * @author IchiKaku<woni8708@naver.com>
 * @returns {Array}
 */
Pool.Set.prototype.toArr = function() {
  return this.elements;
};

/**
 * @since 2015-06-19
 * @author IchiKaku<woni8708@naver.com>
 * @param {Pool.Set} setA
 * @param {Pool.Set} setB
 * @return {Pool.Set} rst
 */
Pool.Set.getInter = function(setA, setB) {
  var rst = [];
  var A = setA.toArr();
  var B = setA.toArr();
  for(var i = 0; i < A.length; i++) {
    for(var m = 0; m < B.length; m++) {
      if(setA[i] == setB[m]) {
        rst.push(setA[i]);
        break;
      }
    }
  }
  return Pool.Set(rst);
};
