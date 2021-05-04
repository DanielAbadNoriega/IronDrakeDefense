class Fireball {
    constructor(ctx, x, y) {
        this.ctx = ctx
        this.x0 = x;
        this.y0 = y;
        this.w = 100;
        this.h = 200;
        this.vy = -10;

        this.img = new Image();
        this.img.src = "./Images/fireball_bg.png";
        this.img.frames = 6;
        this.img.frameIndex = 0;
        this.ticks = 0;
    }

    draw() {
        this.ctx.drawImage(
            this.img,
            0,
            this.img.frameIndex * this.img.height / this.img.frames,
            this.img.width,
            this.img.height / this.img.frames,
            this.x0,
            this.y0,
            this.w,
            this.h
        )
        this.animate();
    }

    move() {
        
        this.y0 += this.vy;
    }

    animate() {
        if (this.ticks++ >= 4) {
            this.ticks = 0;
            this.img.frameIndex++;
            if (this.img.frameIndex >= this.img.frames) {
                this.img.frameIndex = 0;
            }
        }
        
    }

    isVisible() {
        return this.y0 < this.ctx.canvas.width
    }
}