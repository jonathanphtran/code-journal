/* global data */
/* exported data */

var $img = document.querySelector('img');
var $form = document.querySelector('form');
var $photoURL = document.querySelector('#photo-URL');

var entryInfo = {};

$photoURL.addEventListener('input', changeImage);

function changeImage() {
  event.preventDefault();
  var newImg = $form[1].value;
  $img.setAttribute('src', newImg);
}

$form.addEventListener('submit', addJournalToObj);

function addJournalToObj() {
  event.preventDefault();

  var newTitle = $form[0].value;
  var newImg = $form[1].value;
  var newNotes = $form[2].value;

  entryInfo.title = newTitle;
  entryInfo.image = newImg;
  entryInfo.notes = newNotes;
  entryInfo.entryID = data.nextEntryId;

  data.nextEntryId++;

}
