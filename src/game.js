class Game {
    constructor(ctx) {
        this.ctx = ctx;
        this.setIntervalId = null;
        this.drawCount = 0;

        this.bg = new Background(ctx);
        this.dragon = new Dragon(ctx);
        this.coins = []
    }

    start() {
        this.setIntervalId = setInterval(() => {
            this.clear();
            this.draw();
            this.move();
            this.addCoin();
            if(this.drawCount++ > 1000){
                this.drawCount = 0;
            };

        }, 1000 / 60);
    }

    addCoin() {
        if(this.drawCount % Math.PI) {
            return
        }
        this.coins.push(new Coin(this.ctx));
    }

    draw() {
        this.bg.draw();
        this.dragon.draw();
        this.coins.forEach((coin) => coin.draw())
    }

    move() {
        this.bg.move();
        this.dragon.move();
        this.coins.forEach((coin) => coin.move())
    }

    clear() {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height)
    }

}