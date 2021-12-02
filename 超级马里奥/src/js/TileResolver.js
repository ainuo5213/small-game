export default class TileResolver {
    constructor(matrix, tileSize = 16) {
        this.matrix = matrix;
        this.tileSize = tileSize;
    }

    toIndex = pos => {
        return Math.floor(pos / this.tileSize);
    }

    toIndexRange = (pos1, pos2) => {
        const posMax = Math.ceil(pos2 / this.tileSize) * this.tileSize;
        const range = [];
        let pos = pos1;
        do {
            range.push(this.toIndex(pos));
            pos += this.tileSize;
        } while (pos < posMax);

        return range;
    }

    getByIndex = (indexX, indexY) => {
        const tile = this.matrix.get(indexX, indexY);
        if (tile !== undefined) {
            const y1 = indexY * this.tileSize;
            const y2 = y1 + this.tileSize;
            const x1 = indexX * this.tileSize;
            const x2 = x1 + this.tileSize;
            return {
                tile,
                x1,
                x2,
                y1,
                y2,
            }
        }

        return undefined;
    }

    searchByPosition = (positionX, positionY) => {
        const indexX = this.toIndex(positionX);
        const indexY = this.toIndex(positionY);
        return this.getByIndex(indexX, indexY);
    }

    searchByRange = (x1, x2, y1, y2) => {
        const mathes = [];
        this.toIndexRange(x1, x2)
            .forEach(indexX => {
                this.toIndexRange(y1, y2)
                    .forEach(indexY => {
                        const match = this.getByIndex(indexX, indexY);
                        if (match) {
                            mathes.push(match);
                        }
                    });
            });

        return mathes;
    }
}