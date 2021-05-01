class Weapon {
    constructor(shooter) {
        this.shooter = shooter;
        this.fireballs = []
    }

    shoot() {
        const fireball = new Fireball(
            this.shooter.ctx,
            this.shooter.x0 + this.shooter.w * 0.8,
            this.shooter.y0 + this.shooter.h * 0.9,
        )

        this.fireballs.push(fireball)
    }

    clearFireballs() {
        this.fireballs = this.fireballs.filter(b => b.isVisible())
    }

    draw() {
        this.clearFireballs();
        this.fireballs.forEach(b => b.draw())
    }

    move() {
        this.fireballs.forEach(b => b.move())
    }
}