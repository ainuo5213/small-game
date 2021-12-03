export class Compositor {
    constructor() {
        this.layers = [];
    }

    /**
     * 将每个绘制图像的回调全部执行一次
     * @param {any} context canvas上下文对象
     * @param {Camera} camera 地图照相机对象
     */
    draw(context, camera) {
        this.layers.forEach(layer => {
            typeof layer === "function" && layer(context, camera);
        })
    }
}