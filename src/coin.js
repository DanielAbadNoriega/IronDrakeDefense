class Coin {
    constructor(ctx) {
        this.ctx = ctx;

        this.w = 50;
        this.h = 50;
        
        this.x = Math.floor(Math.random() * this.ctx.canvas.width-this.w);
        this.y = -this.h;

        this.vy = 0.3;

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

        this.y += this.vy;
    }

    animate() {
        if (this.tick++ >= 5) {
            this.tick = 0;
            this.img.frameIndex++;
        }
        //resetamos los frames
        if (this.img.frameIndex >= 4) {
            this.img.frameIndex = 0;
    }
    }
}