const enlargedImage = document.querySelector(".right-side")
const images = document.querySelectorAll(".gallery img").forEach(image => {
  image.addEventListener("click", () => {
    addImage(image);
  });
});

function addImage(clickedImage) {
    let divWidth = document.querySelector(".right-side").offsetWidth;
    let divHeight = document.querySelector(".right-side").offsetHeight;

    let selectedImage = clickedImage.src;
    let image = new Image();
    image.src = selectedImage;
    let proportion = 0;
    image.onload = () => {
        image.naturalHeight > image.naturalWidth
        ? (proportion = image.naturalHeight / image.naturalWidth, divWidth = Math.floor(divHeight / proportion))
        : (proportion = image.naturalWidth / image.naturalHeight, divHeight = Math.floor(divWidth / proportion));
        let rootImage = image.src.split('/');
        let imgaLocation = './' + rootImage[8] + '/' + rootImage[9];
        enlargedImage.style.backgroundImage =  'url(' + imgaLocation + ')';
    }
}
// upload image https://stackoverflow.com/questions/22087076/how-to-make-a-simple-image-upload-using-javascript-html
//  all this will be changed to https://www.w3schools.com/howto/howto_js_draggable.asp
let paragraph = document.querySelector('.right-side p');

const topValue = document.getElementById("top")
const rightValue = document.getElementById("right");
const botValue = document.getElementById("bot");
const leftValue = document.getElementById("left");


let inputs = {'top': topValue, 'right': rightValue, 'bot': botValue, 'left': leftValue};
// inputs['top'] = topValue;
// inputs['right'] = rightValue;
// inputs['bot'] = botValue;
// inputs['left'] = leftValue;


Object.keys(inputs).forEach((input) => {
    inputs[input].addEventListener('keyup', event => {
        if (event.keyCode === 13) {
            event.preventDefault();
            switch(input) {
                case 'top':
                    paragraph.style.top = parseInt(input.value);
                    console.log(input.value)
                    break;
                case 'right':
                    paragraph.style.right = input.valuel
                    break;
                case 'bot':
                    paragraph.style.bottom = input.valuel
                    break;
                case 'left':
                    paragraph.style.left = input.valuel
                    break;
                    default: 'error';
            }
            console.log(paragraph.style.top)
        }
    });
});