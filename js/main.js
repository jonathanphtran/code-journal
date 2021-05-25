/* global data */
/* exported data */

var $img = document.querySelector('img');
var $form = document.querySelector('form');
var $photoUrlInput = document.querySelector('#photo-URL');
var $titleInput = document.querySelector('#title');
var $notesInput = document.querySelector('#notes');

$photoUrlInput.addEventListener('input', changeImage);

function changeImage() {
  event.preventDefault();
  var newImg = $form[1].value;
  if (newImg === '') {
    $img.setAttribute('src', 'images/placeholder-image-square.jpg');
  } else {
    $img.setAttribute('src', newImg);
  }
}

$form.addEventListener('submit', addJournalToObj);

function addJournalToObj() {
  event.preventDefault();

  var entryInfo = {};

  var newTitle = $form[0].value;
  var newImg = $form[1].value;
  var newNotes = $form[2].value;

  entryInfo.title = newTitle;
  entryInfo.image = newImg;
  entryInfo.notes = newNotes;
  entryInfo.entryID = data.nextEntryId;

  data.nextEntryId++;

  data.entries.push(entryInfo);

  $img.setAttribute('src', 'images/placeholder-image-square.jpg');
  $photoUrlInput.value = '';
  $titleInput.value = '';
  $notesInput.value = '';

}

window.addEventListener('beforeunload', function (event) {
  var newData = JSON.stringify(data);
  localStorage.setItem('data', newData);
});
