/**
 * @since 2015-02-24 (API 1)
 * @author ChalkPE <amato0617@gmail.com>
 * @namespace
 */
Pool.Canvas = {};

/**
 * 두 입체 좌표를 잇는 선을 그립니다
 * 
 * @since 2015-02-24 (API 1)
 * @author ChalkPE <amato0617@gmail.com>
 * @param {Pool.Vector3} begin - 시작점의 좌표
 * @param {Pool.Vector3} end - 종료점의 좌표
 * @param {Number} blockId - 선을 이룰 블럭의 ID 값
 * @param {Number} blockDamage - 선을 이룰 블럭의 데미지 값
 * @see Bresenham's line algorithm
 * @todo 반복문을 빠져나오지 못하는 오류 해결
 */
Pool.Canvas.drawLine = function(begin, end, blockId, blockDamage){
    function drawLine2D(x0, y0, x1, y1, height, blockId, blockDamage){
        var dx = Math.abs(x1 - x0);
        var dy = Math.abs(y1 - y0);
        var sx = (x0 < x1) ? 1 : -1;
        var sy = (y0 < y1) ? 1 : -1;
        var err = dx - dy;
        
        while(true){
            Level.setTile(x0, height, y0, blockId, blockDamage);
            
            if((x0 == x1) && (y0 == y1)){
                break;
            }
            var e2 = 2 * err;
            if(e2 > -dy){
                err -= dy;
                x0 += sx;
            }
            if(e2 < dx){
                err += dx;
                y0 += sy;
            }
        }
    }

    function drawLine3D(x0, y0, z0, x1, y1, z1, blockId, blockDamage){
        var x0i = Math.floor(x0);
        var y0i = Math.floor(y0);
        var z0i = Math.floor(z0);
        
        var x1i = Math.floor(x1);
        var y1i = Math.floor(y1);
        var z1i = Math.floor(z1);
        
        var sx = (x1i > x0i) ? 1 : (x1i < x0i) ? -1 : 0;
        var sy = (y1i > y0i) ? 1 : (y1i < y0i) ? -1 : 0;
        var sz = (z1i > z0i) ? 1 : (z1i < z0i) ? -1 : 0;
        
        var x = x0i;
        var y = y0i;
        var z = z0i;
        
        var xp = x0i + (x1i > x0i ? 1 : 0);
        var yp = y0i + (y1i > y0i ? 1 : 0);
        var zp = z0i + (z1i > z0i ? 1 : 0);
        
        var vx = (x1 === x0) ? 1 : x1 - x0;
        var vy = (y1 === y0) ? 1 : y1 - y0;
        var vz = (z1 === z0) ? 1 : z1 - z0;
        
        var vxvy = vx * vy;
        var vxvz = vx * vz;
        var vyvz = vy * vz;
        
        var errx = (xp - x0) * vyvz;
        var erry = (yp - y0) * vxvz;
        var errz = (zp - z0) * vxvy;
        
        var derrx = sx * vyvz;
        var derry = sy * vxvz;
        var derrz = sz * vxvy;

        do{
            Level.setTile(x, y, z, blockId, blockDamage);
            
            if(x === x1i && y === y1i && z === z1i){
                break;
            }
            
            var xr = Math.abs(errx);
            var yr = Math.abs(erry);
            var zr = Math.abs(errz);
            
            if(sx !== 0 && (sy === 0 || xr < yr) && (sz === 0 || xr < zr)){
                x += sx;
                errx += derrx;
            }else if(sy !== 0 && (sz === 0 || yr < zr)){
                y += sy;
                erry += derry;
            }else if(sz !== 0){
                z += sz;
                errz += derrz;
            }
        }while(true);
    }
    
    if(begin.equals(end)){ //Point
        Level.setTile(begin.x, begin.y, begin.z, blockId, blockDamage);
    }else if(begin.x === end.x){
        drawLine2D(begin.y, begin.z, end.y, end.z, begin.x, blockId, blockDamage);
    }else if(begin.y === end.y){
        drawLine2D(begin.x, begin.z, end.x, end.z, begin.y, blockId, blockDamage);
    }else if(begin.z === end.z){
        drawLine2D(begin.x, begin.y, end.x, end.y, begin.z, blockId, blockDamage);
    }else{
        drawLine3D(begin.x, begin.y, begin.z, end.x, end.y, end.z, blockId, blockDamage);
    }
};

/**
 * 주어진 입체 좌표를 중심으로 원을 그립니다
 * 
 * @since 2015-02-24 (API 1)
 * @author ChalkPE <amato0617@gmail.com>
 * @author IchiKaku <woni8708@naver.com>
 * @param {Pool.Vector3} center - 원의 중심점의 좌표
 * @param {Number} radius - 원의 반지름
 * @param {Number} blockId - 원을 이룰 블럭의 ID 값
 * @param {Number} blockDamage - 원을 이룰 블럭의 데미지 값
 */
Pool.Canvas.drawCircle = function(center, radius, blockId, blockDamage){
    var a = 0;
    var b = radius;
    var p = 1 - radius;
    
    var x = center.x;
    var z = center.z;
    
    do{
        Level.setTile(x + a, y, z + b, blockId, blbloclDamage);
        Level.setTile(x + b, y, z + a, blockId, blbloclDamage);
        Level.setTile(x - a, y, z + b, blockId, blbloclDamage);
        Level.setTile(x - b, y, z + a, blockId, blbloclDamage);
        Level.setTile(x + a, y, z - b, blockId, blbloclDamage);
        Level.setTile(x + b, y, z - a, blockId, blbloclDamage);
        Level.setTile(x - a, y, z - b, blockId, blbloclDamage);
        Level.setTile(x - b, y, z - a, blockId, blbloclDamage);
        
        if(p < 0){
            p += 3 + 2 * a++;
        }else{
            p += 5 + 2 * (a++ - b--);
        }
        
    }while(a <= b);
};

/**
 * 주어진 좌표를 중심으로 타원을 그립니다
 * 
 * @since 2015-02-24 (API 1)
 * @author affogatoman <colombia2@naver.com>
 * @param {Pool.Vector3} center - 타원의 중심점의 좌표
 * @param {Number} width - 타원의 가로 길이
 * @param {Number} height - 타원의 세로 길이
 * @param {Number} blockId - 타원을 이룰 블럭의 ID 값
 * @param {Number} blockDamage - 타원을 이룰 블럭의 데미지 값
 */
Pool.Canvas.drawEllipse = function(center, width, height, blockId, blockDamage){
    for(var a = 0; a <= 360; a++){
        var x = java.lang.Math.cos(java.lang.Math.toRadians(a)) * width / 2;
        var z = java.lang.Math.sin(java.lang.Math.toRadians(a)) * height / 2;
        
        Level.setTile(center.x + Math.floor(x), center.y, center.z + Math.floor(z), blockId, blockDamage);
    }
};
