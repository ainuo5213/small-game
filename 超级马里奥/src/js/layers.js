/**
 * 创建绘制图像的函数：在回调中绘制图像
 * @param {Level} level Level对象，由loader导出的
 * @param {UnitStyleSheet} backgroundSprite 单元图像样式对象
 * @returns {Function} 绘制图像的回调
 */
export function createBackgroundLayer(level, backgroundSprite) {

    // 创建临时缓存区，使用闭包在外部绘制图像
    const buffer = document.createElement("canvas");
    buffer.width = 256;
    buffer.height = 240;

    // 将level数据中matrix代表的每一个格子的数据进行渲染
    level.tiles.forEach((x, y, tile) => {
        backgroundSprite.drawTile(tile.name, buffer.getContext("2d"), x, y);
    });

    // 返回绘制图像的回调
    return function drawBackgroundLayer(context) {
        context.drawImage(buffer, 0, 0);
    }
}

/**
 * 创建绘制图像的函数：在回调中绘制图像
 * @param {Entity} entities 多个实体
 * @returns 绘制图像的回调
 */
export function createrSpriteLayer(entities) {
    return function drawSpriteLayer(context) {
        entities.forEach(entity => {
            entity.draw(context);
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

    // 重写碰撞检测，将每一个匹配到的x和y加入临时数组（我认为在这里仅作为调试用）
    const getByIndexOriginal = tileResolver.getByIndex;
    tileResolver.getByIndex = function getByIndexFake(x, y) {
        resolveTiles.push({ x, y });
        return getByIndexOriginal.call(tileResolver, x, y);
    }

    return function drawCollisionLayer(context) {
        context.strokeStyle = "blue";
        resolveTiles.forEach(({ x, y }) => {
            context.beginPath();
            context.rect(
                x * tileSize,
                y * tileSize,
                tileSize,
                tileSize);
            context.stroke();
        });

        context.strokeStyle = "red";
        level.entities.forEach(entity => {
            context.beginPath();
            context.rect(
                entity.pos.x,
                entity.pos.y,
                entity.size.x,
                entity.size.y);
            context.stroke();
        });

        resolveTiles.length = 0;
    }
}
