const containerDiv = document.querySelector('div.grid-container');
const controlsContainer = document.querySelector('.controls-container');
let pixelCount = 0;
let mouseDown = false;
let lineCoords = new Array();
const rainbowArray = ['violet', 'indigo', 'blue', 'green', 'yellow', 'orange', 'red'];
let drawColor = "black";
let rainbowOn = false;
const slider = document.getElementById("myRange");
const gridSize = 960;

slider.onchange = function () {
  const div = containerDiv;
  console.log(this.value);
  createGrid(this.value, div);
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
});

const eraseClickEvent = event => {
  const paintedPixels = getPainted();
  paintedPixels.forEach(pixel => {
    if (pixel.classList.contains('paint')) {
      pixel.classList.remove('paint');
      pixel.style.backgroundColor = 'transparent';
    }
  });
  lineCoords = [];
}

const rainbowClickEvent = event => {
  rainbowOn = !rainbowOn;
  const colorpicker = document.querySelector('label');
  colorpicker.classList.toggle('🌈');
}

const mouseEnter = (event) => {
  const div = event.target;
  if (mouseDown) {
    div.classList.add('paint');
    if (rainbowOn) {
      div.style.backgroundColor = rainbowArray[Math.floor(Math.random() * 7)];
    } else {
      div.style.backgroundColor = drawColor;
    }
  }
}

const mouseMove = (event) => {
  const parentPos = containerDiv.getBoundingClientRect();
  const childPos = event.target.getBoundingClientRect();
  const relX = childPos.x - parentPos.x;
  const relY = childPos.y - parentPos.y;
  const xVal = relX + event.offsetX;
  const yVal = relY + event.offsetY;
  console.log(`(${xVal}, ${yVal})`);

  if (mouseDown) {
    lineCoords.push({ x: xVal, y: yVal, color: drawColor });
  } else if (yVal > 0.9*gridSize) {
    controlsContainer.style.visibility = 'visible';
  }
}

function addPixel(size, parentContainer) {
  const pixel = document.createElement('div');
  pixel.style.height = `${size}px`;
  pixel.style.width = `${size}px`;
  pixel.classList.add('grid-pixel', `pixel-${pixelCount++}`);
  pixel.addEventListener('mouseenter', mouseEnter);
  parentContainer.appendChild(pixel);
  return pixel;
}

const removeAllChildren = parentContainer => {
  parentContainer.replaceChildren();
}

const mapLines = (parentContainer) => {
  const parentPos = parentContainer.getBoundingClientRect();
  const parentX = parentPos.x;
  const parentY = parentPos.y;
  for (let i = 0; i < lineCoords.length; i++) {
    const x = lineCoords[i].x + parentX;
    const y = lineCoords[i].y + parentY;
    const nodeAtCoord = document.elementFromPoint(x, y);
    nodeAtCoord.classList.add('paint');
    nodeAtCoord.style.backgroundColor = lineCoords[i].color;
  }
}

const createGrid = (size, parentContainer) => {
  pixelCount = 0;
  console.time("remove");
  removeAllChildren(parentContainer);
  console.timeEnd("remove");
  const totalWidth = parentContainer.offsetWidth;
  const pixelWidth = totalWidth / size;
  const topLeftIndex = 0;
  const topRightIndex = size - 1;
  const bottomRightIndex = size * size - 1;
  const bottomLeftIndex = size * size - size;
  console.time("add");
  for (let i = 0; i < (size * size); i++) {
    addPixel(pixelWidth, parentContainer);
  }
  console.timeEnd("add");
  let cornerPixel = document.querySelector(`.pixel-${topLeftIndex}`);
  cornerPixel.style.borderTopLeftRadius = '24px';
  cornerPixel = document.querySelector(`.pixel-${topRightIndex}`);
  cornerPixel.style.borderTopRightRadius = '24px';
  cornerPixel = document.querySelector(`.pixel-${bottomRightIndex}`);
  cornerPixel.style.borderBottomRightRadius = '24px';
  cornerPixel = document.querySelector(`.pixel-${bottomLeftIndex}`);
  cornerPixel.style.borderBottomLeftRadius = '24px';
  console.time("map");
  mapLines(parentContainer);
  console.timeEnd("map");
}

const test = (size) => {
  createGrid(size, containerDiv);
}

const btnErase = document.querySelector('.btn-erase');
btnErase.addEventListener('click', eraseClickEvent);

const btnRainbow = document.querySelector('.btn-rainbow');
btnRainbow.addEventListener('click', rainbowClickEvent);

const colorControl = document.querySelector('input[type="color"]');
colorControl.addEventListener('input', colorInput);

containerDiv.addEventListener('mousemove', mouseMove);

test(16);