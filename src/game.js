class Game {
    constructor(ctx) {
        this.ctx = ctx;
        this.setIntervalId = null;
        this.drawCount = 0;

        this.bg = new Background(ctx);
        this.dragon = new Dragon(ctx);
        this.bosses = [];
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
            this.drawScore();
            this.gameOver();
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

    // Coin Methods
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
            this.score += 100
            console.log(this.score)
        }
        return isCatch;
    }

    // Enemie Methods
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

    // Boss Methods

    addBoss() {
        if (this.drawCount % 100) {
            return
        }
        this.bosses.push(new Boss(this.ctx));
    }

    bossCollision() {
        const isCatch = this.bosses.some(boss => boss.isCatch(this.dragon));
        if (isCatch) {
            this.score = this.score - 100;
            console.log(this.score)
        }
        return isCatch;
    }

    clearBoss() {
        this.bosses = this.bosses.filter(boss => !boss.isCatched)
    }

    bossFired() {
        const fireballs = this.dragon.weapon.fireballs
        const isFired = this.bosses.some(boss => {
            return fireballs.some(fireball => {
                return boss.isCatch(fireball)
            })
        });

        if (isFired) {
            this.score += 100;
            console.log(this.score)
        }
        return isFired;
    }

    drawScore() {
        this.ctx.font = '30px serif';
        this.ctx.fillStyle = 'black';
        this.ctx.fillText('Score: ' + this.score, 50, 50);
    }

    gameOver() {
        if(this.score <= 0 && this.enemieCollision()){
            clearInterval(this.setIntervalId)
    
            this.ctx.font = "40px Comic Sans MS";
            this.ctx.textAlign = "center";
            this.ctx.fillText(
                "GAME OVER",
                this.ctx.canvas.width / 2,
                this.ctx.canvas.height / 2
            );
        }
        }
}