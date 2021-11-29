
/**
 * 绘制背景：天空、大地
 * @param {any} background 背景对象，来自于json配置
 * @param {any} context canvas上下文对象
 * @param {UnitStyleSheet} unitStyleSheet 单元图像样式对象
 */
function drawBackground(background, context, unitStyleSheet) {
    background.ranges.forEach(([x1, x2, y1, y2]) => {
        for (let x = x1; x < x2; x++) {
            for (let y = y1; y < y2; y++) {
                unitStyleSheet.drawTile(background.tile, context, x, y);
            }
        }
    })
}


/**
 * 创建绘制图像的函数：在回调中绘制图像
 * @param {any} backgrounds 背景对象，来自于json配置
 * @param {UnitStyleSheet} backgroundSprite 单元图像样式对象
 * @returns {Function} 绘制图像的回调
 */
export function createBackgroundLayer(backgrounds, backgroundSprite) {

    // 创建临时缓存区，使用闭包在外部绘制图像
    const buffer = document.createElement("canvas");
    buffer.width = 256;
    buffer.height = 240;

    // 循环将图像绘制到临时的画布
    backgrounds.forEach(background => {
        drawBackground(background, buffer.getContext("2d"), backgroundSprite);
    });

    // 返回绘制图像的回调
    return function drawBackgroundLayer(context) {
        context.drawImage(buffer, 0, 0);
    }
}

/**
 * 创建绘制图像的函数：在回调中绘制图像
 * @param {UnitStyleSheet} sprite 单元图像样式对象
 * @param {{ x: number, y: number }}} pos 初始位置
 * @returns 绘制图像的回调
 */
export function createrSpriteLayer(sprite, pos) {
    return function drawSpriteLayer(context) {
        for (let i = 0; i < 20; i++) {
            sprite.draw('mario', context, pos.x + i * 16, pos.y);
        }
    }
}
