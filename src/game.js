class Game {
    constructor(ctx) {
        this.ctx = ctx;
        this.setIntervalId = null;
        this.drawCount = 0;

        this.bg = new Background(ctx);
        this.dragon = new Dragon(ctx);
        this.enemies = [];
        this.coins = [];
        this.score = 0;
    }

    start() {
        this.setIntervalId = setInterval(() => {
            this.clear();
            this.draw();
            this.move();
            this.addCoin();
            this.addEnemie();
            if (this.drawCount++ > 1000) {
                this.drawCount = 0;
            };
            this.coinCatch();
            this.enemieCollision();
        }, 1000 / 60);
    }

    draw() {
        this.bg.draw();
        this.dragon.draw();
        this.coins.forEach((coin) => coin.draw())
        this.enemies.forEach((enemie) => enemie.draw())
    }

    move() {
        this.bg.move();
        this.dragon.move();
        this.coins.forEach((coin) => coin.move())
        this.enemies.forEach((enemie) => enemie.move())
    }

    clear() {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        this.clearCoin();
        this.clearEnemie();
    }

    addCoin() {
        if (this.drawCount % Math.PI) {
            return
        }
        this.coins.push(new Coin(this.ctx));
    }

    clearCoin() {
        this.coins = this.coins.filter(coin => !coin.isCatched)
    }

    coinCatch() {
        const isCatch = this.coins.some(coin => coin.isCatch(this.dragon));
        if (isCatch) {
            this.score++
            console.log(this.score)
        }
        return isCatch;
    }

    addEnemie() {
        if (this.drawCount % 100) {
            return
        }
        this.enemies.push(new Enemie(this.ctx));
    }

    clearEnemie() {
        this.enemies = this.enemies.filter(enemie => !enemie.isCatched)
    }

    enemieCollision() {
        const isCatch = this.enemies.some(enemie => enemie.isCatch(this.dragon));
        if (isCatch) {
            this.score = this.score - 5;
            console.log(this.score)
        }
        return isCatch;
    }

    enemieFired() {
        const isFired = this.enemies.some(enemie => enemie.isCatch(this.dragon.fireballs.x0))
        if (isFired) {
            this.score += 5;
            console.log(this.score)
        }
        return isFired;
    }
}