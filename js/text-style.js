function selectElemenetToEdit (selectedEl, pId) {
// select text color
let selectColor = document.getElementById('color');
selectColor.addEventListener('change', () => {
    document.querySelector(selectedEl + ' p').style.color = selectColor.value;
    document.querySelector(selectedEl + ' p').style.border = "2px solid black";
    console.log(document.querySelector(selectedEl))
})
// users inserted text
const userText = document.getElementById('userText');
userText
.addEventListener('change', () => {
    document.querySelector(selectedEl + ' p').innerHTML = userText.value;
});

// user text font-size
const fontSize = document.getElementById('font-size');
fontSize
.addEventListener('change', () => {
    document.querySelector(selectedEl + ' p').style.fontSize = fontSize.value
    document.getElementById('selectedSize').innerHTML = fontSize.value + 'px'
});

// rotation for now only one paragraph
const angle = document.getElementById('angle');
angle.addEventListener('change', () => {
  $("p").eq(pId).rotate({angle: parseInt(angle.value)});
  document.getElementById('angle-value').innerHTML = angle.value
});

return true
}