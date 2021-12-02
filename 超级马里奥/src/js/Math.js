
// 矢量对象
export class Vector {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    set(x, y) {
        this.x = x;
        this.y = y;
    }
}

// 矩阵数据，是个二维数组，存储渲背景（sky和ground）的每个单元格（16x16）的数据，数据例子：
// [
//  [{ tile: 'groud'}, { tile: 'sky' }], []
// ]
export class Matrix {
    constructor() {
        this.grid = [];
    }

    forEach = callback => {
        this.grid.forEach((column, x) => {
            column.forEach((tile, y) => {
                callback(x, y, tile);
            })
        });
    }

    get = (x, y) => {
        const col = this.grid[x];
        if (col !== undefined) {
            return col[y];
        }

        return undefined;
    }

    set = (x, y, value) => {
        if (this.grid[x] === undefined) {
            this.grid[x] = [];
        }

        this.grid[x][y] = value;
    }
}