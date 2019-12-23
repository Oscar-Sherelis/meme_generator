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
    console.log(fontSize.value)
    document.querySelector('#grab p').style.fontSize = fontSize.value
    document.getElementById('selectedSize').innerHTML = fontSize.value + 'px'
});


// text rotation
let newImageZIndex = 1;         // To make sure newly-loaded images land on top of images on the table
let loaded = false;             // Used to prevent initPhotos() running twice
let imageBeingRotated = false;  // The DOM image currently being rotated (if any)
let mouseStartAngle = false;    // The angle of the mouse relative to the image centre at the start of the rotation
let imageStartAngle = false;    // The rotation angle of the image at the start of the rotation


function initPhotos() {

  // (Ensure this function doesn't run twice)
  if ( loaded ) return;
  loaded = true;

  // The table image has loaded, so bring in the table
  $('#grab').fadeIn('fast');

  // Add an event handler to stop the rotation when the mouse button is released
  $(document).mouseup( stopRotate );

  // Process each photo in turn...
  $('#grab p').each( function(index) {

    // Set a random position and angle for this photo
    let left = Math.floor( Math.random() * 450 + 100 );
    let top = Math.floor( Math.random() * 100 + 100 );
    let angle = Math.floor( Math.random() * 60 - 30 );
    $(this).css( 'left', left+'px' );
    $(this).css( 'top', top+'px' );
    $(this).css( 'transform', 'rotate(' + angle + 'deg)' );   
    $(this).css( '-moz-transform', 'rotate(' + angle + 'deg)' );   
    $(this).css( '-webkit-transform', 'rotate(' + angle + 'deg)' );
    $(this).css( '-o-transform', 'rotate(' + angle + 'deg)' );
    $(this).data('currentRotation', angle * Math.PI / 180 );

    // Make the photo draggable
    $(this).draggable( { containment: 'parent', stack: '#grab p', cursor: 'pointer', start: dragStart } );

    // Make the photo rotatable
    $(this).mousedown( startRotate );

    // Make the lightbox pop up when the photo is clicked
    $(this).bind( 'click', function() { openLightbox( this ) } );

    // Hide the photo for now, in case it hasn't finished loading
    $(this).hide();

    // When the photo image has loaded...
    $(this).load( function() {

      // (Ensure this function doesn't run twice)
      if ( $(this).data('loaded') ) return;
      $(this).data('loaded', true);

      // Record the photo's true dimensions
      let imgWidth = $(this).width();
      let imgHeight = $(this).height();

      // Make the photo bigger, so it looks like it's high above the table
      $(this).css( 'width', imgWidth * 1.5 );
      $(this).css( 'height', imgHeight * 1.5 );

      // Make it completely transparent, ready for fading in
      $(this).css( 'opacity', 0 );

      // Make sure its z-index is higher than the photos already on the table
      $(this).css( 'z-index', newImageZIndex++ );

      // Gradually reduce the photo's dimensions to normal, fading it in as we go
      $(this).animate( { width: imgWidth, height: imgHeight, opacity: .95 }, 1200 );
    } );

    // Hack for browsers that don't fire load events for cached images
    if ( this.complete ) $(this).trigger("load");

  });

}

// Prevent the image being dragged if it's already being rotated

function dragStart( e, ui ) {
  if ( imageBeingRotated ) return false;
}

// Open the lightbox only if an image isn't currently being rotated

function openLightbox( image ) {
  if ( !imageBeingRotated ) {
    let imageFile = $(image).attr('src');
    imageFile = imageFile.replace ( /^slides\//, "" )
    let imageCaption = $(image).attr('alt');
    $.colorbox( {
                href:'slides-big/'+imageFile,
                maxWidth: "900px",
                maxHeight: "600px",
                title: imageCaption
                } );
   return false;
  }
}

// Start rotating an image

function startRotate( e ) {

  // Exit if the shift key wasn't held down when the mouse button was pressed
  if ( !e.shiftKey ) return;

  // Track the image that we're going to rotate
  imageBeingRotated = this;

  // Store the angle of the mouse at the start of the rotation, relative to the image centre
  let imageCentre = getImageCentre( imageBeingRotated );
  let mouseStartXFromCentre = e.pageX - imageCentre[0];
  let mouseStartYFromCentre = e.pageY - imageCentre[1];
  mouseStartAngle = Math.atan2( mouseStartYFromCentre, mouseStartXFromCentre );

  // Store the current rotation angle of the image at the start of the rotation
  imageStartAngle = $(imageBeingRotated).data('currentRotation');

  // Set up an event handler to rotate the image as the mouse is moved
  $(document).mousemove( rotateImage );

  return false;
}

// Stop rotating an image

function stopRotate( e ) {

  // Exit if we're not rotating an image
  if ( !imageBeingRotated ) return;

  // Remove the event handler that tracked mouse movements during the rotation
  $(document).unbind( 'mousemove' );

  // Cancel the image rotation by setting imageBeingRotated back to false.
  // Do this in a short while - after the click event has fired -
  // to prevent the lightbox appearing once the Shift key is released.
  setTimeout( function() { imageBeingRotated = false; }, 10 );
  return false;
}

// Rotate image based on the current mouse position

function rotateImage( e ) {

  // Exit if we're not rotating an image
  if ( !e.shiftKey ) return;
  if ( !imageBeingRotated ) return;

  // Calculate the new mouse angle relative to the image centre
  let imageCentre = getImageCentre( imageBeingRotated );
  let mouseXFromCentre = e.pageX - imageCentre[0];
  let mouseYFromCentre = e.pageY - imageCentre[1];
  let mouseAngle = Math.atan2( mouseYFromCentre, mouseXFromCentre );

  // Calculate the new rotation angle for the image
  let rotateAngle = mouseAngle - mouseStartAngle + imageStartAngle;

  // Rotate the image to the new angle, and store the new angle
  $(imageBeingRotated).css('transform','rotate(' + rotateAngle + 'rad)');
  $(imageBeingRotated).css('-moz-transform','rotate(' + rotateAngle + 'rad)');
  $(imageBeingRotated).css('-webkit-transform','rotate(' + rotateAngle + 'rad)');
  $(imageBeingRotated).css('-o-transform','rotate(' + rotateAngle + 'rad)');
  $(imageBeingRotated).data('currentRotation', rotateAngle );
  return false;
}

// Calculate the centre point of a given image

function getImageCentre( image ) {

  // Rotate the image to 0 radians
  $(image).css('transform','rotate(0rad)');
  $(image).css('-moz-transform','rotate(0rad)');
  $(image).css('-webkit-transform','rotate(0rad)');
  $(image).css('-o-transform','rotate(0rad)');

  // Measure the image centre
  let imageOffset = $(image).offset();
  let imageCentreX = imageOffset.left + $(image).width() / 2;
  let imageCentreY = imageOffset.top + $(image).height() / 2;

  // Rotate the image back to its previous angle
  let currentRotation = $(image).data('currentRotation');
  $(imageBeingRotated).css('transform','rotate(' + currentRotation + 'rad)');
  $(imageBeingRotated).css('-moz-transform','rotate(' + currentRotation + 'rad)');
  $(imageBeingRotated).css('-webkit-transform','rotate(' + currentRotation + 'rad)');
  $(imageBeingRotated).css('-o-transform','rotate(' + currentRotation + 'rad)');

  // Return the calculated centre coordinates
  return Array( imageCentreX, imageCentreY );
}