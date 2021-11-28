const gameDom = document.querySelector(".game");
const landDom = document.querySelector(".land");
const gameStyles = getComputedStyle(gameDom);
const landStyles = getComputedStyle(landDom);
const landHeight = parseFloat(landStyles.height);
const landTop = parseFloat(landStyles.top);
const gameHeight = parseFloat(gameStyles.height);
const gameWidth = parseFloat(gameStyles.width);
class Rectangle {

    constructor(width, height, left, top, xSpeed, ySpeed, dom) {
        this.width = width;
        this.height = height;
        this.left = left;
        this.top = top;
        this.xSpeed = xSpeed;
        this.ySpeed = ySpeed;
        this.dom = dom;
        this.render();
    }


    render() {
        this.dom.style.width = this.width + "px";
        this.dom.style.height = this.height + "px";
        this.dom.style.left = this.left + "px";
        this.dom.style.top = this.top + "px";
    }

    move(duration) {
        this.left = this.left + this.xSpeed * duration;
        this.top = this.top + this.ySpeed * duration;
        typeof (this.onMoving) === "function" && this.onMoving();
        this.render();
    }
}

class Sky extends Rectangle {
    constructor() {
        const dom = document.querySelector(".sky");
        const styles = getComputedStyle(dom);
        super(parseFloat(styles.width), parseFloat(styles.height), 0, 0, -50, 0, dom);
    }

    onMoving() {
        if (this.left <= - this.width / 2) {
            this.left = 0;
        }
    }
}

class Land extends Rectangle {
    constructor(speed) {
        const styles = getComputedStyle(landDom);
        super(parseFloat(styles.width), parseFloat(styles.height), 0, parseFloat(styles.top), speed, 0, landDom);
    }

    onMoving() {
        if (this.left <= - this.width / 2) {
            this.left = 0;
        }
    }
}

class Bird extends Rectangle {
    constructor() {
        const dom = document.querySelector(".bird");
        const styles = getComputedStyle(dom);
        super(parseFloat(styles.width), parseFloat(styles.height), parseFloat(styles.left), parseFloat(styles.top), 0, 0, dom);
        this.maxY = gameHeight - this.height - landHeight;
        this.timer = null;
        this.curSwingStatus = 1;
        this.g = 1500; // 每毫秒下降15像素
        this.render();
    }

    startFly() {
        if (this.timer) return;
        this.timer = setInterval(() => {
            this.curSwingStatus = (this.curSwingStatus + 1) == 4 ? 1 : (this.curSwingStatus + 1);
            this.render();
        }, 100);
    }

    stopFly() {
        clearInterval(this.timer);
        this.timer = null;
    }

    render() {
        this.dom.className = `bird swing${this.curSwingStatus}`;
        super.render();
    }

    onMoving() {
        if (this.top < 0) {
            this.top = 0;
        }
        else if (this.top > this.maxY) {
            this.top = this.maxY;
        }
    }

    jump() {
        this.ySpeed = -450;
    }

    move(duration) {
        super.move(duration);
        this.ySpeed += this.g * duration;
    }
}

class Pipe extends Rectangle {
    constructor(height, top, speed, dom) {
        super(52, height, gameWidth, top, speed, 0, dom);
    }

    onMoving() {
        if (this.left < -this.width) {
            this.dom.remove();
        }
    }
}

function getRandomHeight(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

class PipePair {
    constructor(speed) {
        this.spaceHeight = 150;
        this.minHeight = 80;
        this.maxHeight = landTop - this.minHeight - this.spaceHeight;

        const upPipeHeight = getRandomHeight(this.minHeight, this.maxHeight);
        const upPipeDom = document.createElement("div");
        upPipeDom.className = "pipe up";
        this.upPipe = new Pipe(upPipeHeight, 0, speed, upPipeDom);

        const downPipeHeight = landTop - upPipeHeight - this.spaceHeight;
        const downPipeDom = document.createElement("div");
        downPipeDom.className = "pipe down";
        const downPipeDomTop = landTop - downPipeHeight;
        this.downPipe = new Pipe(downPipeHeight, downPipeDomTop, speed, downPipeDom);

        gameDom.appendChild(upPipeDom);
        gameDom.appendChild(downPipeDom);
    }

    get hidden() {
        return this.upPipe.left <= -this.upPipe.width;
    }

    move(duration) {
        this.upPipe.move(duration);
        this.downPipe.move(duration);
    }
}

class PipePairFactory {
    constructor(speed) {
        this.speed = speed;
        this.pipePairs = [];
        this.newTimer = null;
        this.moveTimer = null;
        this.tick = 1500;
    }

    startNew() {
        if (this.newTimer) return;

        this.newTimer = setInterval(() => {
            this.pipePairs.push(new PipePair(this.speed));
            for (let o = 0; o < this.pipePairs.length; o++) {
                const pipePair = this.pipePairs[o];
                console.log(pipePair.hidden);
                if (pipePair.hidden) {
                    this.pipePairs.splice(o, 1);
                    o--;
                }
            }
        }, this.tick);
        this.startRun();
    }

    startRun() {
        if (this.moveTimer) return;
        this.moveTimer = setInterval(() => {
            this.pipePairs.forEach(pipePair => {
                pipePair.move(16 / 1000);
            });
        }, 16);
    }


    stopNew() {
        clearInterval(this.newTimer);
        clearInterval(this.moveTimer);
        this.newTimer = null;
        this.moveTimer = null;
    }
}

class Game {
    constructor() {
        const speed = -100;
        this.sky = new Sky();
        this.land = new Land(speed);
        this.bird = new Bird();
        this.pipePireFactory = new PipePairFactory(speed);
        this.tick = 16;
        this.speed = this.tick / 1000;
        this.timer = null;
        this.gameOver = false;
        this.bindEvent();
    }

    isGameOver() {
        if (this.bird.top == this.bird.maxY) {
            return true;
        }

        // 获取在小鸟区域的柱子对
        const pipePair = this.pipePireFactory.pipePairs.find(pipePair => {
            const pipePairLeft = pipePair.upPipe.left;
            const pipePairRight = pipePair.upPipe.left + pipePair.upPipe.width;
            return pipePairLeft <= this.bird.left && this.bird.left <= pipePairRight;
        });

        return pipePair && (this.isConflict(this.bird, pipePair.upPipe) || this.isConflict(this.bird, pipePair.downPipe));
    }

    isConflict(rec1, rec2) {
        // 碰撞检测：两矩形中心点距离小于两矩形长度的一半
        const centerX1 = rec1.left + rec1.width / 2;
        const centerY1 = rec1.top + rec1.height / 2;
        const centerX2 = rec2.left + rec2.width / 2;
        const centerY2 = rec2.top + rec2.height / 2;
        const disX = Math.abs(centerX1 - centerX2);
        const disY = Math.abs(centerY1 - centerY2);
        return disX < (rec1.width + rec2.width) / 2 &&
            disY < (rec1.height + rec2.height) / 2;
    }

    start() {
        if (this.timer) return;
        if (this.gameOver) {
            location.reload();
            return;
        }
        this.bird.startFly();
        this.pipePireFactory.startNew();
        this.timer = setInterval(() => {
            this.sky.move(this.speed);
            this.land.move(this.speed);
            this.bird.move(this.speed);
            if (this.isGameOver()) {
                this.stop();
                this.gameOver = true;
            }
        }, this.tick);
    }

    stop() {
        clearInterval(this.timer);
        this.timer = null;
        this.bird.stopFly();
        this.pipePireFactory.stopNew();
    }

    bindEvent() {
        window.addEventListener("keyup", e => {
            if (e.key == "Enter") {
                if (this.timer) {
                    this.stop();
                }
                else {
                    this.start();
                }
            }
            else if (e.key == " ") {
                this.bird.jump();
            }
        });
    }
}

var game = new Game();
