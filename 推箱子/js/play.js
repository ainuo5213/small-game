import { PLAYER, WALL, BOX, SPACE, UP, RIGHT, LEFT } from './map.js'

export function playerMove(gameData, dir) {
    let playerPoint = getPlayerPoint(gameData);
    let nextInfo = getNextInfo(gameData, playerPoint.row, playerPoint.col, dir);
    if (nextInfo.value === WALL) {
        return false;
    }
    else if (nextInfo.value === SPACE) {
        exchangePoint(gameData, playerPoint, nextInfo);
        return true;
    }
    else {
        var nextNextInfo = getNextInfo(gameData, nextInfo.row, nextInfo.col, dir)
        if (nextNextInfo.value === SPACE) {
            exchangePoint(gameData, nextInfo, nextNextInfo);
            exchangePoint(gameData, playerPoint, nextInfo);
            return true;
        }
        else {
            return false;
        }
    }
}

function exchangePoint(gameData, point1, point2) {
    var temp = gameData.map[point1.row][point1.col];
    gameData.map[point1.row][point1.col] = gameData.map[point2.row][point2.col];
    gameData.map[point2.row][point2.col] = temp;
}

function getNextInfo(gameData, row, col, direction) {
    if (direction === LEFT) {
        return {
            row: row,
            col: col - 1,
            value: gameData.map[row][col - 1]
        }
    }
    else if (direction === RIGHT) {
        return {
            row: row,
            col: col + 1,
            value: gameData.map[row][col + 1]
        }
    }
    else if (direction === UP) {
        return {
            row: row - 1,
            col: col,
            value: gameData.map[row - 1][col]
        }
    }
    else {
        return {
            row: row + 1,
            col: col,
            value: gameData.map[row + 1][col]
        }
    }
}

function getPlayerPoint(gameData) {
    for (var row = 0; row < gameData.size.row; row++) {
        for (var col = 0; col < gameData.size.col; col++) {
            if (gameData.map[row][col] === PLAYER) {
                return {
                    row: row,
                    col: col
                }
            }
        }
    }
    throw new Error("玩家没找着");
}

export function isWin(gameData) {
    for (var i = 0; i < gameData.correct.length; i++) {
        var point = gameData.correct[i];
        if (gameData.map[point.row][point.col] !== BOX) {
            return false;
        }
    }
    return true;
}