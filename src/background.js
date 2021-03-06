class Background {
    constructor(ctx,s) {
        this.ctx = ctx;
        this.s = s;

        this.x = 0;
        this.y = 0;
        this.w = this.ctx.canvas.width;
        this.h = this.ctx.canvas.height;

        this.vy = 1;

        this.img = new Image();
        this.img.src = "./Images/background.png";
    }

    draw() {
        this.ctx.drawImage(
            this.img,
            this.x,
            this.y,
            this.w,
            this.h
            )

        this.ctx.drawImage(
            this.img,
            this.x,
            this.y - this.h,
            this.w,
            this.h
            )
    }

    move() {
        this.y += this.vy;
        if(this.y >= this.h) {
            this.y = 0;
        }
    }
}