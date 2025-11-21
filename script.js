console.log("Block Puzzle AMS Loaded");

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

let block = { x: 140, y: 100, size: 80 };

function update() {
    draw();
    requestAnimationFrame(update);
}

function draw() {
    ctx.fillStyle = "#333";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "cyan";
    ctx.fillRect(block.x, block.y, block.size, block.size);
}

update();
