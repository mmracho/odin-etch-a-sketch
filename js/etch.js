// Initial values
let gridSize = 32;
let brushColor = 'black';
// Enter grid size
gridSize = 64;
// Create grid
// clear current grid
clearGrid();
// repopulate grid
createGrid(gridSize);
// Color on hover
// reset colors
//resetColor();


function createGrid(size) {
  const gridContainer = document.getElementById('grid-cont');
  const gridContainerSize = gridContainer.offsetWidth - 2;
  const dimension = gridContainerSize / size;
  for (let i = 0; i < size ** 2; i++) {
    const divPixel = document.createElement('div');
    divPixel.setAttribute('id', `pix${i}`);
    divPixel.setAttribute('class', 'pixel');
    divPixel.style.height = dimension + 'px';
    divPixel.style.width = dimension + 'px';
    divPixel.style.backgroundColor = 'rgba(255, 255, 255, 1)'
    gridContainer.appendChild(divPixel);


    //move out
    divPixel.addEventListener('mouseover', colorPixel);
  }
}

function clearGrid() {
  const gridContainer = document.getElementById('grid-cont');
  while (gridContainer.firstChild) {
    gridContainer.removeChild(gridContainer.firstChild);
  }
}

function resetColor() {
  const gridContainer = document.querySelectorAll('div.pixel');
  gridContainer.forEach(pixel => pixel.style.backgroundColor = 'white')
}

function colorPixel() {
  let colorStrength = 0.1
  const pixelColors = this.style.backgroundColor;
  const parts = pixelColors.match(/[\d.]+/g);
  if (parts.length === 3) {
    this.style.backgroundColor = `rgba(0, 0, 0, ${colorStrength})`;
  } else {
    if (Number(parts[3]) >= Number(0.9)) {
      this.style.backgroundColor = `rgba(0, 0, 0, 0.99)`;
    } else {
      this.style.backgroundColor = `rgba(0, 0, 0, ${Number(parts[3]) + colorStrength}`;
    }
  }
}