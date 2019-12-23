// select image
const enlargedImage = document.querySelector(".right-side")
const images = document.querySelectorAll(".gallery img").forEach(image => {
  image.addEventListener("click", () => {
    document.querySelector('#grab p').style.display = "block";
    addImage(image);
  });
});

// enlarge image
function addImage(clickedImage) {

    let selectedImage = clickedImage.src;
    let image = new Image();
    image.src = selectedImage;
    image.onload = () => {
        let rootImage = image.src.split('/');
        let imgaLocation = './' + rootImage[8] + '/' + rootImage[9];
        enlargedImage.style.backgroundImage =  'url(' + imgaLocation + ')';
    }
}
// upload image https://stackoverflow.com/questions/22087076/how-to-make-a-simple-image-upload-using-javascript-html

// ====== draggable text ========
dragElement(document.getElementById("grab"));

function dragElement(elmnt) {
  let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.querySelector('#grab p')) {
    // if present, the header is where you move the DIV from:
    document.querySelector('#grab p').onmousedown = dragMouseDown;
  } else {
    // otherwise, move the DIV from anywhere inside the DIV:
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
}
// =================================================

// select text color
let selectColor = document.getElementById('color');
selectColor.addEventListener('change', () => {
    document.querySelector('#grab p').style.color = selectColor.value;
});

// users inserted text
const userText = document.getElementById('userText')
userText
.addEventListener('change', () => {
    document.querySelector('#grab p').innerHTML = userText.value;
});

// user text font-size
const fontSize = document.getElementById('font-size')
fontSize
.addEventListener('change', () => {
    document.querySelector('#grab p').style.fontSize = fontSize.value
    document.getElementById('selectedSize').innerHTML = fontSize.value + 'px'
});

// rotation for now only one paragraph
const angle = document.getElementById('angle')
angle.addEventListener('change', () => {
  $("p").rotate({angle: parseInt(angle.value)});
});