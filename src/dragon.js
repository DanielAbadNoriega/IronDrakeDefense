class Dragon {
    constructor(ctx) {
        this.ctx = ctx;

        this.x = 400;
        this.y = 550;
/*         this.x = this.x;
        this.y = this.y; */

        this.w = 200;
        this.h = 200;

        this.vx = 0;
        this.vy = 0;
        this.g = 0.6;

        this.action = {
            right: false,
            left: false,
            up: false,
            down: false,
            space: false
        }

        this.img = new Image();
        this.img.src = './Images/Drake&WolfM.png'

        this.img.frames = 4;
        this.img.frameIndex = 0;
        this.ticks = 0;
        this.coldown = 0;

        this.setListeners();

        this.weapon = new Weapon(this);
    }

    draw() {
        this.ctx.drawImage(
            this.img,
            this.img.frameIndex * this.img.width / this.img.frames,
            0,
            this.img.width / 4,
            this.img.height,
            this.x,
            this.y,
            this.w,
            this.h
        )
        this.weapon.draw();
    }

    //Movimientos en ejes
    move() {
        this.animate();
        this.applyActions();
        this.mapLimits();
        this.weapon.move();

        this.x += this.vx;
        this.vy += this.g;
        this.y += this.vy;
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
            case SPACE:
                this.action.shoot = action
                break;
        }
    }

    //Aplicamos velocidad
    applyActions() {
        if (this.action.up) {
            this.vy -= 0.8;
        } else if (this.action.down) {
            this.vy += 0.4;
        } else {
            this.vy = 0;
        }

        if (this.action.right) {
            this.vx += 0.1;
        } else if (this.action.left) {
            this.vx -= 0.1;
        } else {
            this.vx = 0;
        }

        if(this.action.shoot) {
            if(this.coldown++ >=15){
                this.coldown = 0;
                this.weapon.shoot();
            }
        }
    }

    //Definimos limites
    mapLimits() {
        if (this.y + this.h >= this.ctx.canvas.height) {
            this.vy = 0;
            this.y = (this.ctx.canvas.height -this.h)-2;
        }
        if (this.y <= 0) {
            this.y = 1;
            this.vy = 0;
        }

        if (this.x + this.w >= this.ctx.canvas.width) {
            this.x = (this.ctx.canvas.width - this.w)-2;
        }

        if (this.x < 0) {
            /* this.x *= -1; */
            this.x = 2;
        }
    }

    isCollide(el) {
        const collideX = el.x + el.w > this.x && el.x < this.x + this.w;
        const collideY = el.y < this.y + this.h && el.y + el.h > this.y;
        console.log("collideX",collideX, "collideY", collideY)
        return collideX && collideY;
    }
}