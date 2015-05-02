/**
 * @since 2015-02-26 (API 1)
 * @author netherTNT <canghaun@naver.com>
 * @author ChalkPE <amato0617@gmail.com>
 * @class
 * @param {EntityId} ent
 */
Pool.Entity = function(ent){
    if(ent instanceof Pool.Entity){
        this.ent = ent.ent
    }else if(typeof ent === "number"){
        this.ent = ent;
    }else{
        throw new Error("Illegal argument type");
    }
};

/**
 * @since 2015-02-27 (API 1)
 * @author ChalkPE <amato0617@gmail.com>
 * @author IchiKaku <woni8708@naver.com>
 */
Pool.Entity.EntityType = {
    HUMAN: 0,
    
    CHICKEN: 10, COW: 11, PIG: 12, SHEEP: 13, WOLF: 14, VILLAGER: 15, MOOSHROOM: 16,
    
    ZOMBIE: 32, CREEPER: 33, SKELETON: 34, SPIDER: 35, PIGZOMBIE: 36, SLIME: 37, ENDERMAN: 38, SILVERFISH: 39,
    
    DROPPED_ITEM: 64, PRIMED_TNT: 65, FALLING_SAND: 66,
    
    ARROW: 80, SNOWBALL: 81, EGG: 82, PAINTING: 83, MINECART: 84,
    
    //Another name
    PLAYER: 0, MUSHROOM_COW: 16, ZOMBIE_PIGMAN: 36, ITEM: 64, TNT: 65, SAND: 66, SNOW: 81, CART: 84
};

/**
 * @since 2015-02-27 (API 1)
 * @author ChalkPE <amato0617@gmail.com>
 * @author IchiKaku <woni8708@naver.com>
 */
Pool.Entity.EntityTypeName = {
    "E0": "Player",
    
    "E10": "Chicken", "E11": "Cow", "E12": "Pig", "E13": "Sheep", "E14": "Wolf", "E15": "Villager", "E16": "Mooshroom",
    
    "E32": "Zombie", "E33": "Creeper", "E34": "Skeleton", "E35": "Spider", "E36": "PigZombie", "E37": "Slime", "E38": "Enderman", "39": "Silverfish",
    
    "E64": "DroppedItem", "E65": "PrimedTNT", "E66": "FallingSand",
    
    "E80": "Arrow", "E81": "Snowball", "E82": "Egg", "E83": "Painting", "E84": "Minecart"
};

/**
 * 엔티티의 이름을 구합니다
 *
 * @since 2015-02-27 (API 1)
 * @author Ichikaku <woni8708@naver.ccom
 * @param {EntityId} ent
 * @return {String} 엔티티의 이름
 */

Pool.Entity.getName = function(ent){
    return Pool.Entity.EntityTypeName["E" + Entity.getEntityTypeId(ent)];
};

/**
 * 엔티티와 가장 가까이에 있는 엔티티를 구합니다.
 *
 * @since 2015-03-06 (API 1)
 * @author programmerDark <angello10@naver.com>
 * @author ChalkPE <amato0617@gmail.com>
 * @return {EntityId}
 */

Pool.Entity.prototype.getNearestEntity = function (){
    var x = Entity.getX(this.ent);
    var y = Entity.getY(this.ent);
    var z = Entity.getZ(this.ent);

    var that = this;

    return Entity.getAll().reduce(function (a, b){
        if(that.ent === a){
            return b;
        }else if(that.ent === b){
            return a;
        }

        var distanceA = Math.hypot(Entity.getX(a) - x, Entity.getY(a) - y, Entity.getZ(a) - z);
        var distanceB = Math.hypot(Entity.getX(a) - x, Entity.getY(b) - y, Entity.getZ(b) - z);

        return distanceA < distanceB ? a : b;
    });
};

/**
 * 플레이어의 엔티티 객체를 구합니다
 * 
 * @since 2015-02-26 (API 1)
 * @author ChalkPE <amato0617@gmail.com>
 * @return {Pool.Entity}
 */
Pool.Entity.getPlayer = function(){
    return new Pool.Entity(Player.getEntity());
};

/**
 * 엔티티가 존재하는지 확인합니다
 * 
 * @since 2015-02-26 (API 1)
 * @author affogatoman <colombia2@naver.com>
 * @param {EntityId} ent
 * @returns {Boolean} - 엔티티의 존재 여부
 */
Pool.Entity.isEntity = function(ent){
    if(ent instanceof Pool.Entity){
        ent = ent.ent; 
    }
    
    if(ent === null || typeof ent !== "number" || ent < 0){
        return false;
    }
    
    return Entity.getAll().indexOf(entId) >= 0;
};


/**
 * 엔티티가 플레이어인지 확인합니다
 *
 * @since 2015-02-29 (API 1)
 * @author Choseul <chocoslime05@naver.com>
 * @param {EntityId|Pool.Entity} ent
 * @return {Boolean} 엔티티의 플레이어 여부
 */
Pool.Entity.isPlayer = function(ent){
    if(ent instanceof Pool.Entity){
        ent = ent.ent;
    }
    
    return Pool.Entity.isEntity(ent) && Player.isPlayer(ent);
};

 /**
 * 특정 엔티티를 모두 제거합니다
 * 
 * @since 2015-02-27 (API 1)
 * @author Choseul <chocoslime05@naver.com>
 * @author ChalkPE <amato0617@gmail.com>
 * @param {EntityTypeId} [id] - 제거할 엔티티 타입, 생략할 경우 플레이어가 아닌 모든 엔티티
 */
Pool.Entity.removeSpecificEntity = function(id){
    var player = Player.getEntity();
    var removeAll = id === null || typeof id !== "number" || (typeof id === "number" && id < 0);
    
    Entity.getAll().forEach(function(ent){
        if(ent !== player && (removeAll || Entity.getEntityTypeId(ent) === id)){
            Entity.remove(ent);
        }
    });
};

/**
 * @since 2015-02-26 (API 1)
 * @author ChalkPE <amato0617@gmail.com>
 */
Pool.Entity.prototype = {};

/**
 * 엔티티의 아이디를 얻습니다
 *
 * @since 2015-02-27 (API 1)
 * @author affogatoman <colombia2@naver.com>
 * @return {EntityId}
 */
Pool.Entity.prototype.getId = function(){
    return this.ent;
};

/**
 * 엔티티가 생명체인지 확인합니다
 *
 * @since 2015-02-28 (API 1)
 * @author netherTNT <canghaun@naver.com>
 * @param {EntityId|Pool.Entity} ent - 엔티티 아이디 또는 객체
 * @return {Boolean} - 엔티티의 생명체 여부
 */
Pool.Entity.prototype.isCreature = function(ent){
    if(ent instanceof Pool.Entity){
        ent = ent.ent;
    }
    
    return Pool.Entity.isEntity(ent) && Entity.getEntityTypeId(ent) < 64;
};

/**
 * 엔티티가 적대적인지 확인합니다
 *
 * @since 2015-02-27 (API 1)
 * @author IchiKaku <woni8708@naver.com>
 * @author affogatoman <colombia2@naver.com>
 * @param {EntityId|Pool.Entity} ent - 엔티티 아이디 또는 객체
 * @return {Boolean} - 엔티티의 적대 관계 여부
 */
Pool.Entity.prototype.isHostileMob = function(ent){
    if(ent instanceof Pool.Entity){
        ent = ent.ent;
    }
    
    return 32 <= Entity.getEntityTypeId(ent) && Entity.getEntityTypeId(ent) < 64;
};

/**
 * 엔티티의 현재 위치의 벡터를 얻습니다
 * @return {Pool.Vector3}
 */
Pool.Entity.prototype.getVector = function(){
    return new Pool.Vector3(Entity.getX(this.ent), Entity.getY(this.ent), Entity.getZ(this.ent));
};

/**
 * 엔티티를 이동시킵니다
 * 
 * @since 2015-02-26 (API 1)
 * @author affogatoman <colombia2@naver.com>
 * @param {Number|Pool.Vector3} x
 * @param {Number} y
 * @param {Number} z
 */
Pool.Entity.prototype.moveTo = function(x, y, z){
    if(x instanceof Pool.Vector3){
        Entity.setPosition(this.ent, x.x, x.y, x.z);
    }
    
    if(typeof x === "number" && typeof y === "number" && typeof z === "number"){
        Entity.setPosition(this.ent, x, y, z);
    }
};

/**
 * 엔티티의 스킨의 비트맵을 얻습니다
 * 
 * @since 2015-02-26 (API 1)
 * @author affogatoman <colombia2@naver.com>
 * @return {Bitmap} 엔티티 스킨의 비트맵
 */
 Pool.Entity.prototype.getSkinBitmap = function(){
    if(Entity.getEntityTypeId(this.ent) >= 64)
        return null;
    return android.graphics.BitmapFactory.decodeStream(ModPE.openInputStreamFromTexturePack("images/" + Entity.getMobSkin(this.ent)));
};
