import { PLAYER, WALL, BOX, SPACE, data } from './map.js'
var divContainer = document.getElementById("game-board");
var levelContainer = document.getElementById("select-level");
var pieceWidth = 40;
var pieceHeight = 40;

function setContainerWidth(gameData) {
    divContainer.style.width = pieceWidth * gameData.size.col + "px";
    divContainer.style.height = pieceHeight * gameData.size.row + "px";
}

export function isCurrect(gameData, row, col) {
    return gameData.correct.find(p => p.row === row && p.col === col) !== undefined;
}

function renderCellContent(gameData, row, col) {
    const value = gameData.map[row][col];
    const div = document.createElement("div");
    div.classList.add("item");
    div.style.left = col * pieceWidth + "px";
    div.style.top = row * pieceHeight + "px";
    const currect = isCurrect(gameData, row, col);
    if (value === PLAYER) {
        div.classList.add("player");
    }
    else if (value === WALL) {
        div.classList.add("wall");
    }
    else if (value === BOX) {
        if (currect) {
            div.classList.add("arrive");
        }
        else {
            div.classList.add("box");
        }
    }
    else if (currect) {
        div.classList.add("target");
    }
    else if (value === SPACE) {
        div.classList.add("ground");
    }
    else {
        return;
    }

    divContainer.appendChild(div);
}

function renderMapContent(gameData) {
    divContainer.innerHTML = "";
    for (let row = 0; row < gameData.size.row; row++) {
        for (let col = 0; col < gameData.size.col; col++) {
            renderCellContent(gameData, row, col);
        }
    }
}

export function renderSelect() {
    let fragment = document.createDocumentFragment();
    for (let i = 0; i < data.length; i++) {
        const element = data[i];
        let option = document.createElement("option");
        option.innerHTML = element.name;
        option.value = i;
        fragment.appendChild(option);
    }

    levelContainer.appendChild(fragment);
}

export default gameData => {
    setContainerWidth(gameData);
    renderMapContent(gameData);
}