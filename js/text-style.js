function selectElemenetToEdit (selectedEl) {

// select text color
let selectTextColor = document.getElementById('text-color');
selectTextColor.addEventListener('change', () => {
    document.querySelector(selectedEl + ' p').style.color = selectTextColor.value;
})

let selectTextBgColor = document.getElementById('text-bg-color');
selectTextBgColor.addEventListener('change', () => {
    document.querySelector(selectedEl + ' p').style.backgroundColor = selectTextBgColor.value;
});

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
  $(selectedEl).rotate({angle: parseInt(angle.value)});
  document.getElementById('angle-value').innerHTML = angle.value
});

return true
}