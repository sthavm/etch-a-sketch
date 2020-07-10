let resetButton = document.querySelector("#reset-btn");
let clearButton = document.querySelector("#clear-btn");
let mainDiv = document.querySelector("#main");
let controlsDiv = document.querySelector("#controls");
let numRows = document.querySelector("#num-rows");
let gridDiv = document.querySelector("#grid");
let radioBlack = document.querySelector("#black");
let radioRainbow = document.querySelector("#rainbow");
let radioShader = document.querySelector("#shader");
let radioEraser = document.querySelector("#eraser");
let mode = "black";

resetButton.addEventListener("click", () => newGrid());
clearButton.addEventListener("click", () => clearGrid());
radioBlack.addEventListener("change", () => {mode = "black"});
radioRainbow.addEventListener("change", () => {mode = "rainbow"});
radioShader.addEventListener("change", () => {mode = "shader"});
radioEraser.addEventListener("change", () => {mode = "eraser"});
function createGrid(width=16){
    gridDiv.style.gridTemplateRows = `repeat(${width}, 1fr)`;
    for(let i = 0; i < width; i++){
        let row = document.createElement('div');
        row.className = "grid-row";
        row.style.display = "grid";
        row.style.gridTemplateColumns = `repeat(${width}, 1fr)`;
        for (let j = 0; j < width; j++){
            let cell = document.createElement('div');
            cell.className = "grid-square";
            cell.style.backgroundColor = "white";
            cell.addEventListener("mouseover", fillCell);
            row.appendChild(cell);
        }
        gridDiv.appendChild(row);
    }
}

function newGrid(){
    gridDiv.remove();
    console.log(gridDiv);
    gridDiv = document.createElement('div')
    gridDiv.id = "grid";
    mainDiv.insertBefore(gridDiv, controlsDiv);
    let newWidth = prompt("How many rows do you want the canvas to have?")
    createGrid(newWidth);
}
function clearGrid(){
    let allCells = document.querySelectorAll(".grid-square");
    allCells.forEach(function(cell){
        cell.style.backgroundColor = "white";
    })
}
function fillCell(e){
    switch (mode){
        case "black":
            e.target.style.backgroundColor = "black";
            e.target.style.opacity = 1;
            break;
        case "rainbow":
            e.target.style.backgroundColor = randomColor();
            e.target.style.opacity = 1;
            break;
        case "shader":
            if (e.target.style.backgroundColor == "black" && e.target.style.opacity < 1) {
                e.target.style.opacity = Number(e.target.style.opacity) + 0.1;
            } else {
                e.target.style.backgroundColor = "black";
                e.target.style.opacity = 0.1;
            }
            break;
        case "eraser":
            e.target.style.backgroundColor = "white";
            e.target.style.opacity = 1;
            break;
    }

}
function randomColor(){
    let rValue = Math.floor(Math.random() * 256);
    let gValue = Math.floor(Math.random() * 256);
    let bValue = Math.floor(Math.random() * 256);
    color = `rgb(${rValue}, ${gValue}, ${bValue})`;
    return color;
}
createGrid();