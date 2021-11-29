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
        const canvas = document.createElement("canvas");
        canvas.width = this.width;
        canvas.height = this.height;

        // 裁剪图片，并存储
        canvas.getContext("2d")
            .drawImage(
                this.image,
                x,
                y,
                width,
                height,
                0,
                0,
                width,
                height);
        this.tiles.set(name, canvas);
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
     */
    draw(name, context, x, y) {
        const canvas = this.tiles.get(name);
        context.drawImage(canvas, x, y, this.width, this.height); // drawImage第一个参数接收类型：图像、视频、画布
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