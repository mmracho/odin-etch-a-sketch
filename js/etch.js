// Initial values
let gridSize = 32;
let brushColor = 'black';
// Enter grid size
gridSize = 8;
// Create grid
// clear current grid
clearGrid()
// repopulate grid
createGrid(gridSize);
// Color on hover
// reset colors


function createGrid(size) {
  const gridContainer = document.getElementById('grid-cont');
  const gridContainerSize = gridContainer.offsetWidth - 2;
  const dimension = gridContainerSize / size;
  for (let i = 0; i < size**2 ; i++) {
    const divPixel = document.createElement('div');
    divPixel.setAttribute('id', `pix${i}`);
    divPixel.setAttribute('class', 'pixel');
    divPixel.style.height = dimension + 'px';
    divPixel.style.width = dimension + 'px';

    gridContainer.appendChild(divPixel);
  }
}

function clearGrid() {
  const gridContainer = document.querySelector('#grid-cont');
  while (gridContainer.firstChild) {
    gridContainer.removeChild(gridContainer.firstChild);
  }
}

