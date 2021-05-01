class Fireball {
    constructor(ctx) {
        this.ctx = ctx
        this.x = x0
        this.y = y0
        this.vy = 15
        this.r = 2
    }

    draw() {
        this.ctx.beginPath();
        this.ctx.arc(
            this.x,
            this.y,
            this.r,
            0,
            2 * Math.PI
        )
        this.ctx.fill();
        // TODO: draw circle
        this.ctx.closePath()
    }

    move() {
        this.x += this.vy
        // TODO: move circle
    }

    isVisible() {

        return this.x < this.ctx.canvas.width

        // TODO: is inside canvas?
    }
}