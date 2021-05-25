/* global data */
/* exported data */

var $img = document.querySelector('img');
var $form = document.querySelector('form');

$form.addEventListener('submit', changeImage);
function changeImage() {
  event.preventDefault();
  var newImg = $form[1].value;
  $img.setAttribute('src', newImg);
}
