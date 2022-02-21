let pixelCount = 0;
let mouseDown = false;
let lineCoords = new Array();
let lineCoordsArray = new Array();

window.addEventListener('mousedown', () => {
  mouseDown = true;
});

window.addEventListener('mouseup', () => {
  mouseDown = false;
  lineCoordsArray.push(lineCoords);
  lineCoords = [];
});

const mouseEnter = (event) => {
  const div = event.target;
  if(mouseDown) {
    if(!div.classList.contains('paint')) {
      div.classList.add('paint');
    }
  }
}

const mouseMove = (event) => {
  if(mouseDown) {
    const xVal = event.pageX;
    const yVal = event.pageY;
    lineCoords.push({x: xVal, y: yVal});
  }
}

const getPainted = () => {
  let paintedPixels = document.querySelectorAll('.paint');
  return paintedPixels;
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
  paintedPixels = getPainted();
  removeAllChildren(parentContainer);
  const totalWidth = parentContainer.offsetWidth;
  const pixelWidth = totalWidth/size;
  for (let i=0; i<(size*size); i++){
    addPixel(pixelWidth, parentContainer);
  }
}

const test = (size) => {
  const div = document.querySelector('div.grid-container');
  div.addEventListener('mousemove', mouseMove);
  createGrid(size, div);
}

test(16);