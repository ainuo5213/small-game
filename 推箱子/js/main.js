import showUI, { renderSelect } from './ui.js'
import { data, DOWN, UP, LEFT, RIGHT } from './map.js'
import { playerMove, isWin } from "./play.js"

let level = 0;
let gameData = data[level];
let over = false;
showUI(gameData);
renderSelect();
var levelContainer = document.getElementById("select-level");

window.onkeydown = function (e) {
    if (over) {
        return;
    }
    let result = false;
    if (e.key === "ArrowUp") {
        result = playerMove(gameData, UP);
    }
    else if (e.key === "ArrowDown") {
        result = playerMove(gameData, DOWN)
    }
    else if (e.key === "ArrowLeft") {
        result = playerMove(gameData, LEFT)
    }
    else if (e.key === "ArrowRight") {
        result = playerMove(gameData, RIGHT)
    }
    if (result) {
        showUI(gameData);
        setTimeout(() => {
            if (isWin(gameData)) {
                alert("游戏胜利！")
                over = level == data.length - 1;
                level++;
                gameData = data[level];
                showUI(gameData);
                levelContainer.value = level + '';
            }
        }, 0);
    }
}

levelContainer.onchange = function () {
    let _level = +this.value;
    if (_level === level) {
        return;
    }
    level = _level;
    gameData = data[level];
    showUI(gameData);
}