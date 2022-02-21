function addPixel (size, parentContainer) {
  const pixel = document.createElement('div');
  pixel.style.height = `${size}px`;
  pixel.style.width = `${size}px`;
  pixel.classList.add('grid-pixel');
  parentContainer.appendChild(pixel);
}

const createGrid = (size, parentContainer) => {
  const totalWidth = parentContainer.offsetWidth;
  const pixelWidth = totalWidth/size;
  for (let i=0; i<(size*size); i++){
    addPixel(pixelWidth, parentContainer);
  }
}

const test = () => {
  const div = document.querySelector('div.grid-container');
  createGrid(16, div);
}