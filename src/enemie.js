class Enemie {
    constructor(ctx) {
        this.ctx = ctx;

        this.w = 50;
        this.h = 50;

        this.x = Math.floor(Math.random() * this.ctx.canvas.width - this.w);
        this.y = -this.h;

        this.vy = 0.3;
        this.isCatched = false;

        this.img = new Image();
        this.img.src = './Images/enemies.png';

        this.img.frames = 11;
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

        this.y += this.vy;
    }

    animate() {
        if (this.tick++ >= 5) {
            this.tick = 0;
            this.img.frameIndex++;
        }
        //resetamos los frames
        if (this.img.frameIndex >= 11) {
            this.img.frameIndex = 0;
        }
    }

    isCatch(el) {
        const collideX = el.x0 + el.w > this.x && el.x0 < this.x + this.w;
        const collideY = el.y0 < this.y + this.h && el.y0 + el.h > this.y;

        if (collideX && collideY) {
            console.log('entro')
            this.isCatched = true
        }
        return collideX && collideY;
    }

    mapLimits() {

        if (this.x + this.w >= this.ctx.canvas.width) {
            this.x = this.ctx.canvas.width - this.w;
        }

        if (this.x < 0) {
            this.x = +10;
        }
    }
}