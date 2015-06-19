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
 * @since 2015-06-19
 * @author IchiKaku<woni8708@naver.com>
 * @param setA
 * @param setB
 */
Pool.Set.getInter = function(setA, setB) {
  var rst = [];
  for(var i = 0; i < setA.length; i++) {
    for(var m = 0; m < setB.length; m++) {
      if(setA[i] == setB[m]) {
        rst.push(setA[i]);
        break;
      }
    }
  }
  return rst;
};
