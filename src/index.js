window.onload = () => {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    const s = getComputedStyle(canvas)

    const game = new Game(ctx,s)
    document.addEventListener("keydown", (event) => {
        if (!game.isStarted) {
            /* intro.remove(); */
            game.start();
        }
    })
}

/* 
window.onload = () => {
    const ctx = document.getElementById("canvas").getContext("2d");
    const intro = document.getElementById("game-intro");
    const buttonRemove = document.getElementById("button-game-over")
    // aqui ocultaré el boton
    const game = new Game(ctx);​
    document.addEventListener("keyup", (event) => {
        game.onKeyEvent(event);
    });​
    document.addEventListener("keypress", (event) => {
        if (event.keyCode === UP && !game.isStarted) {
            intro.remove();
            game.start();
        }
    });
}; */