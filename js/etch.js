// Initialization
const gridSlider = document.getElementById('grid-size');
const brushSlider = document.getElementById('brush-strength');
const gridSizeValLbl = document.getElementById('grid-size-val');
const brushStrValLbl = document.getElementById('brush-str-val');
const btnClear = document.getElementById('btn-clear');
let gridSize = gridSlider.value || 4;
let brushColor = 'rgba(0, 0, 0)';
let strength = brushSlider.value || 0.1;
clearGrid();
createGrid(getGrid());
// Color on hover
// reset colors
//resetColor();

// questionable performance
gridSlider.addEventListener('change', setGridSize);
gridSlider.addEventListener('input', labelUpdate);
brushSlider.addEventListener('input', setBrushStrength);
brushSlider.addEventListener('input', labelUpdate);

btnClear.addEventListener('click', resetColor);

function labelUpdate() {
  if (this.id == 'grid-size') gridSizeValLbl.textContent = `${this.value}x${this.value}`;
  if (this.id == 'brush-strength') brushStrValLbl.textContent = `${Math.round((this.value - 1) * 100)}%`;
}

function setBrushStrength() {
  strength = this.value;
}

function setGridSize() {
  gridSize = this.value;
  clearGrid();
  createGrid(getGrid());
}

function createGrid(size) {
  const gridContainer = document.getElementById('grid-cont');
  const gridContainerSize = gridContainer.offsetWidth - 2;
  const dimension = gridContainerSize / size;
  removeMOListeners();
  for (let i = 0; i < size ** 2; i++) {
    const divPixel = document.createElement('div');
    divPixel.setAttribute('id', `pix${i}`);
    divPixel.setAttribute('class', 'pixel');
    divPixel.style.height = dimension + 'px';
    divPixel.style.width = dimension + 'px';
    divPixel.style.backgroundColor = 'rgba(255, 255, 255, 1)'
    gridContainer.appendChild(divPixel);
  }
  createMOListeners();
}

function clearGrid() {
  const gridContainer = document.getElementById('grid-cont');
  while (gridContainer.firstChild) {
    gridContainer.removeChild(gridContainer.firstChild);
  }
}

function resetColor() {
  const gridContainer = document.querySelectorAll('div.pixel');
  gridContainer.forEach(pixel => pixel.style.backgroundColor = 'rgba(255, 255, 255)')
}

function colorPixel() {
  let colorStrength = Number(getColorStrength());
  let color = getColor();
  const pixelColors = this.style.backgroundColor;
  const parts = pixelColors.match(/[\d.]+/g);
  if (parts.length === 3) {
    this.style.backgroundColor = `rgba(0, 0, 0, ${colorStrength - 1})`;
  } else {
    if (Number(parts[3]) * colorStrength >= 1) {
      this.style.backgroundColor = `rgba(0, 0, 0, 0.99)`;
    } else {
      this.style.backgroundColor = `rgba(0, 0, 0, ${Number(parts[3]) * colorStrength}`;
    }
  }
}

function createMOListeners() {
  const gridContainer = document.getElementById('grid-cont').childNodes;
  gridContainer.forEach(pixel => {
    pixel.addEventListener('mouseover', colorPixel);
  })
}

function removeMOListeners() {
  const gridContainer = document.getElementById('grid-cont').childNodes;
  gridContainer.forEach(pixel => {
    pixel.removeEventListener('mouseover', colorPixel);
  })
}


function getColorStrength() {
  return strength;
}

function getColor() {
  return brushColor;
}

function getGrid() {
  return gridSize;
}