export const EMPTY = 0;
export const WALL = 5;
export const SPACE = 10;
export const PLAYER = 60;
export const BOX = 80;
export const LEFT = 'LEFT';
export const UP = 'UP';
export const RIGHT = 'RIGHT';
export const DOWN = 'DOWN';


// 游戏关卡数据
export const data = [
    {
        name: 'level 1', // 关卡名字
        size: { col: 8, row: 8 }, // 游戏大小
        map: [
            [0, 0, 5, 5, 5, 0, 0, 0],
            [0, 0, 5, 10, 5, 0, 0, 0],
            [0, 0, 5, 10, 5, 5, 5, 5],
            [5, 5, 5, 80, 10, 80, 10, 5],
            [5, 10, 10, 80, 60, 5, 5, 5],
            [5, 5, 5, 5, 80, 5, 0, 0],
            [0, 0, 0, 5, 10, 5, 0, 0],
            [0, 0, 0, 5, 5, 5, 0, 0]
        ],
        correct: [{ "row": 1, "col": 3 }, { "row": 3, "col": 6 }, { "row": 4, "col": 1 }, { "row": 6, "col": 4 }]
    },
    {
        name: 'level 2',
        size: { col: 9, row: 9 },
        map: [
            [5, 5, 5, 5, 5, 0, 0, 0, 0],
            [5, 10, 10, 10, 5, 0, 0, 0, 0],
            [5, 10, 80, 10, 5, 0, 5, 5, 5],
            [5, 10, 80, 60, 5, 0, 5, 10, 5],
            [5, 5, 5, 80, 5, 5, 5, 10, 5],
            [0, 5, 5, 10, 10, 10, 10, 10, 5],
            [0, 5, 10, 10, 10, 5, 10, 10, 5],
            [0, 5, 10, 10, 10, 5, 5, 5, 5],
            [0, 5, 5, 5, 5, 5, 0, 0, 0]
        ],
        correct: [{ "row": 3, "col": 7 }, { "row": 4, "col": 7 }, { "row": 5, "col": 7 }]
    },
    {
        name: 'level 3',
        size: { col: 10, row: 7 },
        map: [
            [0, 5, 5, 5, 5, 5, 5, 5, 0, 0],
            [0, 5, 10, 10, 10, 10, 10, 5, 5, 5],
            [5, 5, 80, 5, 5, 5, 10, 10, 10, 5],
            [5, 10, 10, 60, 80, 10, 10, 80, 10, 5],
            [5, 10, 10, 10, 5, 10, 80, 10, 5, 5],
            [5, 5, 10, 10, 5, 10, 10, 10, 5, 0],
            [0, 5, 5, 5, 5, 5, 5, 5, 5, 0]
        ],
        correct: [{ "row": 4, "col": 2 }, { "row": 4, "col": 3 }, { "row": 5, "col": 2 }, { "row": 5, "col": 3 }]
    },
    {
        name: 'level 4',
        size: { col: 6, row: 8 },
        map: [
            [0, 5, 5, 5, 5, 0],
            [5, 5, 10, 10, 5, 0],
            [5, 10, 10, 80, 5, 0],
            [5, 5, 10, 10, 5, 5],
            [5, 5, 80, 60, 10, 5],
            [5, 10, 80, 80, 10, 5],
            [5, 10, 10, 10, 10, 5],
            [5, 5, 5, 5, 5, 5]
        ],
        correct: [{ "row": 4, "col": 2 }, { "row": 4, "col": 3 }, { "row": 5, "col": 2 }, { "row": 5, "col": 3 }]
    },
    {
        name: 'level 5',
        size: { col: 8, row: 8 },
        map: [
            [0, 5, 5, 5, 5, 5, 0, 0],
            [0, 5, 10, 60, 5, 5, 5, 0],
            [0, 5, 10, 80, 10, 10, 5, 0],
            [5, 5, 5, 10, 5, 10, 5, 5],
            [5, 10, 5, 10, 5, 10, 10, 5],
            [5, 10, 80, 10, 10, 5, 10, 5],
            [5, 10, 10, 10, 10, 80, 10, 5],
            [5, 5, 5, 5, 5, 5, 5, 5]
        ],
        correct: [{ "row": 4, "col": 1 }, { "row": 5, "col": 1 }, { "row": 6, "col": 1 }]
    },
    {
        name: 'level 6',
        size: { col: 13, row: 11 },
        map: [
            [0, 0, 0, 5, 5, 5, 5, 5, 5, 5, 0, 0, 0],
            [5, 5, 5, 5, 10, 10, 10, 10, 10, 5, 0, 0, 0],
            [5, 10, 10, 10, 10, 5, 5, 5, 10, 5, 0, 0, 0],
            [5, 10, 5, 10, 5, 10, 10, 10, 10, 5, 5, 0, 0],
            [5, 10, 5, 10, 80, 10, 80, 5, 10, 10, 5, 0, 0],
            [5, 10, 5, 10, 10, 10, 10, 10, 5, 10, 5, 0, 0],
            [5, 10, 10, 5, 80, 10, 80, 10, 5, 10, 5, 0, 0],
            [5, 5, 10, 10, 10, 10, 5, 10, 5, 10, 5, 5, 5],
            [0, 5, 10, 5, 5, 5, 10, 10, 10, 10, 10, 60, 5],
            [0, 5, 10, 10, 10, 10, 10, 5, 5, 10, 10, 10, 5],
            [0, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5]
        ],
        correct: [{ "row": 2, "col": 4 }, { "row": 4, "col": 8 }, { "row": 6, "col": 2 }, { "row": 8, "col": 6 }]
    },
    {
        name: 'level 7',
        size: { col: 10, row: 8 },
        map: [
            [0, 0, 0, 5, 5, 5, 5, 5, 5, 5],
            [0, 0, 5, 5, 10, 10, 5, 10, 60, 5],
            [0, 0, 5, 10, 10, 10, 5, 80, 10, 5],
            [0, 0, 5, 80, 10, 10, 80, 10, 10, 5],
            [0, 0, 5, 10, 80, 5, 5, 10, 10, 5],
            [5, 5, 5, 10, 80, 10, 5, 10, 5, 5],
            [5, 10, 10, 10, 10, 10, 10, 10, 5, 0],
            [5, 5, 5, 5, 5, 5, 5, 5, 5, 0]
        ],
        correct: [{ "row": 6, "col": 1 }, { "row": 6, "col": 2 }, { "row": 6, "col": 3 }, { "row": 6, "col": 4 }, { "row": 6, "col": 5 }]
    },
    {
        name: 'level 8',
        size: { col: 10, row: 7 },
        map: [
            [0, 0, 0, 5, 5, 5, 5, 5, 5, 0],
            [0, 5, 5, 5, 10, 10, 10, 10, 5, 0],
            [5, 5, 10, 10, 80, 5, 5, 10, 5, 5],
            [5, 10, 10, 80, 10, 80, 10, 10, 60, 5],
            [5, 10, 10, 10, 80, 10, 80, 10, 5, 5],
            [5, 5, 5, 5, 5, 5, 10, 10, 5, 0],
            [0, 0, 0, 0, 0, 5, 5, 5, 5, 0]
        ],
        correct: [{ "row": 2, "col": 2 }, { "row": 3, "col": 1 }, { "row": 3, "col": 2 }, { "row": 4, "col": 1 }, { "row": 4, "col": 2 }]
    },
    {
        name: 'level 9',
        size: { col: 11, row: 9 },
        map: [
            [0, 5, 5, 5, 5, 5, 5, 5, 5, 5, 0],
            [0, 5, 10, 10, 5, 5, 10, 10, 10, 5, 0],
            [0, 5, 10, 10, 10, 80, 10, 10, 10, 5, 0],
            [0, 5, 80, 10, 5, 5, 5, 10, 80, 5, 0],
            [0, 5, 10, 5, 10, 10, 10, 5, 10, 5, 0],
            [5, 5, 10, 5, 10, 10, 10, 5, 10, 5, 5],
            [5, 10, 80, 10, 10, 80, 10, 10, 80, 10, 5],
            [5, 10, 10, 10, 10, 10, 5, 10, 10, 60, 5],
            [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5]
        ],
        correct: [{ "row": 4, "col": 4 }, { "row": 4, "col": 5 }, { "row": 4, "col": 6 }, { "row": 5, "col": 4 }, { "row": 5, "col": 5 }, { "row": 5, "col": 6 }]
    },
    {
        name: 'level 10',
        size: { col: 8, row: 7 },
        map: [
            [0, 0, 5, 5, 5, 5, 5, 5],
            [0, 0, 5, 10, 10, 10, 10, 5],
            [5, 5, 5, 80, 80, 80, 10, 5],
            [5, 60, 10, 80, 10, 10, 10, 5],
            [5, 10, 80, 10, 10, 10, 5, 5],
            [5, 5, 5, 5, 10, 10, 5, 0],
            [0, 0, 0, 5, 5, 5, 5, 0]
        ],
        correct: [{ "row": 3, "col": 4 }, { "row": 3, "col": 5 }, { "row": 4, "col": 3 }, { "row": 4, "col": 4 }, { "row": 4, "col": 5 }]
    },
    {
        name: 'level 11',
        size: { col: 12, row: 6 },
        map: [
            [0, 5, 5, 5, 5, 0, 0, 5, 5, 5, 5, 5],
            [5, 5, 10, 10, 5, 0, 0, 5, 10, 10, 10, 5],
            [5, 10, 80, 10, 5, 5, 5, 5, 80, 10, 10, 5],
            [5, 10, 10, 80, 10, 10, 10, 10, 10, 80, 10, 5],
            [5, 5, 10, 10, 10, 10, 10, 10, 60, 10, 5, 5],
            [0, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 0]
        ],
        correct: [{ "row": 3, "col": 4 }, { "row": 3, "col": 5 }, { "row": 3, "col": 6 }, { "row": 3, "col": 7 }]
    },
    {
        name: 'level 12',
        size: { col: 8, row: 7 },
        map: [
            [0, 0, 5, 5, 5, 5, 5, 0],
            [5, 5, 5, 10, 10, 60, 5, 0],
            [5, 10, 10, 80, 10, 10, 5, 5],
            [5, 10, 10, 10, 80, 10, 10, 5],
            [5, 5, 5, 10, 10, 80, 10, 5],
            [0, 0, 5, 10, 10, 10, 5, 5],
            [0, 0, 5, 5, 5, 5, 5, 0]
        ],
        correct: [{ "row": 2, "col": 4 }, { "row": 3, "col": 3 }, { "row": 3, "col": 5 }]
    },
    {
        name: 'level 13',
        size: { col: 8, row: 8 },
        map: [
            [0, 0, 5, 5, 5, 5, 0, 0],
            [0, 0, 5, 10, 10, 5, 0, 0],
            [0, 5, 5, 10, 10, 5, 5, 0],
            [0, 5, 10, 10, 80, 10, 5, 0],
            [5, 5, 10, 80, 10, 10, 5, 5],
            [5, 10, 10, 5, 80, 80, 10, 5],
            [5, 10, 10, 60, 10, 10, 10, 5],
            [5, 5, 5, 5, 5, 5, 5, 5]
        ],
        correct: [{ "row": 1, "col": 3 }, { "row": 1, "col": 4 }, { "row": 2, "col": 4 }, { "row": 3, "col": 5 }]
    },
    {
        name: 'level 14',
        size: { col: 8, row: 7 },
        map: [
            [5, 5, 5, 5, 5, 5, 5, 5],
            [5, 10, 10, 5, 10, 10, 10, 5],
            [5, 10, 80, 10, 10, 80, 10, 5],
            [5, 60, 80, 10, 10, 10, 5, 5],
            [5, 10, 80, 10, 10, 80, 10, 5],
            [5, 10, 10, 5, 10, 10, 10, 5],
            [5, 5, 5, 5, 5, 5, 5, 5]
        ],
        correct: [{ "row": 2, "col": 3 }, { "row": 2, "col": 4 }, { "row": 3, "col": 3 }, { "row": 4, "col": 3 }, { "row": 4, "col": 4 }]
    },
    {
        name: 'level 15',
        size: { col: 8, row: 7 },
        map: [
            [0, 5, 5, 5, 5, 5, 5, 0],
            [5, 5, 10, 10, 10, 10, 5, 5],
            [5, 10, 80, 10, 80, 80, 10, 5],
            [5, 10, 10, 10, 10, 10, 10, 5],
            [5, 10, 80, 80, 10, 80, 10, 5],
            [5, 5, 5, 10, 60, 5, 5, 5],
            [0, 0, 5, 5, 5, 5, 0, 0]
        ],
        correct: [{ "row": 3, "col": 1 }, { "row": 3, "col": 2 }, { "row": 3, "col": 3 }, { "row": 3, "col": 4 }, { "row": 3, "col": 5 }, { "row": 3, "col": 6 }]
    }
];