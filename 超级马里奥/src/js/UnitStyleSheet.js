export default class UnitStyleSheet {

    /**
     * 创建一个图像样式定义对象
     * @param {HTMLImageElement} image 背景图像
     * @param {number} width 单位图像宽度
     * @param {number} height 单位图像高度
     */
    constructor(image, width, height) {
        this.image = image;
        this.width = width;
        this.height = height;
        this.tiles = new Map();
        this.animations = new Map();
    }

    /**
     * 绘制动画
     * @param {string} name 动画名
     * @param {any} animation 动画回调函数
     */
    defineAnim(name, animation) {
        this.animations.set(name, animation);
    }

    /**
     * 裁剪人物
     * @param {string} name 画布名称
     * @param {number} x 需要裁剪的图片x位置
     * @param {number} y 需要裁剪的图片y位置
     * @param {number} width 裁剪宽度
     * @param {number} height 裁剪高度
     */
    define(name, x, y, width, height) {
        // hard code：false代表不翻转绘制，true代表翻转绘制，用于控制马里奥反方向和正方形的帧动画
        const buffers = [false, true]
            .map(flip => {
                const canvas = document.createElement("canvas");
                canvas.width = this.width;
                canvas.height = this.height;

                const context = canvas.getContext("2d");
                if (flip) {
                    // 翻转绘制
                    context.scale(-1, 1);
                    context.translate(-width, 0);
                }

                // 裁剪图片，并存储
                context.drawImage(
                    this.image,
                    x,
                    y,
                    width,
                    height,
                    0,
                    0,
                    width,
                    height);

                return canvas;
            });

        this.tiles.set(name, buffers);
    }

    /**
     * 裁剪背景（背景需要重复裁剪）
     * @param {string} name 画布名称
     * @param {number} x 需要裁剪的图片x与单位高度倍数
     * @param {number} y 需要裁剪的图片y与单位高度倍数
     */
    defineTile(name, x, y) {
        this.define(name, x * this.width, y * this.height, this.width, this.height);
    }

    /**
     * 画图像
     * @param {string} name 画布名称
     * @param {any} context 上下文对象
     * @param {number} x 需要画图像的x坐标
     * @param {number} y 需要画图像的y坐标
     * @param {boolean} flip 是否翻转绘制
     */
    draw(name, context, x, y, flip = false) {
        const canvas = this.tiles.get(name)[+flip];
        context.drawImage(canvas, x, y, this.width, this.height); // drawImage第一个参数接收类型：图像、视频、画布
    }

    /**
     * 画动画帧
     * @param {string} name 画布名称
     * @param {any} context 上下文对象
     * @param {number} x 需要画图像的x坐标（倍数）
     * @param {number} y 需要画图像的y坐标（倍数）
     * @param {number} distance 距离
     */
    drawAnim(name, context, x, y, distance) {
        // 取得动画回调，在执行动画回调时会取得当前动画的名字，再根据名字渲染
        const animation = this.animations.get(name);
        this.drawTile(animation(distance), context, x, y);
    }

    /**
     * 画单元格
     * @param {string} name 画布名称
     * @param {any} context 上下文对象
     * @param {number} x 需要画图像的x坐标（倍数）
     * @param {number} y 需要画图像的y坐标（倍数）
     */
    drawTile(name, context, x, y) {
        this.draw(name, context, x * this.width, y * this.height)
    }
}