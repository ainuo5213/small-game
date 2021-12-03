/**
 * 创建绘制图像的函数：在回调中绘制图像
 * @param {Level} level Level对象，由loader导出的
 * @param {UnitStyleSheet} backgroundSprite 单元图像样式对象
 * @returns {Function} 绘制图像的回调
 */
export function createBackgroundLayer(level, backgroundSprite) {
    const tiles = level.tiles;
    const tileResolver = level.tileCollider.tileResolver;

    // 创建临时缓存区，使用闭包在外部绘制图像
    const buffer = document.createElement("canvas");
    buffer.width = 256 + 16;
    buffer.height = 240;

    const bufferContext = buffer.getContext("2d");
    let startIndex, endIndex;


    function redraw(drawFrom, drawTo) {

        if (drawFrom === startIndex && drawTo === endIndex) {
            return;
        }

        startIndex = drawFrom;
        endIndex = drawTo;

        for (let x = startIndex; x <= endIndex; x++) {
            const col = tiles.grid[x];
            if (col) {
                col.forEach((tile, y) => {
                    backgroundSprite.drawTile(tile.name, bufferContext, x - drawFrom, y);
                })
            }
        }
    }

    // 返回绘制图像的回调
    return function drawBackgroundLayer(context, camera) {
        const drawWidth = tileResolver.toIndex(camera.size.x);
        const drawFrom = tileResolver.toIndex(camera.pos.x);
        const drawTo = drawWidth + drawFrom;
        redraw(drawFrom, drawTo);

        // 这里%16是因为当camera移动的过程中，camera的x值会越来越大，绘制的时候会出现问题，所以%16时，无论camera怎么移动最终的值也不会超过16
        context.drawImage(buffer, -camera.pos.x % 16, -camera.pos.y);
    }
}

/**
 * 创建绘制图像的函数：在回调中绘制图像
 * @param {Entity} entities 多个实体
 * @param {number} width 实体宽
 * @param {number} height 实体高
 * @returns 绘制图像的回调
 */
export function createrSpriteLayer(entities, width = 64, height = 64) {
    const spriteBuffer = document.createElement("canvas");

    spriteBuffer.width = width;
    spriteBuffer.height = height;
    const spriteBufferContext = spriteBuffer.getContext("2d");


    return function drawSpriteLayer(context, camera) {
        entities.forEach(entity => {
            spriteBufferContext.clearRect(0, 0, width, height);
            entity.draw(spriteBufferContext);
            context.drawImage(
                spriteBuffer,
                entity.pos.x - camera.pos.x,
                entity.pos.y - camera.pos.y);
        });
    }
}

/**
 * 创建碰撞检测的函数
 * @param {Level} level 关卡实例对象
 * @returns 
 */
export function createCollisionLayer(level) {
    const resolveTiles = [];
    const tileResolver = level.tileCollider.tiles;
    const tileSize = tileResolver.tileSize;

    // 重写碰撞检测，将每一个匹配到的x和y加入临时数组（我认为在这里仅作为调试用，我认为甚至不写都行）
    const getByIndexOriginal = tileResolver.getByIndex;
    tileResolver.getByIndex = function getByIndexFake(x, y) {
        resolveTiles.push({ x, y });
        return getByIndexOriginal.call(tileResolver, x, y);
    }

    return function drawCollisionLayer(context, camera) {
        context.strokeStyle = "blue";
        resolveTiles.forEach(({ x, y }) => {
            context.beginPath();
            context.rect(
                x * tileSize - camera.pos.x,
                y * tileSize - camera.pos.y,
                tileSize,
                tileSize);
            context.stroke();
        });

        context.strokeStyle = "red";
        level.entities.forEach(entity => {
            context.beginPath();
            context.rect(
                entity.pos.x - camera.pos.x,
                entity.pos.y - camera.pos.y,
                entity.size.x,
                entity.size.y);
            context.stroke();
        });

        resolveTiles.length = 0;
    }
}

export function createCameraLayer(cameraToDraw) {
    return function drawCameraLayer(context, fromCamera) {
        context.strokeStyle = "purple";
        context.beginPath();
        context.rect(
            cameraToDraw.pos.x - fromCamera.pos.x,
            cameraToDraw.pos.y - fromCamera.pos.y,
            cameraToDraw.size.x,
            cameraToDraw.size.y);
        context.stroke();
    }
}