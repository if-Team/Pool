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
    if(path instanceof java.io.File){
        path = path;
    }else if(path instanceof String){
        path = new java.io.File(path);
    }else{
        throw new Error("Illegal argument type");
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
Pool.Utils.callScriptMethod = function(){
    var args = Array.slice(arguments);
    var functionName = args.shift();
    
    net.zhuoweizhang.mcpelauncher.ScriptManager.callScriptMethod(functionName, args);
};
