
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