export class Compositor {
    constructor() {
        this.layers = [];
    }

    /**
     * 将每个绘制图像的回调全部执行一次
     * @param {any} context canvas上下文对象
     */
    draw(context) {
        this.layers.forEach(layer => {
            typeof layer === "function" && layer(context);
        })
    }
}