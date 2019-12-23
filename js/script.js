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