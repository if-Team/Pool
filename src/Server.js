/**
 * @since 2015-03-07 (API 1)
 * @author CI-CodeInside <scgtdy7151@gmail.com>
 * @namespace
 */
Pool.Server = {};

/**
 * 방장이 서버원 모두에게 들리는 채팅메시지를 보냅니다
 * 
 * @since 2015-03-07 (API 1)
 * @author CI-CodeInside <scgtdy7151@gmail.com>
 * @param {String} str
 */
Pool.Server.broadcast = function(str){
    try{
        clientMessage("<" + Player.getName(Player.getEntity()) + "> " + str);
        net.zhuoweizhang.mcpelauncher.ScriptManager.nativeSendChat(str);
    }catch(e){
        Pool.showError(e);
    }
};
