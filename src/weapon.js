class Weapon {
    constructor(shooter) {
        this.shooter = shooter;
        this.fireballs = []
    }

    shoot() {
        const fireball = new Fireball(
            this.shooter.ctx,
            this.shooter.x + this.shooter.w/4,
            this.shooter.y - this.shooter.h,
        )

        this.fireballs.push(fireball)
    }
    
    draw() {
        this.clearFireballs();
        this.fireballs.forEach(fire => fire.draw())
    }
    
    clearFireballs() {
        this.fireballs = this.fireballs.filter(b => b.isVisible())
    }

    move() {
        this.fireballs.forEach(fire => fire.move())
    }
}