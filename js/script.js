const images = document.querySelectorAll(".gallery img").forEach(image => {
  image.addEventListener("click", () => {
 
// select image
const enlargedImage = document.querySelector(".right-side");
enlargedImage.innerHTML = ''
    let textsToDragAndEdit = [];

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
    grabTwo.append(secondP);

    textsToDragAndEdit.push(newGrab);
    textsToDragAndEdit.push(grabTwo);

    loadText(textsToDragAndEdit, enlargedImage);
    showImage(image, enlargedImage);
  });
});

function loadText (array, container) {
  array.forEach((newGrabClass, counter) => {
    container.append(newGrabClass);
    dragElement(document.querySelector('.grab-' + counter), counter);

    // click on text
    newGrabClass.addEventListener('click', () => {
      // do not activate click, when dragging element
      newGrabClass.addEventListener('click', () => {
        array.forEach(grabEl => {
          grabEl.classList.remove('editable')
        });

        newGrabClass.classList.add('editable');
        selectElemenetToEdit('.editable');
      })
    })
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

        // finding proportion to scale image without loosing quality
        let proportion = 0;
        imageOriginalHeight > imageOriginalWidth
        ? (proportion = Math.floor((imageOriginalHeight / imageOriginalWidth) * 10) / 10, divWidth = Math.floor(divHeight / proportion))
        : (proportion = Math.floor((imageOriginalWidth / imageOriginalHeight) * 10) / 10, divHeight = Math.floor(divWidth / proportion))

        let rootImage = image.src.split('/');
        let imgaLocation = './' + rootImage[8] + '/' + rootImage[9];

        imageLocation.style.backgroundImage =  'url(' + imgaLocation + ')';
        imageLocation.style.width = divWidth;
        imageLocation.style.height = divHeight;
    }
}