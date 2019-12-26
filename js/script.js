const images = document.querySelectorAll(".gallery img").forEach(image => {
  image.addEventListener("click", () => {
 
// select image
const enlargedImage = document.querySelector(".right-side");
enlargedImage.innerHTML = ''
    let paragraphArray = [];

    let firstP = document.createElement('p');
    firstP.innerHTML = "Hello grab and drag me";
    let counter = 0;
    // make paragraph visible
    firstP.style.display = 'block';
    // to drag element
    firstP.style.position = 'absolute';
    let newGrab = document.createElement('div');
    newGrab.setAttribute('class', 'grab-' + counter);
    newGrab.style.position = 'absolute';
    newGrab.style.cursor = 'move';
    newGrab.append(firstP)

    let secondP = document.createElement('p');
    secondP.innerHTML = "Hello grab and drag me";
    // make paragraph visible
    secondP.style.display = 'block';
    // to drag element
    secondP.style.position = 'absolute';
    let grabTwo = document.createElement('div');
    grabTwo.setAttribute('class', 'grab-1');
    grabTwo.style.position = 'absolute';
    grabTwo.style.cursor = 'move';
    grabTwo.append(secondP)

    paragraphArray.push(newGrab);
    paragraphArray.push(grabTwo)

    let countMe = 0;
    let clickCounter = '';
    let clickedEl = ''
    paragraphArray.forEach((newGrabClass, counter) => {
      enlargedImage.append(newGrabClass);
      dragElement(document.querySelector('.grab-' + counter), counter);

      // click on text
      newGrabClass.addEventListener('click', () => {
        // do not activate click, when dragging element
        newGrabClass.addEventListener('click', () => {
          paragraphArray.forEach(grabEl => {
            grabEl.classList.remove('editable')
          });

          newGrabClass.classList.add('editable');
          clickCounter = counter;
          selectElemenetToEdit('.editable');
        })
      })
    });
    showImage(image, enlargedImage);
  });
});
// enlarge image
function showImage(clickedImage, imageLocation) {

    let selectedImage = clickedImage.src;
    let image = new Image();
    image.src = selectedImage;
    image.onload = () => {
        let rootImage = image.src.split('/');
        let imgaLocation = './' + rootImage[8] + '/' + rootImage[9];
        // console.log(image.width)
        imageLocation.style.backgroundImage =  'url(' + imgaLocation + ')';
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