const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 350;
canvas.height = 350;

const gridSize = 10;
const cell = canvas.width / gridSize;

let grid = [];
for (let i = 0; i < gridSize; i++) {
    grid[i] = Array(gridSize).fill(0);
}

// COLORS
const colors = ["#ff595e", "#ffca3a", "#8ac926", "#1982c4", "#6a4c93"];

// BLOCK SHAPES
let shapes = [
    [[1]],
    [[1,1]],
    [[1],[1]],
    [[1,1,1]],
    [[1],[1],[1]],
    [[1,1],[1,1]],
    [[1,1,1],[0,1,0]]
];

let holdingBlock = null;
let mouseX = 0, mouseY = 0;

function drawGrid() {
    ctx.fillStyle = "#222";
    ctx.fillRect(0,0,canvas.width,canvas.height);

    for (let r = 0; r < gridSize; r++){
        for (let c = 0; c < gridSize; c++){
            if (grid[r][c] !== 0) {
                ctx.fillStyle = grid[r][c];
                ctx.fillRect(c*cell, r*cell, cell-2, cell-2);
            } else {
                ctx.strokeStyle = "#444";
                ctx.strokeRect(c*cell, r*cell, cell, cell);
            }
        }
    }
}

function canPlace(block, row, col) {
    for (let r = 0; r < block.length; r++){
        for (let c = 0; c < block[0].length; c++){
            if (block[r][c] === 1){
                if (row+r >= gridSize || col+c >= gridSize) return false;
                if (grid[row+r][col+c] !== 0) return false;
            }
        }
    }
    return true;
}

function placeBlock(block,color,row,col) {
    for (let r = 0; r < block.length; r++){
        for (let c = 0; c < block[0].length; c++){
            if (block[r][c] === 1){
                grid[row+r][col+c] = color;
            }
        }
    }
}

function clearLines() {
    for (let r = 0; r < gridSize; r++){
        if (grid[r].every(v => v !== 0)){
            grid[r] = Array(gridSize).fill(0);
        }
    }

    for (let c = 0; c < gridSize; c++){
        let full = true;
        for (let r = 0; r < gridSize; r++){
            if (grid[r][c] === 0) full = false;
        }
        if (full){
            for (let r = 0; r < gridSize; r++){
                grid[r][c] = 0;
            }
        }
    }
}

function spawnBlock() {
    let shape = shapes[Math.floor(Math.random()*shapes.length)];
    let color = colors[Math.floor(Math.random()*colors.length)];
    holdingBlock = {shape,color};
}

canvas.addEventListener("mousedown", () => {
    if (!holdingBlock) spawnBlock();
});

canvas.addEventListener("mousemove", (e)=>{
    const rect = canvas.getBoundingClientRect();
    mouseX = e.clientX - rect.left - cell/2;
    mouseY = e.clientY - rect.top - cell/2;
});

canvas.addEventListener("mouseup", ()=>{
    if (!holdingBlock) return;

    let row = Math.floor(mouseY / cell);
    let col = Math.floor(mouseX / cell);

    if (canPlace(holdingBlock.shape,row,col)){
        placeBlock(holdingBlock.shape, holdingBlock.color, row, col);
        clearLines();
        holdingBlock = null;
    }
});

function loop() {
    drawGrid();
    if (holdingBlock) drawHoldingBlock();
    requestAnimationFrame(loop);
}

function drawHoldingBlock() {
    if (!holdingBlock) return;

    ctx.fillStyle = holdingBlock.color;

    for (let r = 0; r < holdingBlock.shape.length; r++){
        for (let c = 0; c < holdingBlock.shape[0].length; c++){
            if (holdingBlock.shape[r][c] === 1){
                ctx.fillRect(mouseX + c*cell, mouseY + r*cell, cell-2, cell-2);
            }
        }
    }
}

loop();
// --- MOBILE TOUCH SUPPORT ---

canvas.addEventListener("touchstart", (e) => {
    e.preventDefault();

    if (!holdingBlock) {
        spawnBlock();
    }

    const rect = canvas.getBoundingClientRect();
    mouseX = e.touches[0].clientX - rect.left - cell / 2;
    mouseY = e.touches[0].clientY - rect.top - cell / 2;
}, { passive: false });


canvas.addEventListener("touchmove", (e) => {
    e.preventDefault();

    const rect = canvas.getBoundingClientRect();
    mouseX = e.touches[0].clientX - rect.left - cell / 2;
    mouseY = e.touches[0].clientY - rect.top - cell / 2;
}, { passive: false });


canvas.addEventListener("touchend", (e) => {
    e.preventDefault();

    if (!holdingBlock) return;

    let row = Math.floor(mouseY / cell);
    let col = Math.floor(mouseX / cell);

    if (canPlace(holdingBlock.shape, row, col)) {
        placeBlock(holdingBlock.shape, holdingBlock.color, row, col);
        clearLines();
        holdingBlock = null;
    }
}, { passive: false });
