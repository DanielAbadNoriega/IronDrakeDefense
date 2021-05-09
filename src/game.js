class Game {
    constructor(ctx, s) {
        this.ctx = ctx;
        this.s = s;
        this.setIntervalId = null;
        this.drawCount = 0;

        this.bg = new Background(ctx, s);
        this.dragon = new Dragon(ctx);
        this.bosses = [];
        this.enemies = [];
        this.coins = [];
        this.fireballs = [];
        this.score = 0;
        this.isStarted = false;
        this.mustReload = false;
        this.buttonGO = document.getElementById("button-game-over")
    }

    start() {
        this.isStarted = true;
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
            this.checkCollisions();
            this.drawScore();
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

    clearEnemie() {
        this.enemies = this.enemies.filter(enemie => !enemie.isCatched)
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
        let fireballs = this.dragon.weapon.fireballs;

        let ballBoss = this.bosses.some(boss => {
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

        let ballEnemie = this.enemies.some(enemie => {
            return fireballs.some(fireball => {
                if (fireball.isCollide(enemie)) {
                    fireball.isCollided = true
                    enemie.isCatched = true;
                    this.score += 5;
                    return true
                } else {
                    return false
                }
            })
        })

        let allEnemies = [...this.enemies, ...this.bosses];

        let dragonCollide = allEnemies.some(enemy => {
            if (this.dragon.isCollide(enemy)) {
                this.gameOver();
            }
        });
    }

    drawScore() {
        this.ctx.font = '70px serif';
        this.ctx.fillStyle = 'white';
        this.ctx.fillText('Score: ' + this.score, this.ctx.canvas.width-400, this.ctx.canvas.height-100);
    }

    restart() {
            this.setIntervalId = null;
            this.drawCount = 0;
            this.bosses = [];
            this.enemies = [];
            this.coins = [];
            this.fireballs = [];
            this.score = 0;
            this.isStarted = false;
            this.mustReload = false;
            this.clear();
            this.start();
    }

    gameOver() {
        clearInterval(this.setIntervalId);
        this.mustReload = true;
        this.buttonGO.style.display = 'block';
        this.ctx.font = "40px Comic Sans MS";
        this.ctx.textAlign = "center";
        this.ctx.fillText(
            this.ctx.fillStyle = 'red',
            "GAME OVER",
            this.ctx.canvas.width -400,
            this.ctx.canvas.height -100
        );
    }
}