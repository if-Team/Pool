/*
 * @since 2015-06-19
 * @author IchiKaku<woni8708@naver.com>
 * @namespace
 */
Pool.Set = {};

Pool.Set = function(ele) {
  if(typeof ele !== "array") throw newError("parameter must be array");
  this.elements = ele;
};
