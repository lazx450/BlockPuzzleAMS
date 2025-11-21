const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 300;
canvas.height = 500;

// warna block
let color = "#00FFD5";

// posisi awal
let block = {
    x: 120,
    y: 20,
    size: 50
};

function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = color;
    ctx.fillRect(block.x, block.y, block.size, block.size);

    block.y += 3; // block turun

    if (block.y + block.size > canvas.height) {
        block.y = 20; // reset naik lagi
    }

    requestAnimationFrame(update);
}

update();    requestAnimationFrame(loop);
}

loop();
