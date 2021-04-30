class Dragon {
    constructor(ctx) {
        this.ctx = ctx;

        this.x = 400;
        this.y = 750;

        this.w = 200;
        this.h = 80;

        this.vx = 0;
        this.vy = 0;

        this.img = new Image();
        this.img.src = './Images/dragon.png'

        this.img.frames = 3;
        this.img.frameIndex = 0;
    }

    draw() {
        this.ctx.drawImage(
            this.img,
            this.img.frameIndex * this.img.width / this.img.frames,
            0,
            this.img.width / 3,
            this.img.height,
            this.x,
            this.y,
            this.w,
            this.h
        )
    }

    move() {
        this.animate();
    }

    animate() {
        this.img.frameIndex++;
        if (this.img.frameIndex >= this.img.frames) {
            this.img.frameIndex = 0;
        }
    }
}