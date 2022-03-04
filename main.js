const containerDiv = document.querySelector('div.grid-container');
let pixelCount = 0;
let mouseDown = false;
let lineCoords = new Array();
let lineCoordsArray = new Array();
let lineColorArray = new Array();
const rainbowArray = ['violet', 'indigo', 'blue', 'green', 'yellow', 'orange', 'red'];
let drawColor = "black";
let rainbowOn = false;
const slider = document.getElementById("myRange");
const minGrid = 16;
const maxGrid = 128;

slider.onchange = function () {
  const div = containerDiv;
  const rangeValue = this.value/100;
  const gridSize = (Math.floor(rangeValue*(maxGrid-minGrid))) + minGrid;
  createGrid(gridSize, div);
}

const getPainted = () => {
  let paintedPixels = document.querySelectorAll('.paint');
  return paintedPixels;
}

const colorInput = event => {
  const colorpicker = document.querySelector('label');
  drawColor = event.target.value;
  if (colorpicker.classList.contains('🌈')) {
    colorpicker.classList.remove('🌈');
    rainbowOn = false;
  }
  colorpicker.style.backgroundColor = drawColor;
}

window.addEventListener('mousedown', () => {
  mouseDown = true;
});

window.addEventListener('mouseup', () => {
  mouseDown = false;
  lineCoordsArray.push(lineCoords);
  lineColorArray.push(drawColor);
  lineCoords = [];
});

const eraseClickEvent = event => {
  const paintedPixels = getPainted();
  paintedPixels.forEach(pixel => {
    if (pixel.classList.contains('paint')) {
      pixel.classList.remove('paint');
      pixel.style.backgroundColor = 'transparent';
    }
  });
}

const rainbowClickEvent = event => {
  rainbowOn = !rainbowOn;
  const colorpicker = document.querySelector('label');
  colorpicker.classList.toggle('🌈');
}

const mouseEnter = (event) => {
  const div = event.target;
  if (mouseDown) {
    if (!div.classList.contains('paint')) {
      div.classList.add('paint');
    }
    if (rainbowOn) {
      div.style.backgroundColor = rainbowArray[Math.floor(Math.random() * 7)];
    } else {
      div.style.backgroundColor = drawColor;
    }
  }
}

const mouseMove = (event) => {
  if (mouseDown) {
    const parentPos = containerDiv.getBoundingClientRect();
    const childPos = event.target.getBoundingClientRect();
    const relX = childPos.x - parentPos.x;
    const relY = childPos.y - parentPos.y;
    const xVal = relX + event.offsetX;
    const yVal = relY + event.offsetY;
    // console.log(`(${parentPos.x}, ${parentPos.y})   (${childPos.x}, ${childPos.y})   (${relX}, ${relY})`);
    lineCoords.push({ x: xVal, y: yVal });
  }
}

function addPixel(size, parentContainer) {
  const pixel = document.createElement('div');
  pixel.style.height = `${size}px`;
  pixel.style.width = `${size}px`;
  pixel.classList.add('grid-pixel', `'pixel-${pixelCount++}'`);
  pixel.addEventListener('mouseenter', mouseEnter);
  parentContainer.appendChild(pixel);
  return pixel;
}

const removeAllChildren = parentContainer => {
  let child = parentContainer.lastElementChild;
  while (child) {
    parentContainer.removeChild(child);
    child = parentContainer.lastElementChild;
  }
}

const mapLines = (parentContainer) => {
  const parentPos = parentContainer.getBoundingClientRect();
  const parentX = parentPos.x;
  const parentY = parentPos.y;
  lineCoordsArray.forEach(line => {
    line.forEach((coord, index) => {
      const x = coord.x + parentX;
      const y = coord.y + parentY;
      const nodeAtCoord = document.elementFromPoint(x, y);
      if (!nodeAtCoord.classList.contains('paint')) {
        nodeAtCoord.classList.add('paint');
        nodeAtCoord.style.backgroundColor = lineColorArray[index];
      }
    })
  })
}

const createGrid = (size, parentContainer) => {
  pixelCount = 0;
  removeAllChildren(parentContainer);
  const totalWidth = parentContainer.offsetWidth;
  const pixelWidth = totalWidth / size;
  for (let i = 0; i < (size * size); i++) {
    const pixel = addPixel(pixelWidth, parentContainer);
    const topLeftRadius = 24 * (i === 0);
    const topRightRadius = 24 * ((i + 1) === size);
    const bottomLeftRadius = 24 * (i === (size * size - size));
    const bottomRightRadius = 24 * (i === (size * size - 1));
    pixel.style.borderTopLeftRadius = `${topLeftRadius}px`;
    pixel.style.borderTopRightRadius = `${topRightRadius}px`;
    pixel.style.borderBottomLeftRadius = `${bottomLeftRadius}px`;
    pixel.style.borderBottomRightRadius = `${bottomRightRadius}px`;
  }
  mapLines(parentContainer);
}

const test = (size) => {
  const div = containerDiv;
  div.addEventListener('mousemove', mouseMove);
  createGrid(size, div);
}

const btnErase = document.querySelector('.btn-erase');
btnErase.addEventListener('click', eraseClickEvent);

const btnRainbow = document.querySelector('.btn-rainbow');
btnRainbow.addEventListener('click', rainbowClickEvent);

const colorControl = document.querySelector('input[type="color"]');
colorControl.addEventListener('input', colorInput);

test(16);