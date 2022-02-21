let pixelCount = 0;
let mouseDown = false;

window.addEventListener('mousedown', () => mouseDown = true);
window.addEventListener('mouseup', () => mouseDown = false);

const mouseEnter = (event) => {
  const div = event.target;
  if(mouseDown) div.style.backgroundColor = 'black';
}

function addPixel (size, parentContainer) {
  const pixel = document.createElement('div');
  pixel.style.height = `${size}px`;
  pixel.style.width = `${size}px`;
  pixel.classList.add('grid-pixel', `'pixel-${pixelCount++}'`);
  pixel.addEventListener('mouseenter', mouseEnter);
  parentContainer.appendChild(pixel);
}

const removeAllChildren = parentContainer => {
  if(parentContainer.firstChild) {
    parentContainer.removeChild(parentContainer.firstChild);
    removeAllChildren(parentContainer);
  }
}

const createGrid = (size, parentContainer) => {
  pixelCount = 0;
  removeAllChildren(parentContainer);
  const totalWidth = parentContainer.offsetWidth;
  const pixelWidth = totalWidth/size;
  for (let i=0; i<(size*size); i++){
    addPixel(pixelWidth, parentContainer);
  }
}

const test = (size) => {
  const div = document.querySelector('div.grid-container');
  createGrid(size, div);
}

test(16);