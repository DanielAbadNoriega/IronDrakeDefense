class Dragon {
    constructor(ctx) {
        this.ctx = ctx;

        this.x = 400;
        this.y = 750;
        this.x0 = this.x;
        this.y0 = this.y;

        this.w = 200;
        this.h = 80;

        this.vx = 0;
        this.vy = 0;
        this.g = 0.6;

        this.action = {
            right: false,
            left: false,
            up: false,
            down: false
        }

        this.img = new Image();
        this.img.src = './Images/dragon.png'

        this.img.frames = 3;
        this.img.frameIndex = 0;
        this.ticks = 0;

        this.setListeners();
    }

    draw() {
        this.ctx.drawImage(
            this.img,
            this.img.frameIndex * this.img.width / this.img.frames,
            0,
            this.img.width / 3,
            this.img.height,
            this.x0,
            this.y0,
            this.w,
            this.h
        )
    }

    //Movimientos en ejes
    move() {
        this.animate();
        this.applyActions();
        this.mapLimits();
        this.x0 += this.vx;
        this.vy += this.g;
        this.y0 += this.vy;
    }

    //Animamos al pj
    animate() {
        if (this.ticks++ >= 10) {
            this.ticks = 0;
            this.img.frameIndex++;
            if (this.img.frameIndex >= this.img.frames) {
                this.img.frameIndex = 0;
            }
        }
    }

    //Recogemos las teclas pulsadas
    setListeners() {
        document.onkeydown = e => this.onKeyEvent(e.keyCode, true);
        document.onkeyup = e => this.onKeyEvent(e.keyCode, false);
    }

    //Activamos las direcciones según teclas pulsadas
    onKeyEvent(keyCode, action) {
        switch (keyCode) {
            case RIGHT:
                this.action.right = action;
                break;
            case LEFT:
                this.action.left = action;
                break;
            case UP:
                this.action.up = action;
                break;
            case DOWN:
                this.action.down = action;
                break;
        }
    }

    //Aplicamos velocidad
    applyActions() {
        if (this.action.up) {
            this.vy -= 0.8;
        } else {
            this.vy = 0;
        }

        if (this.action.right) {
            this.vx += 0.05;
        } else if (this.action.left) {
            this.vx -= 0.05;
        } else {
            this.vx = 0;
        }

        if (this.action.down) {
            this.y0 = this.y;
            this.x0 = this.x;
        }
    }

    //Definimos limites
    mapLimits() {
        if (this.y0 + this.h >= this.ctx.canvas.height) {
            this.vy = 0;
            this.y0 = 818;
        }
        if(this.y0 <= 0) {
            this.y0 = 1;
            this.vy = 0;
        }

        if (this.x0 + this.w >= this.ctx.canvas.width) {
            this.x0 = this.ctx.canvas.width - this.w;
        }

        if(this.x0 < 0) {
            this.x0 *= -1;
        }
    }
}