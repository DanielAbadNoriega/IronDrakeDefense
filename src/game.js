class Game {
    constructor(ctx) {
        this.ctx = ctx;
        this.setIntervalId = null;

        this.bg = new Background(ctx);
        this.dragon = new Dragon(ctx);
    }

    start() {
        this.setIntervalId = setInterval(() => {
            this.clear();
            this.draw();
            this.move();

        },1000 / 60);
    }

    draw() {
        this.bg.draw();
        this.dragon.draw();
    }

    move() {
        this.bg.move();
        this.dragon.move();
    }

    clear() {
        this.ctx.clearRect(0,0,this.ctx.canvas.width, this.ctx.canvas.height)
    }
}