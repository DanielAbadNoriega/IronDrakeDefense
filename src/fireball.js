class Fireball {
    constructor(ctx, x, y) {
        this.ctx = ctx
        this.x0 = x;
        this.y0 = y;
        this.w = 100;
        this.h = 100;
        this.vy = -15;

        this.img = new Image();
        this.img.src = "./Images/fireball_bg.png";
        this.img.frames = 6;
        this.img.frameIndex = 0;
        this.tick = 0;
    }

    draw() {
        this.ctx.drawImage(
            this.img,
            0,
            this.img.frameIndex + this.img.height / this.img.frames,
            this.img.width,
            this.img.height / this.img.frames,
            this.x0-80,
            this.y0-80,
            this.w,
            this.h
        )
    }

    move() {
        this.animate();
        this.y0 += this.vy;
    }

    animate() {
        if (this.tick++ >= 5) {
            this.tick = 0;
            this.img.frameIndex++;
        }
        if (this.img.frameIndex >= this.img.frames) {
            this.img.frameIndex = 0;
        }
    }

    isVisible() {
        return this.y0 < this.ctx.canvas.width
    }
}