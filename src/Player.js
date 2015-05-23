/**
 * @since 2015-02-27 (API 1)
 * @author affogatoman <colombia2@naver.com>
 * @namespace
 */
Pool.Player = {};

/**
 * 플레이어의 인벤토리에서 특정 아이템의 총 개수을 구합니다
 *
 * @since 2015-02-27 (API 1)
 * @author affogatoman <colombia2@naver.com>
 * @param {Number} itemId
 * @param {Number} itemDam
 * @return {Number} 아이템의 갯수
 */
Pool.Player.getItemCount = function(itemId, itemDam){
    var result = 0;
    
    if(isNaN(itemDam) || typeof itemDam !== "number"){
        itemDam = 0;
    }
    
    for(var count = 9; count <= 44; count++){
        if(Player.getInventorySlot(count) === itemId && Player.getInventorySlotData(count) === itemDam){
            result += Player.getInventorySlotCount(count);
        }
    }
    
    return result;
};

/**
 * 플레이어의 인벤토리에서 특정 아이템을 주어진 만큼 제거합니다
 *
 * @since 2015-03-01 (API 1)
 * @author 우유맛비누 <nno88551@naver.com>
 * @param {Number} itemId
 * @param {Number} itemDam
 * @param {Number} count
 * @return {Boolean} 아이템 제거 성공 여부
 */
Pool.Player.removeItem = function(id, damage, count){
    var real = count;
    if(typeof damage !== "number" || isNaN(damage)){
        damage = 0;
    }
    
    for(var cc = 9; cc <= 44; cc++){
        if(Player.getInventorySlot(cc) === id && Player.getInventorySlotData(cc) === damage){
            var k = Player.getInventorySlotCount(cc);
            Player.addItemInventory(id, -Math.min(k, real), damage);
            real -= k;
            if(cc <= 0) return true;
        }
    }
    
    return real < count;
};

/**
 * 플레이어를 간접적인 방법을 사용해 특정 좌표로 이동합니다
 *
 * @since 2015-02-28 (API 1)
 * @author ChalkPE <amato0617@gmail.com>
 * @param {EntityId} player
 * @param {Number|Pool.Vector3} x
 * @param {Number} y
 * @param {Number} z
 */
Pool.Player.moveTo = function(player, x, y, z){
    if(x instanceof Pool.Vector3){
        y = x.y;
        z = x.z;
        x = x.x;
    }
    
    var snowball = Level.spawnMob(x, y, z, Pool.Entity.EntityType.SNOWBALL);
    Entity.rideAnimal(player, snowball);
    Entity.remove(snowball)
};

/**
 * 플레이어의 체력을 구합니다
 *
 * @since 2015-02-28 (API 1)
 * @author Choseul <chocoslime05@naver.com>
 * @return {Number} 플레이어의 체력
 */
Pool.Player.getHealth = function(){
    return Entity.getHealth(Player.getEntity());
};

/**
 * 플레이어가 들고 있는 아이템의 아이디를 구합니다
 *
 * @since 2015-03-01 (API 1)
 * @author Choseul <chocoslime05@naver.com>
 * @return {Number} 플레이어가 들고 있는 아이템의 아이디
 */
Pool.Player.getHoldingItemId = function(){
    return Player.getCarriedItem();
};

/**
 * 플레이어가 들고 있는 아이템의 개수를 구합니다
 *
 * @since 2015-03-01 (API 1)
 * @author Choseul <chocoslime05@naver.com>
 * @return {Number} 플레이어가 들고 있는 아이템의 개수
 */
Pool.Player.getHoldingItemCount = function(){
    return Player.getCarriedItemCount();
};

/**
 * 플레이어가 들고 있는 아이템의 데미지 값을 구합니다
 *
 * @since 2015-03-01 (API 1)
 * @author Choseul <chocoslime05@naver.com>
 * @return {Number} 플레이어가 들고 있는 아이템의 데미지 값
 */
Pool.Player.getHoldingItemDamage = function(){
    return Player.getCarriedItemDamage();
};

/**
 * 플레이어가 들고 있는 아이템을 구합니다
 *
 * @since 2015-03-04 (API 1)
 * @author 우유맛비누 <nno88551@naver.com>
 * @return {Pool.Item} 플레이어가 들고 있는 아이템
 */
Pool.Player.getHoldingItem = function(){
    return new Pool.Item(Player.getCarriedItem(), Player.getCarriedItemDamage(), Player.getCarriedItemCount());
};

/**
 * 모든 플레이어의 배열을 구합니다
 * 
 * @since 2015-03-02 (API 1)
 * @author netherTNT <canghaun@naver.com>
 * @returns {Array} 모든 플레이어
 */

Pool.Player.getAll = function(){
    return Entity.getAll().filter(function(ent){
        return Player.isPlayer(ent);
    });
};

