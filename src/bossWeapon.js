class BossWeapon {
    constructor(shooter) {
        this.shooter = shooter;
        this.bossFireballs = [];
        this.coldown = 0;
    }

    shoot() {
        const bossFireball = new BossFireball(
            this.shooter.ctx,
            this.shooter.x + this.shooter.w/3,
            this.shooter.y + this.shooter.h/2,
        )

        this.bossFireballs.push(bossFireball)
    }
    
    draw() {
        this.clearFireballs();
        this.bossFireballs.forEach(fire => fire.draw())
        if(this.coldown++ >= 200){
            this.shoot();
            this.coldown = 0;
        }
    }
    
    clearFireballs() {
        this.bossFireballs = this.bossFireballs.filter(b => b.isVisible())
    }

    move() {
        this.bossFireballs.forEach(fire => fire.move())
    }
}