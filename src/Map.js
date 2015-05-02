/**
 * @since 2015-02-26 (API 1)
 * @author affogatoman <colombia2@naver.com>
 * @author IchiKaku <woni8708@naver.com>
 * @namespace
 */
Pool.Map = {};

/**
 * 주어진 평면 좌표에서 가장 높은 곳에 있는 블럭의 좌표를 구합니다
 * 
 * @since 2015-02-26 (API 1)
 * @author affogatoman <colombia2@naver.com>
 * @param {Pool.Vector2} vec2 - 중심이 되는 블럭의 평면적 좌표
 * @return {Pool.Vector3} 가장 높은 곳에 있는 블럭의 좌표
 */
Pool.Map.getHighestVector = function(vec2){
    for(var y = 128; y >= 0; y--){
        if(Level.getTile(vec2.x, y, vec2.z) > 0){
            return new Pool.Vector3(vec2.x, y, vec2.z);
        }
    }
    return null;
};

/**
 * 주어진 범위 내에 있는 모든 엔티티를 구합니다
 * 
 * @since 2015-02-26 (API 1)
 * @author netherTNT <canghaun@naver.com>
 * @author ChalkPE <amato0617@gmail.com>
 * @param {Number} range
 * @param {EntityId|Pool.Entity|Pool.Vector3} [base = Pool.Entity.getPlayer().getVector()] - 범위의 중심이 되는 엔티티의 엔티티 아이디 또는 좌표
 * @returns {Array} 범위 내의 모든 엔티티
 */
Pool.Map.getEntitiesInRange = function(range, base){
    if(base instanceof Pool.Vector3){
        base = base;
    }else if(Pool.Entity.isEntity(base)){
        base = new Pool.Entity(base).getVector();
    }else{
        base = Pool.Entity.getPlayer().getVector();
    }
    
    return Entity.getAll().filter(function(ent){
        return Math.hypot(base.x - Entity.getX(ent), base.y - Entity.getY(ent), base.z - Entity.getZ(ent)) < range;
    });
};

/**
 * 문자열의 모양에 따라 블럭을 설치합니다
 *
 * @since 2015-03-01 (API 1)
 * @author affogatoman <colombia2@naver.com>
 * @param {String} pattern
 * @param {String} direction
 * @param {Array} declaration
 * @param {Number|Pool.Vector3} x
 * @param {Number} y
 * @param {Number} z
 * @example
 * Pool.Map.setShapedTiles("G-S", "x+", ["G", 2, 0, "S", 1, 0], 1, 1, 1);
 * //x축 방향으로 (1, 1, 1)좌표 부터 잔디, 공기, 돌 순으로 블럭이 설치됩니다
 */
Pool.Map.setShapedTiles = function(pattern, direction, declaration, x, y, z){
    if(typeof pattern !== "string" || typeof direction !== "string" || !Array.isArray(declaration)){
        return;
    }
        
    if(x instanceof Pool.Vector3){
        y = x.y;
        z = x.z;
        x = x.x;
    }
    
    for(var cur = 0; cur < pattern.length; cur++){
        if(pattern.charAt(cur) === "-" || declaration.indexOf(pattern.charAt(cur)) < 0){
            continue;
        }
        
        switch(direction){
            case "x+":
                Level.setTile(x+cur, y, z, declaration[declaration.indexOf(pattern.charAt(cur))+1], declaration[declaration.indexOf(pattern.charAt(cur))+2]);
                break;
            case "x-":
                Level.setTile(x-cur, y, z, declaration[declaration.indexOf(pattern.charAt(cur))+1], declaration[declaration.indexOf(pattern.charAt(cur))+2]);
                break;
            case "z+":
                Level.setTile(x, y, z+cur, declaration[declaration.indexOf(pattern.charAt(cur))+1], declaration[declaration.indexOf(pattern.charAt(cur))+2]);
                break;
            case "z-":
                Level.setTile(x, y, z-cur, declaration[declaration.indexOf(pattern.charAt(cur))+1], declaration[declaration.indexOf(pattern.charAt(cur))+2]);
                break;
        }
    }
};
