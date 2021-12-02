export default class TileResolver {
    constructor(matrix, tileSize = 16) {
        this.matrix = matrix;
        this.tileSize = tileSize;
    }

    // 获取当前x或y位置所在的格子索引
    toIndex = pos => {
        return Math.floor(pos / this.tileSize);
    }

    // 将x和x1或y和y1两个位置，转化为其之间的相隔的格子索引。例如toIndex(17, 33) => [1, 2]
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

    // 通过格子所在的索引获取tile数据，包括tile、当前格子所在位置始末（含x和y方向）
    getByIndex = (indexX, indexY) => {
        const tile = this.matrix.get(indexX, indexY);
        if (tile) {
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
    }

    // 通过位置找tile数据，现将其转换为格子所在的索引，再找出格子的tile和当前格子的位置始末数据
    searchByPosition = (positionX, positionY) => {
        const indexX = this.toIndex(positionX);
        const indexY = this.toIndex(positionY);
        return this.getByIndex(indexX, indexY);
    }

    // 通过传入格子所在的始末位置数据找格子所在tile数据范围，并形成格子始末位置所对应的始末tile数据范围数组
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