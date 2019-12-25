let firstP = document.createElement('p');
firstP.innerHTML = "Hello";
let paragraphArray = [];
paragraphArray.push(firstP);

// select image
const enlargedImage = document.querySelector(".right-side");
const images = document.querySelectorAll(".gallery img").forEach(image => {
  image.addEventListener("click", () => {
    document.querySelector('.grab p').style.display = "block";

    paragraphArray.forEach((pTag, index) => {
      // make paragraph visible
      pTag.style.display = 'block';
      // to drag element
      pTag.style.position = 'absolute'
      let newGrab = document.createElement('div');
      newGrab.setAttribute('class', 'grab-' + index);
      newGrab.style.position = 'absolute';
      newGrab.style.cursor = 'move'
      newGrab.addEventListener('click', () => {
        dragElement(document.querySelector('.grab-' + index), index)
      })
      newGrab.append(pTag);
      enlargedImage.append(newGrab);
    });
    addImage(image);
    dragElement(document.querySelector(".grab"));
  });
});

function selectPtoEdit (pElement) {
  const idValue = pElement.getAttribute('data-id');
}

// enlarge image
function addImage(clickedImage) {

    let selectedImage = clickedImage.src;
    let image = new Image();
    image.src = selectedImage;
    image.onload = () => {
        let rootImage = image.src.split('/');
        let imgaLocation = './' + rootImage[8] + '/' + rootImage[9];
        // console.log(image.width)
        enlargedImage.style.backgroundImage =  'url(' + imgaLocation + ')';
        // works
        // enlargedImage.style.width = 400;
    }
}
// upload image https://stackoverflow.com/questions/22087076/how-to-make-a-simple-image-upload-using-javascript-html
// get element by attribute https://stackoverflow.com/questions/2694640/find-an-element-in-dom-based-on-an-attribute-value
// DOM explaination https://programmingwithmosh.com/react/react-virtual-dom-explained/?utm_sq=g01x15bsp7&utm_source=Facebook&utm_medium=social&utm_campaign=ProgrammingwithMosh&utm_content=JavaScript&fbclid=IwAR0IcFKVi4XvsG1M7d3nCfbeGOUSsc2I23bfq5Cpge9Vf0Nl7l1kFQppZ_o
// forEach object like array https://stackoverflow.com/questions/18804592/javascript-foreach-loop-on-associative-array-object/18804596
// get by attribute https://stackoverflow.com/questions/5309926/how-to-get-the-data-id-attribute
// keyUp https://stackoverflow.com/questions/3781142/jquery-or-javascript-how-determine-if-shift-key-being-pressed-while-clicking-an
// design patterns https://www.amazon.com/Design-Patterns-Elements-Reusable-Object-Oriented-ebook/dp/B000SEIBB8

/**
 * Create p array
 * after press add 
 */