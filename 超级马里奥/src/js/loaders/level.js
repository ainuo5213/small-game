import { createBackgroundLayer, createrSpriteLayer } from "../layers.js";
import { Matrix } from "../Math.js";
import { Level } from "../Level.js";
import { loadJson, loadSpriteSheet } from "../loader.js";


function setupCollision(levelJson, level) {
    // 加载level中的matrix每一个格子的数据到tiles
    const mergedTiles = levelJson.layers.reduce((mergedTiles, layer) => {
        return mergedTiles.concat(layer.tiles);
    }, []);
    const collisionGrid = createCollisionGrid(mergedTiles, levelJson.patterns);
    level.setCollisionGrid(collisionGrid);
}

function setupBackgrounds(levelJson, level, backgroundSprite) {
    levelJson.layers.forEach(layer => {
        const backgroundGrid = createBackgroundGrid(layer.tiles, levelJson.patterns);
        const backgroundLayer = createBackgroundLayer(level, backgroundGrid, backgroundSprite);
        level.compositor.layers.push(backgroundLayer);
    })
}

function setupEntities(levelJson, level, entityFactory) {
    levelJson.entities.forEach(({name, pos: [x, y]}) => {
        const createEntity = entityFactory[name];
        const entity = createEntity();
        entity.pos.set(x, y);
        level.entities.add(entity);
    })

    const marioSpriteLayer = createrSpriteLayer(level.entities);
    level.compositor.layers.push(marioSpriteLayer);
}

export function createLevelLoader(entityFactory) {
    return function loadLevelAsync(name) {
        return loadJson(`/src/levels/${name}.json`)
            .then(data => Promise.all([data, loadSpriteSheet(data.spriteSheet)]))
            .then(([levelJson, backgroundSprite]) => {
                const level = new Level();

                setupCollision(levelJson, level);
                setupBackgrounds(levelJson, level, backgroundSprite);

                // 创建马里奥图像的回调
                setupEntities(levelJson, level, entityFactory);

                return level;
            })
    }
}

function* expandSpan(xStart, xLen, yStart, yLen) {
    const xEnd = xStart + xLen;
    const yEnd = yStart + yLen;
    for (let x = xStart; x < xEnd; x++) {
        for (let y = yStart; y < yEnd; y++) {
            yield { x, y };
        }
    }
}

function expandRange(range) {
    // 修改渲染逻辑: 当配置中的range为4位数，则其分别为x位置开始xStart、x方向渲染长度xLen、y位置开始yStart、y方向渲染长度yLen
    //             当配置中的range为2位数，则其分别为x位置开始xStart、y位置开始yStart，此时yLen、xLen均为1
    //             当配置中的range为3位数，则其分别为x位置开始xStart、x方向渲染长度xLen、y位置开始yStart，此时yLen为1
    if (range.length === 4) {
        const [xStart, xLen, yStart, yLen] = range;
        return expandSpan(xStart, xLen, yStart, yLen);
    } else if (range.length === 2) {
        const [xStart, yStart] = range;
        return expandSpan(xStart, 1, yStart, 1);
    } else if (range.length === 3) {
        const [xStart, xLen, yStart] = range;
        return expandSpan(xStart, xLen, yStart, 1);
    }
}

function* expandRanges(ranges) {
    for (const range of ranges) {
        yield* expandRange(range); // yield 用法，yield用于函数时需要加上*
    }
}


function* expandTiles(tiles, patterns) {
    // yield替代递归，降低空间复杂度
    function* walkTiles(tiles, offsetX, offsetY) {
        // 将地图数据中的每一个背景图层都加载到level对象的tiles中，为以后进行碰撞检测打下数据基础
        for (const tile of tiles) {
            for (const { x, y } of expandRanges(tile.ranges)) {
                const derivedX = x + offsetX;
                const derivedY = y + offsetY;
                if (tile.pattern) {
                    const tiles = patterns[tile.pattern].tiles;
                    yield* walkTiles(tiles, derivedX, derivedY);
                } else {
                    yield {
                        tile,
                        x: derivedX,
                        y: derivedY
                    };
                }
            }
        }
    }
    yield* walkTiles(tiles, 0, 0);
}

function createCollisionGrid(tiles, patterns) {
    const matrix = new Matrix();
    for (const { tile, x, y } of expandTiles(tiles, patterns)) {
        matrix.set(x, y, {
            type: tile.type,
            name: tile.name
        });
    }

    return matrix;
}

function createBackgroundGrid(tiles, patterns) {
    const matrix = new Matrix();
    for (const { tile, x, y } of expandTiles(tiles, patterns)) {
        matrix.set(x, y, {
            type: tile.type,
            name: tile.name,
        });
    }

    return matrix;
}