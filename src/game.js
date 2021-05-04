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
            this.enemieFired();
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
            this.score +=100
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

    enemieCollision() {
        const isCatch = this.enemies.some(enemie => enemie.isCatch(this.dragon));
        if (isCatch) {
            this.score = this.score - 5;
            console.log(this.score)
        }
        return isCatch;
    }

    clearEnemie() {
        this.enemies = this.enemies.filter(enemie => !enemie.isCatched)
    }


    enemieFired() {
        const fireballs = this.dragon.weapon.fireballs
        const isFired = this.enemies.some(enemie => {
            return fireballs.some(fireball => {
                return enemie.isCatch(fireball)
            })
        });

        if (isFired) {
            this.score += 5;
            console.log(this.score)
        }
        return isFired;
    }
}