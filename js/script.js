let textsToDragAndEdit = [];
const enlargedImage = document.querySelector(".right-side");

document.querySelectorAll(".gallery img").forEach(image => {
  image.addEventListener("click", () => {

    // select image
    enlargedImage.innerHTML = '';
    textsToDragAndEdit = [];
    let firstP = document.createElement('p');
    firstP.innerHTML = "Hello grab and drag me";
    let counter = 0;

    // make paragraph visible
    firstP.style.display = 'block';
    let newGrab = document.createElement('div');
    newGrab.setAttribute('class', 'grab-' + counter);
    newGrab.style.position = 'absolute';
    newGrab.style.cursor = 'move';
    newGrab.append(firstP);

    let secondP = document.createElement('p');
    secondP.innerHTML = "Hello grab and drag me";

    // make paragraph visible
    secondP.style.display = 'block';
    let grabTwo = document.createElement('div');
    grabTwo.setAttribute('class', 'grab-1');
    grabTwo.style.position = 'absolute';
    grabTwo.style.cursor = 'move';
    grabTwo.append(secondP);

    textsToDragAndEdit.push(newGrab);
    textsToDragAndEdit.push(grabTwo);

    loadText(textsToDragAndEdit, enlargedImage);
    showImage(image, enlargedImage);
  });
});

function createTextToolBox () {
  let toolBox = document.createElement('div');
  toolBox.setAttribute('id', 'tool-box');
  toolBox.style.display = 'block';
  toolBox.style.position = 'absolute';
  toolBox.style.backgroundColor = '#fff';
  toolBox.style.padding = '10px';
  toolBox.style.cursor = 'move'

  let tools = document.createElement('div');
  tools.setAttribute('class', 'tools');

  const textColorLabel = createTool('Select text color ', 'color', 'text-color');
  const textBgColorLabel = createTool('Select text background color ', 'color', 'text-bg-color');
  const usersTextLabel = createTool('Enter text and press enter ', 'text', 'users-text');

  const fontSizeLabel = createTool('Font size ', 'range', 'font-size');
  let fontSizeValue = document.createElement('span');
  fontSizeValue.setAttribute('id', 'selected-size');
  fontSizeLabel.append(fontSizeValue);

  const rotateTextLabel = createTool('Rotate text', 'range', 'angle')
  let angleValue = document.createElement('span');
  angleValue.setAttribute('id', 'angle-value');
  rotateTextLabel.append(angleValue);

  let closeButton = document.createElement('button');
  closeButton.append('close');

  let deleteElButton = document.createElement('button');
  deleteElButton.append('delete');

  let addNewTextButton = document.createElement('button');
  addNewTextButton.append('Add new text');

  tools.append(textColorLabel, textBgColorLabel, usersTextLabel, fontSizeLabel, rotateTextLabel, closeButton, addNewTextButton, deleteElButton);
  toolBox.append(tools);

  const enlargedImage = document.querySelector(".right-side");
  enlargedImage.append(toolBox);
  dragElement(toolBox);

  // do not allow font-size = 0
  document.getElementById('font-size').setAttribute('min', 12);

  let angle = document.getElementById('angle');
  angle.setAttribute('min', -180);
  angle.setAttribute('max', 180);

  // buttons: close, delete, add
  closeButton.addEventListener('click', () => {
    document.getElementById('tool-box').style.display = 'none';
    document.querySelector('.editable').style.border = 'none';
  });

  deleteElButton.addEventListener('click', () => {

    let selectedEl = document.querySelector('.editable')
    let selectedIndex = parseInt(selectedEl.getAttribute("class").split(' ')[0].split('-')[1])
    textsToDragAndEdit.splice(selectedIndex, 1);
    document.querySelector('.grab-' + selectedIndex).remove()
    
    loadText(textsToDragAndEdit, enlargedImage);
  });

  addNewTextButton.addEventListener('click', () => {
    let checkIndex = 0;
    textsToDragAndEdit.forEach((grabEl, index) => {
      if (checkIndex === index) {
        checkIndex++
      }
    });

    let newP = document.createElement('p');
    newP.innerHTML = "Hello grab and drag me";

    // make paragraph visible
    newP.style.display = 'block';
    let newGrab = document.createElement('div');
    newGrab.setAttribute('class', 'grab-' + checkIndex);
    newGrab.style.position = 'absolute';
    newGrab.style.cursor = 'move';
    newGrab.append(newP);

    textsToDragAndEdit[checkIndex] = newGrab;
    loadText(textsToDragAndEdit, enlargedImage);
  });
}

// creates label with input to edit text
function createTool (textForLabel, inputType, inputId) {
  let label = document.createElement('label');
  label.append(textForLabel);

  let input = document.createElement('input');
  input.setAttribute('type', inputType);
  input.setAttribute('id', inputId);

  label.append(input);

  return label
}

function loadText (array, container) {
  array.forEach((newGrabClass, counter) => {
    container.append(newGrabClass);
    dragElement(document.querySelector('.grab-' + counter), counter);

    // click on text
    newGrabClass.addEventListener('click', () => {

      // do not activate click, when dragging element
      newGrabClass.addEventListener('click', () => {

        if(document.getElementById('tool-box')) {
          if (document.getElementById('tool-box').style.display = 'block') {
            document.getElementById('tool-box').style.display = 'none'
          }
          if (document.getElementById('tool-box').style.display = 'none') {
            document.getElementById('tool-box').style.display = 'block'
          }
        } else {
          createTextToolBox()
        }
        // after click remove from all elements class 'editable'
        array.forEach(grabEl => {
          if(document.querySelector('.editable')) {
            document.querySelector('.editable').style.border = 'none';
          }
          grabEl.classList.remove('editable');
        });

        // add class 'editable only for one element'
        newGrabClass.classList.add('editable');
        selectElemenetToEdit('.editable');
      });
    });
  });
}

// enlarge image
function showImage(clickedImage, imageLocation) {

  // container width and height
  let divWidth = imageLocation.offsetWidth;
  let divHeight = imageLocation.offsetHeight;
  
    let selectedImage = clickedImage.src;
    let image = new Image();
    image.src = selectedImage;
    image.onload = () => {
        let imageOriginalWidth = image.naturalWidth;
        let imageOriginalHeight = image.naturalHeight;

        // finding proportion to scale image without losing quality
        let proportion = 0;
        imageOriginalHeight > imageOriginalWidth
        ? (proportion = Math.floor((imageOriginalHeight / imageOriginalWidth) * 10) / 10, divWidth = Math.floor(divHeight / proportion))
        : (proportion = Math.floor((imageOriginalWidth / imageOriginalHeight) * 10) / 10, divHeight = Math.floor(divWidth / proportion));

        let rootImage = image.src.split('/');
        let imgaLocation = './images/' + rootImage[rootImage.length - 1];

        imageLocation.style.backgroundImage =  'url(' + imgaLocation + ')';
        imageLocation.style.width = divWidth;
        imageLocation.style.height = divHeight;
    }
}