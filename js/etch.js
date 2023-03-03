// Initialization
const gridSlider = document.getElementById('grid-size');
const brushSlider = document.getElementById('brush-strength');
const gridSizeValLbl = document.getElementById('grid-size-val');
const brushStrValLbl = document.getElementById('brush-str-val');
const btnClear = document.getElementById('clear-btn');
const btnRainbow = document.getElementById('rainbow-btn');
const statusRainbowLbl = document.getElementById('rainbow-mode-status');
const color = document.getElementById('color');
let switchRainbow = false;
let gridSize = gridSlider.value || 4;
let brushColor = 'rgba(0, 0, 0)';
let strength = brushSlider.value || 0.1;
clearGrid();
createGrid(getGrid());


// questionable performance
gridSlider.addEventListener('change', setGridSize);
gridSlider.addEventListener('input', labelUpdate);
brushSlider.addEventListener('change', setBrushStrength);
brushSlider.addEventListener('input', labelUpdate);

btnClear.addEventListener('click', resetColor);
btnRainbow.addEventListener('click', toggleRainbow);

color.addEventListener('change', setColor);

function toggleRainbow() {
  switchRainbow = !switchRainbow;
  labelUpdate(this);
  if (switchRainbow) {
    brushSlider.setAttribute('disabled', true)
    color.setAttribute('disabled', true)
  } else {
    brushSlider.removeAttribute('disabled');
    color.removeAttribute('disabled')
  }
}

function labelUpdate(src) {
  if (this.id == 'grid-size') gridSizeValLbl.textContent = `${this.value}x${this.value}`;
  if (this.id == 'brush-strength') brushStrValLbl.textContent = `${Math.round((this.value - 1) * 100)}%`;
  if (src.id == 'rainbow-btn') src.textContent = switchRainbow ? 'on' : 'off';
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
  const gridContainerSize = gridContainer.offsetWidth;
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
  if (switchRainbow) {
    color = randomRainbow();
    this.style.backgroundColor = color;
  } else {
    const pixelColors = this.style.backgroundColor;
    const pixelColorsParts = pixelColors.match(/[\d.]+/g);
    const brushColor = color.match(/[\d.]+/g);
    if (pixelColorsParts.length === 3) {
      this.style.backgroundColor = `rgba(${brushColor[0]}, ${brushColor[1]}, ${brushColor[2]}, ${colorStrength - 1})`;
    } else {
      if (Number(pixelColorsParts[3]) * colorStrength >= 1) {
        this.style.backgroundColor = `rgba(${brushColor[0]}, ${brushColor[1]}, ${brushColor[2]}, 0.99)`;
      } else {
        this.style.backgroundColor = `rgba(${brushColor[0]}, ${brushColor[1]}, ${brushColor[2]}, ${Number(pixelColorsParts[3]) * colorStrength}`;
      }
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

function randomRainbow() {
  const rainbowColors = ['rgba(255,0,0)', // red
    'rgba(255,165,0)', // orange 
    'rgba(255,255,0)', // yellow
    'rgba(0,128,0)', // green
    'rgba(0,0,255)', // blue
    'rgba(75,0,130)', // indigo
    'rgba(238,130,238)'];// violet
  const randomColor = rainbowColors[Math.floor((Math.random() * rainbowColors.length))]
  //brushColor = randomColor;
  //color.value = rgbToHexColor(randomColor);

  return randomColor;
}

function rgbToHexColor(rgb) {
  const color = rgb;
  const colorParts = color.match(/[\d.]+/g);
  const r = Number(colorParts[0]).toString(16).padStart(2, '0');
  const g = Number(colorParts[1]).toString(16).padStart(2, '0');
  const b = Number(colorParts[2]).toString(16).padStart(2, '0');
  return `#${r}${g}${b}`;
}

function hexToRgbColor(hex) {
  const color = hex;
  const r = parseInt(color.substr(1, 2), 16)
  const g = parseInt(color.substr(3, 2), 16)
  const b = parseInt(color.substr(5, 2), 16)
  return `rgb(${r}, ${g}, ${b})`;
}

function setColor() {
  brushColor = hexToRgbColor(this.value);
}

// refactor
function getColorStrength() {
  return strength;
}

function getColor() {
  return brushColor;
}

function getGrid() {
  return gridSize;
}