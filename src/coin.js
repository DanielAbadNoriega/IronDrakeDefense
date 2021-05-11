class Coin {
    constructor(ctx) {
        this.ctx = ctx;

        this.w = 100;
        this.h = 75;

        this.x = Math.floor(Math.random() * (this.ctx.canvas.width - this.w)+10);
        this.y = -this.h;

        this.vy = 0.3;
        this.isCatched = false

        this.img = new Image();
        this.img.src = './Images/coin.sprite.png'

        this.img.frames = 4;
        this.img.frameIndex = 0;
        this.tick = 0;
    }

    draw() {
        //ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)
        this.ctx.drawImage(
            this.img,
            this.img.width * this.img.frameIndex / this.img.frames,
            0,
            this.img.width / this.img.frames,
            this.img.height,
            this.x,
            this.y,
            this.w,
            this.h,
        )
    }

    move() {
        this.animate();
        this.mapLimits();
        this.y += this.vy;
    }

    animate() {
        if (this.tick++ >= 7) {
            this.tick = 0;
            this.img.frameIndex++;
        }
        //resetamos los frames
        if (this.img.frameIndex >= 4) {
            this.img.frameIndex = 0;
        }
    }

    isCatch(el) {
        const collideX = el.x + el.w > this.x && el.x < this.x + this.w;
        const collideY = el.y < this.y + this.h && el.y + el.h > this.y;

        if (collideX && collideY) {
            this.isCatched = true
        }
        return collideX && collideY;
    }

    mapLimits() {
        if (this.x + this.w >= this.ctx.canvas.width) {
            this.x = this.ctx.canvas.width - this.w;
        }

        if (this.x < 0) {
            this.x = 100;
        }
    }
}