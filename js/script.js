// Canvas
let enlargedImage = document.querySelector(".right-side");
enlargedImage.height = 0;
enlargedImage.width = 0;
let ctx = enlargedImage.getContext('2d')
let imageToDraw = new Image();

// Default settings for text style
let textSettings = {
  firstText: {
    text: 'First text to edit',
    textX: enlargedImage.width / 2, 
    textY: enlargedImage.height / 2, 
    textFontSize: 30, 
    textColor: 'orange',
    textFont: 'Impact'
  },
  secondText: {
    text: 'Second text to edit',
    textX: enlargedImage.width / 2, 
    textY: enlargedImage.height / 2, 
    textFontSize: 30, 
    textColor: 'orange',
    textFont: 'Impact'
  }
}

// Saving image function
function screenshot () {
  enlargedImage.toBlob(function (blob) {
    saveAs(blob, 'image.png')
  })
}

document.querySelectorAll(".gallery img").forEach(image => {
  if (image.classList.value !== 'manual') {
    image.addEventListener("click", () => {

      addToolBox();
      showImage(image, textSettings);
    });
  }
});

document.querySelector('#file-input')
.addEventListener('change', () => {
  let reader = new FileReader();
  reader.onload = () => {
    enlargedImage.width = imageToDraw.width;
    enlargedImage.height = imageToDraw.height;

    imageToDraw.src = reader.result;
    ctx.drawImage(imageToDraw, 0, 0);
  }
  reader.readAsDataURL(document.querySelector('#file-input').files[0])
})
function imageDraw () {
  // without second line not works
  imageToDraw.src = imageToDraw.src
  imageToDraw.onload = () => {

    enlargedImage.width = imageToDraw.width;
    enlargedImage.height = imageToDraw.height;

  ctx.drawImage(imageToDraw, 0, 0);

  let selectedText = document.querySelector('.select-text');

  ctx.font = textSettings[selectedText.value].textFontSize + 'px '
  + textSettings[selectedText.value].textFont;
  ctx.fillStyle = textSettings[selectedText.value].textColor;
  ctx.strokeStyle = 'white'
  ctx.lineWidth = 30;
  ctx.fillText(
    textSettings[selectedText.value].text, 
    textSettings[selectedText.value].textX, 
    textSettings[selectedText.value].textY 
  )

    Object.keys(textSettings).forEach(key => {
      if (selectedText.value !== key) {
        ctx.font = textSettings[key].textFontSize + 'px '
        + textSettings[key].textFont;
        ctx.fillStyle = textSettings[key].textColor;
        ctx.strokeStyle = 'white'
        ctx.lineWidth = 30;
        ctx.fillText(textSettings[key].text, textSettings[key].textX, textSettings[key].textY )
      }
    })
  }
}

function textEditEvents (textChangeEl, textSettingToChange) {
  // take selected text from option select input
  if (textChangeEl !== 'undefined' && textChangeEl !== null) {
    textChangeEl.addEventListener('input', () => {
      let selectedText = document.querySelector('select')
      textSettings[selectedText.value][textSettingToChange] = textChangeEl.value;
      imageDraw();
    })
  }
}

// ToolBox creating
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
  const usersTextLabel = createTool('Enter text ', 'text', 'users-text');

  const fontSizeLabel = createTool('Font size ', 'range', 'font-size');
  let fontSizeValue = document.createElement('span');
  fontSizeValue.setAttribute('id', 'selected-size');
  fontSizeLabel.append(fontSizeValue);

  const textXLabel = createTool('Text x position', 'range', 'text_x');
  let textXValue = document.createElement('span');
  textXValue.setAttribute('id', 'text_x-value');
  textXLabel.append(textXValue);

  const textYLabel = createTool('Text y position', 'range', 'text_y');
  let textYValue = document.createElement('span');
  textYValue.setAttribute('id', 'text_y-value');
  textYLabel.append(textYValue);

  let closeButton = document.createElement('button');
  closeButton.append('close');

  // select text to edit
  let select = document.createElement('select');
  select.setAttribute('class', 'select-text')

  let firstOption = document.createElement('option');
  firstOption.value = 'firstText';
  firstOption.text = 'First text';
  firstOption.selected = 'selected';

  let secondOption = document.createElement('option');
  secondOption.value = 'secondText';
  secondOption.text = 'Second text';

  // font dropdown
  let selectFont = document.createElement('select');
  selectFont.setAttribute('class', 'select-font')
  let selectedFont = document.createElement('option');
  selectedFont.value = 'Impact';
  selectedFont.text = 'Impact';
  selectedFont.selected = 'selected';

  selectFont.append(selectedFont)

  let FontArr = ['Kelly Slab', 'Artifika', 'Martel', 'Sans Serif', 'DM Serif Display', 'Monospace', 'Patrick Hand'];
  FontArr.forEach(font => {
    let newFontOption = document.createElement('option');
    newFontOption.value = font;
    newFontOption.text = font

    selectFont.append(newFontOption);
  })
  select.append(firstOption, secondOption);

  tools.append(
    textColorLabel, 
    usersTextLabel, 
    fontSizeLabel, 
    textXLabel, 
    textYLabel, 
    select, 
    selectFont, 
    closeButton
    );
  toolBox.append(tools);

let menu = document.querySelector("main");
  menu.append(toolBox);

  $('#tool-box').draggable({
    containment: "parent"
  });
  
  // do not allow font-size = 0
  document.getElementById('font-size').setAttribute('min', 12);

  // text position
  let selected = document.querySelector('.select-text')
  let text_x = document.getElementById('text_x');
  text_x.setAttribute('min', 0);
  text_x.setAttribute('max', imageToDraw.width - (textSettings[selected.value]['textFontSize'] * 2));

  let text_y = document.getElementById('text_y');
  text_y.setAttribute('min', textSettings[selected.value]['textFontSize']);
  text_y.setAttribute('max', imageToDraw.height - (textSettings[selected.value]['textFontSize']));

  // buttons in toolbox: close, delete, add
  closeButton.addEventListener('click', () => {
    document.getElementById('tool-box').style.display = 'none';
  });

  textEditEvents(document.getElementById('text-color'), 'textColor');
  textEditEvents(document.getElementById('users-text'), 'text');
  textEditEvents(document.getElementById('font-size'), 'textFontSize');
  textEditEvents(document.getElementById('text_x'), 'textX');
  textEditEvents(document.getElementById('text_y'), 'textY');
  textEditEvents(document.querySelector('.select-font'), 'textFont');
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

function addToolBox () {

      document.querySelector('.tools')
        .addEventListener('click', () => {

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
      });
}

// function, what draws image and text
function showImage(clickedImageSrc, textSettings) {
    imageToDraw.src = clickedImageSrc.src;
    imageToDraw.onload = () => {
        enlargedImage.width = imageToDraw.width;
        enlargedImage.height = imageToDraw.height;

        // Default text position parameters
      textSettings.firstText.textX = enlargedImage.width / 2;
      textSettings.firstText.textY = enlargedImage.height / 2;

      textSettings.secondText.textX = (enlargedImage.width / 2) + 50;
      textSettings.secondText.textY = (enlargedImage.height / 2) + 50;

      ctx.drawImage(imageToDraw, 0, 0)

      Object.keys(textSettings).forEach(function (keyValue) {
        ctx.font = textSettings[keyValue].textFontSize + 'px Impact';
        ctx.fillStyle = textSettings[keyValue].textColor;
        ctx.strokeStyle = 'white'
        ctx.lineWidth = 30;
        ctx.fillText(textSettings[keyValue].text, textSettings[keyValue].textX, textSettings[keyValue].textY )
        })
    }

    document.querySelector('.buttons').style.display = 'flex';
}

// instruction button event
document.querySelector('.exit-instruction')
.addEventListener('click', () => {
  document.querySelector('.instruction-section').style.display = 'none';
  document.querySelector('.content').style.display = 'block';

})
document.querySelector('.manual')
.addEventListener('click', () => {
  document.querySelector('.instruction-section').style.display = 'flex';
  document.querySelector('.content').style.display = 'none';
})
	