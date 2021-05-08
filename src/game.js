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
        this.isStarted= false;
        this.buttonGO = document.getElementById('button-game-over')
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

        const ballEnemie = this.enemies.some(enemie => {
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

        return ballBoss && ballEnemie;

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
            clearInterval(this.setIntervalId);
            this.buttonGO.style.display = 'block';
            this.ctx.font = "40px Comic Sans MS";
            this.ctx.textAlign = "center";
            this.ctx.fillText(
                "GAME OVER",
                this.ctx.canvas.width / 2,
                this.ctx.canvas.height / 2
            );
        }
    }

/*     restartButton() {
        let restartButton = document.querySelector(`.restart`);
        restartButton.innerHTML = `<button id="restart-button"></button>`;
        restartButton.addEventListener('click', function (event) {
            event.preventDefault()
            coronas = [];
            allSanitizers = [];
            allVaccins = [];
            allBottles = [];
            sanitizerCounter = 10;
            myGameArea.clear();
            player = new Player();
            myGameArea.start();
            restartButton.innerHTML = ``;
        });
    } */
}