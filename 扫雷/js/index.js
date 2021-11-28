/*
 * @Description: 
 * @Author: ainuo5213
 * @Date: 2021-09-30 15:14:58
 * @LastEditTime: 2021-09-30 17:32:55
 * @LastEditors: ainuo5213
 * @Reference: 
 */

const TYPE_NUMBER = 'number';
const TYPE_MINE = 'mine';
const DIR_LEFT = 1;
const DIT_RIGHT = 3;
const clsMap = {
    0: 'one',
    1: 'two',
    2: 'three',
    3: 'four',
    4: 'five',
    5: 'six',
    6: 'seven',
    7: 'eight',
    8: 'nine',
}

class Grid {
    /**
     * 
     * @param {string} type 格子类型
     * @param {number} x 格子所在的二维数组的row
     * @param {number} y 格子所在的二维数组的col
     * @param {boolean} flag 是否处于标记状态
     */
    constructor(type, x, y, flag) {
        this.type = type;
        this.x = x;
        this.y = y;
        this.flag = flag;
    }

    genGrid() {
        var td = document.createElement("td");
        td.classList.add("grid");
        td.classList.add("covering");
        td.dataset.x = this.x;
        td.dataset.y = this.y;

        return td;
    }
}

class MineGrid extends Grid {
        

    /**
     * 
     * @param {number} x 格子所在的二维数组的row
     * @param {number} y 格子所在的二维数组的col
     * @param {boolean} flag 是否处于标记状态
     */
    constructor(x, y, flag) {
        super(TYPE_MINE, x, y, flag);
    }

    genGrid() {
        var td = super.genGrid();
        td.classList.add('mine-grid');
        return td;
    }
}

class NumberGrid extends Grid {

    /**
     * 
     * @param {number} x 格子所在的二维数组的row
     * @param {number} y 格子所在的二维数组的col
     * @param {boolean} flag 是否处于标记状态
     */
    constructor(x, y, flag) {
        super(TYPE_NUMBER, x, y, flag);
        this.mineNumber = 0;
    }

    genGrid() {
        var td = super.genGrid();
        td.classList.add('number-grid');
        return td;
    }
}

class MineField {
    #_nodes = 0;
    _minNumDom = document.querySelector(".mine-num");
    
    /**
     * 构造函数：创建一个雷区
     * @param {HTMLElement} dom 表格需要渲染的容器
     * @param {number} cols 行数
     * @param {number} rows 列数
     * @param {number} mineCount 雷数
     */
    constructor(dom, cols, rows, mineCount) {
        this.dom = dom;
        this.cols = cols;
        this.rows = rows;
        this.mineCount = mineCount;
        this.restMineCount = mineCount;
        this._minNumDom.innerText = this.restMineCount;
    }

    initTable = _ => {
        let arr2d = this.#genNumberArray();
        this.#_nodes = this.#genCellNodes(arr2d);
        this.#calcMineNuberSurround();
        this.#renderTable();
        this.#mouseEvent();
    }

    #renderTable = _ => {
        let table = document.createElement("table");
        for (let i = 0; i < this.#_nodes.length; i++) {
            let rowNodes = this.#_nodes[i];
            let tr = document.createElement("tr");
            for (let j = 0; j < rowNodes.length; j++) {
                const element = rowNodes[j];
                let grid = element.genGrid();
                element.grid = grid;
                tr.appendChild(grid);
            }
            table.appendChild(tr);
        }
        this.dom.appendChild(table);
    }

    #genCellNodes = arr2d => {
        var cellNodes = [];
        for (let i = 0; i < arr2d.length; i++) {
            const rowElements = arr2d[i];
            let rowNodes = [];
            for (let j = 0; j < rowElements.length; j++) {
                rowNodes.push(arr2d[i][j] == TYPE_MINE ? new MineGrid(i, j, false) : new NumberGrid(i, j, false));
            }

            cellNodes.push(rowNodes);
        }
        return cellNodes;
    }

    #isMine = grid => {
        return grid instanceof MineGrid;
    }

    #genNumberArray = _ => {
        let arr = Array.from({ length: this.rows * this.cols }, (_, k) => k < this.mineCount ? TYPE_MINE : TYPE_NUMBER);

        arr.sort(_ => 0.5 - Math.random());

        let rootArr = [];

        while(arr.length > 0) {
            let _row = arr.splice(0, this.cols);
            rootArr.push(_row);
        }

        return rootArr;
    }

    #calcMineNuberSurround = _ => {
        for (let i = 0; i < this.#_nodes.length; i++) {
            let rowNodes = this.#_nodes[i];
            for (let j = 0; j < rowNodes.length; j++) {
                if (!this.#isMine(this.#_nodes[i][j])) {
                    continue;
                }

                var numberNodes = this.#getSurroundNumberNodes(this.#_nodes[i][j]);
                for (let k = 0; k < numberNodes.length; k++) {
                    const element = numberNodes[k];
                    this.#_nodes[element.x][element.y].mineNumber += 1; 
                }
            }
        }
    }

    #getSurroundNumberNodes = mineGrid => {
        var _x = mineGrid.x;
        var _y = mineGrid.y;
        var _y_start = _y - 1;
        var _y_end = _y + 1;
        var _x_start = _x - 1;
        var _x_end = _x + 1;
        var numberNodes = [];

        for (let x = _x_start; x <= _x_end; x++) {
            for (let y = _y_start; y <= _y_end; y++) {
                if (
                    x < 0 ||
                    y < 0 ||
                    x >= this.rows ||
                    y >= this.cols ||
                    (x == _x && y == _y) ||
                    this.#isMine(this.#_nodes[x][y])
                ) {
                    continue;
                }
                
                numberNodes.push(this.#_nodes[x][y]);
            }
        }

        return numberNodes;
    }

    #mouseEvent = _ => {
        this.dom.addEventListener('mousedown', this.#onMouseDown);
    }

    #onMouseDown = e => {
        if (e.target.classList.contains("grid")) {
            if (e.which == DIR_LEFT) {
                this.#onMouseLeftClick(e.target);
            } else if (e.which === DIT_RIGHT) {
                this.dom.oncontextmenu = function () {
                    return false
                };

                this.#onMouseRightClick(e.target);
            }
        }
    }

    #onMouseLeftClick = td => {
        if (td.classList.contains("flag")) {
            return;
        }

        var _grid = this.#_nodes[+td.dataset.x][+td.dataset.y];
        if (this.#isMine(_grid)) {
            alert("游戏概述");
            this.#onGameOver(_grid);
            return;
        }

        if (_grid.mineNumber > 0) {
            this.#openNumberGrid(td, _grid);
        }
        else {
            var nodes = [];
            this.#getContinuousZeroGrid(_grid, nodes);
            this.#renderZero(nodes);
        }
    }

    #renderZero(nodes) {
        for (let i = 0; i < nodes.length; i++) {
            const element = nodes[i];
            element.grid.classList.add("one");
            element.grid.classList.remove("covering");
            element.grid.innerText = element.mineNumber;
        }
    }

    #getContinuousZeroGrid = (grid, nodes) => {
        let arroundNotZeroGrids = this.#getSurroundNumberNodes(grid);
        if (grid.mineNumber == 0 && !grid.flag) {
            grid.flag = true;
            nodes.push(grid);
        }
        
        for (let i = 0; i < arroundNotZeroGrids.length; i++) {
            const element = arroundNotZeroGrids[i];
            if (element.mineNumber == 0 && !element.flag) {
                element.flag = true;
                nodes.push(element);
                this.#getContinuousZeroGrid(element, nodes)
            }
        }
    }
    
    #openNumberGrid = (td, grid) => {
        td.classList.remove("covering");

        td.innerText = grid.mineNumber;

        td.classList.add(clsMap[grid.mineNumber - 1]);
    }

    #onMouseRightClick = td => {
        if (!td.classList.contains("covering")) {
            return
        }

        let hasFlaged = td.classList.contains("flag");
        hasFlaged ? (td.classList.remove("flag")) : (td.classList.add("flag"));

        hasFlaged ? (this.restMineCount++) : (this.restMineCount--);
        this._minNumDom.innerText = this.restMineCount;
        this.#_nodes[+td.dataset.x][+td.dataset.y].flag = !hasFlaged;
        if (this.restMineCount <= 0) {
            if (this.#checkGameOver()) {
                alert('恭喜你，游戏胜利');
                this.#onGameOver(this.#_nodes[+td.dataset.x][+td.dataset.y]);
            }
            else {
                alert('游戏失败');
                this.onGameOver(this.#_nodes[+td.dataset.x][+td.dataset.y]);
            }
        }
    }

    #checkGameOver() {
        for (let i = 0; i < this.#_nodes.length; i++) {
            const rowNodes = this.#_nodes[i];
            for (let j = 0; j < rowNodes.length; j++) {
                const element = this.#_nodes[i][j];
                if (this.#isMine(element) && element.flag == false) {
                    return false;
                }
            }
        }
        return true;
    }

    #onGameOver(curNode) {
        if (this.#isMine(curNode)) {
            curNode.grid.classList.remove("covering");
            curNode.grid.style.backgroundColor = "red";
        }
        for (let i = 0; i < this.#_nodes.length; i++) {
            const rowNodes = this.#_nodes[i];
            for (let j = 0; j < rowNodes.length; j++) {
                const element = this.#_nodes[i][j];
                element.grid.classList.remove("covering");
                if (this.#isMine(element)) {
                    if (element.flag) {
                        element.grid.style.backgroundColor = "green";
                    }
                    else {
                        element.grid.classList.add("mine-item");
                    } 
                }
            }
        }

        this.dom.removeEventListener('mousedown', this.#onMouseDown);
    }
}

(function () {

    let mineFiled = new MineField(document.querySelector(".game-box"), 10, 10, 10);
    mineFiled.initTable();
}())