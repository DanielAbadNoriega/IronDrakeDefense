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
        this.fireballs = [];
        this.score = 0;
    }

    start() {
        this.setIntervalId = setInterval(() => {
            this.clear();
            this.draw();
            this.move();
            this.addCoin();
            this.addEnemie();
            this.addBoss();
            if (this.drawCount++ > 1000) {
                this.drawCount = 0;
            };
            this.coinCatch();
            this.enemieCollision();
            this.enemieFired();
            this.enemieScore();
            this.checkCollisions();
            this.drawScore();
            this.gameOver();
        }, 1000 / 60);
    }

    draw() {
        this.bg.draw();
        this.dragon.draw();
        this.coins.forEach((coin) => coin.draw())
        this.enemies.forEach((enemie) => enemie.draw())
        this.bosses.forEach((boss) => boss.draw());
    }

    move() {
        this.bg.move();
        this.dragon.move();
        this.coins.forEach((coin) => coin.move())
        this.enemies.forEach((enemie) => enemie.move())
        this.bosses.forEach((boss) => boss.move());
    }

    clear() {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        this.clearCoin();
        this.clearEnemie();
        this.clearBoss();
        this.clearFire();
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
        return isFired;
    }

    enemieScore() {
        if (this.enemieFired())
            this.score += 5;
    }

    // Boss Methods

    addBoss() {
        if (this.drawCount % 100) {
            return
        }
        this.bosses.push(new Boss(this.ctx));
    }

    clearBoss() {
        this.bosses = this.bosses.filter(boss => boss.hits < 6)
    }

    //Fire Methods

    clearFire() {
        this.dragon.weapon.fireballs = this.dragon.weapon.fireballs.filter(fireball => !fireball.isCollided)
    }

    checkCollisions() {
        const fireballs = this.dragon.weapon.fireballs;

        const ballBoss = this.bosses.some(boss => {
            return fireballs.some(fireball => {
                if (fireball.isCollide(boss)) {
                    fireball.isCollided = true
                    boss.hits++
                    if (boss.hits === 6) {
                        this.score += 100
                    }
                    return true
                } else {
                    return false
                }
            })
        })
        return ballBoss;

        // const allEnemies = [...this.enemies, ...this.bosses]
        // const dragonAllEnemies = allEnemies.some(enemy => {
        //     return dragon.collideWith(enemy))
        // })

    }

    drawScore() {
        this.ctx.font = '30px serif';
        this.ctx.fillStyle = 'black';
        this.ctx.fillText('Score: ' + this.score, 50, 50);
    }

    gameOver() {
        if (this.score <= 0 && this.enemieCollision()) {
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