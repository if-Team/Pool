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
 * 두수의 조화평균을 구합니다.
 * 
 * @since 2015-06-12 (API 1)
 * @author IchiKaku<woni8708@naver.com>
 * @param {Number} a
 * @param {Number} b
 */
Pool.Math.harmoAvg = function(a, b) {
    if(!isNaN(Number(a)) && isFinite(Number(a)) && !isNaN(Number(b)) && isFinite(Number(b)))
        return (2*a*b)/(a+b);
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
 * 주어진 자연수의 약수들로 이루어진 배열을 구합니다
 * 
 * @since 2015-06-18 (API 1)
 * @author Hanarin <canghaun@naver.com>
 * @param {Number} n
 */
Pool.Math.getDivisor = function(n) {
    if(Math.floor(n) == n && Math.abs(n) == n && isFinite(Number(n))) {
        var divisor = [];
        for(var i=1; i<n; i++)
            if(n%i == 0) divisor.push(i);
        return divisor;
    }
    else
       throw new Error("Illegal argument type");
}
 
 /**
 * 주어진 자연수가 소수인지 여부를 구합니다
 * 
 * @since 2015-06-19 (API 1)
 * @author Hanarin <canghaun@naver.com>
 * @param {Number} n
 */
Pool.Math.isPrime = function(n) {
    if(Math.floor(n) == n && Math.abs(n) == n && isFinite(Number(n)))
        return Pool.Math.getDivisor(n).length ==2;
    else
       throw new Error("Illegal argument type");
}