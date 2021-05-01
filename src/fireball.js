class Fireball {
    constructor(ctx,x,y) {
        this.ctx = ctx
        this.x0 = x
        this.y0 = y
        this.vy = -15
        this.r = 2
    }

    draw() {
        this.ctx.beginPath();
        this.ctx.arc(
            this.x0,
            this.y0,
            this.r,
            0,
            2 * Math.PI
        )
        this.ctx.fill();
        // TODO: draw circle
        this.ctx.closePath()
    }

    move() {
        this.y0 += this.vy
        // TODO: move circle
    }

    isVisible() {

        return this.y0 < this.ctx.canvas.width

        // TODO: is inside canvas?
    }
}