const containerDiv = document.querySelector('div.grid-container');
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

const mouseClickDown = (event) => {
  const element = (event.target.nodeName === 'I') ? event.target.parentNode : event.target;
  element.classList.add('clicked');
}

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
    const parentPos = containerDiv.getBoundingClientRect();
    const childPos = event.target.getBoundingClientRect();
    const relX = childPos.x - parentPos.x;
    const relY = childPos.y - parentPos.y;
    const xVal = relX + event.offsetX;
    const yVal = relY + event.offsetY;
    // console.log(`(${parentPos.x}, ${parentPos.y})   (${childPos.x}, ${childPos.y})   (${relX}, ${relY})`);
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
  lineCoordsArray.forEach (line => {
    line.forEach ( coord => {
      const x = coord.x + parentX;
      const y = coord.y + parentY;
      const nodeAtCoord = document.elementFromPoint(x,y);
      if(!nodeAtCoord.classList.contains('paint')) {
        nodeAtCoord.classList.add('paint');
      }
    })
  })
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
  mapLines(parentContainer);
}

const test = (size) => {
  const div = containerDiv;
  div.addEventListener('mousemove', mouseMove);
  createGrid(size, div);
}

const btn = document.querySelector('button');
btn.addEventListener('click', mouseClickDown);

test(16);