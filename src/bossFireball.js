class BossFireball {
    constructor(ctx, x, y) {
        this.ctx = ctx
        this.x = x;
        this.y = y;
        this.w = 100;
        this.h = 100;
        this.vy = 5;

        this.img = new Image();
        this.img.src = "./Images/bossFireball_bg.png";
        this.img.frames = 6;
        this.img.frameIndex = 0;
        this.ticks = 0;
        this.isCollided = false;
    }

    draw() {
        this.ctx.drawImage(
            this.img,
            0,
            this.img.frameIndex * this.img.height / this.img.frames,
            this.img.width,
            this.img.height / this.img.frames,
            this.x,
            this.y,
            this.w,
            this.h
        )
        this.animate();
    }

    move() {
        this.y += this.vy;
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
        return this.y < this.ctx.canvas.height
    }

    isCollide(el) {
        const collideX = el.x + el.w > this.x && el.x < this.x + this.w;
        const collideY = el.y < this.y + this.h && el.y + el.h > this.y;

        return collideX && collideY;
    }
}