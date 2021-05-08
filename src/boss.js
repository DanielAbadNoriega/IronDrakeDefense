class Boss {
    constructor(ctx) {
        this.ctx = ctx;

        this.w = 200;
        this.h = 150;

        this.x = Math.random() * (this.ctx.canvas.width - this.w) + 100;
        this.y = -this.h;

        this.vy = 0.3;
        this.vx = 0.3;
        this.xRandom = Math.sign(Math.random() - 0.5);
        this.isCatched = false;
        this.hits = 0;

        this.bosses = ['./Images/bossOneM.png']
        this.img = new Image();
        this.img.src = this.randomEnemie();

        this.img.frames = 3;
        this.img.frameIndex = 0;
        this.tick = 0;
    }

    randomEnemie() {
        const indexRandom = Math.floor(Math.random() * (this.bosses.length));
        const bossRandom = this.bosses[indexRandom];
        return bossRandom;
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
        this.x += this.vx * this.xRandom;
    }

    animate() {
        if (this.tick++ >= 6) {
            this.tick = 0;
            this.img.frameIndex++;
        }
        //resetamos los frames
        if (this.img.frameIndex >= this.img.frames) {
            this.img.frameIndex = 0;
        }
    }

    isCatch(el) {
        const collideX = el.x0 + el.w > this.x && el.x0 < this.x + this.w;
        const collideY = el.y0 < this.y + this.h && el.y0 + el.h > this.y;

        if (collideX && collideY) {
            this.hits++;
            console.log(this.hits)
            if(this.hits = 5){
                this.isCatched = true
            }
        }
        return collideX && collideY;
    }

    mapLimits() {

        if (this.x + this.w === this.ctx.canvas.width) {
            this.vx *= -1;
        } else if (this.x + this.w > this.ctx.canvas.width) {
            this.x = this.ctx.canvas.width - (this.w);
            this.vx *=-1;
        }

        if (this.x < 0) {
            this.vx *= -1;
        }
    }
}