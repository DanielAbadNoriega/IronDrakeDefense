window.onload = () => {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    const s = getComputedStyle(canvas);
    const buttonRemove = document.getElementById("button-game-over");

    let game = new Game(ctx, s)

    document.addEventListener("keypress", () => {
        if (!game.isStarted && !game.mustReload) {
            console.log("entro")
            game.start();
        } else if (game.mustReload) {
            console.log("resteo!");
            game.restart();
        }
    });
}