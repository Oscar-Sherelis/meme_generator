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
  console.log($("p").data("id"))
});