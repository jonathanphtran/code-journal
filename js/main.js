/* global data */
/* exported data */

var $img = document.querySelector('img');
var $form = document.querySelector('form');
var $photoUrlInput = document.querySelector('#photo-URL');
var $titleInput = document.querySelector('#title');
var $notesInput = document.querySelector('#notes');
var $allPages = document.querySelector('.allPages');
var $pages = document.querySelectorAll('.page');
var $views = document.querySelectorAll('.view');
var $list = document.querySelector('.list');
var $new = document.querySelector('.new');
var $noEntries = document.querySelector('.no-entries');
var $entryTitle = document.querySelector('h1');
var $deleteButton = document.querySelector('.delete');
var $btnContainer = document.querySelector('.btn-container');
var $overlay = document.querySelector('.overlay');
var $popUpRow = document.querySelector('.popUpRow');
var $cancel = document.querySelector('.cancel');
// var $confirm = document.querySelector('.confirm');

function submitNewEntry(event) {
  event.preventDefault();
  navigateToView(event);
  if (data.editing === null) {
    addJournalToObj();
  }
  addNewEntry(event);
}

$form.addEventListener('submit', submitNewEntry);

function switchView(nameOfView) {
  for (var i = 0; i < $views.length; i++) {
    if ($views[i].getAttribute('data-view') === nameOfView) {
      $views[i].className = 'column-full column-half container view';
      data.view = nameOfView;
    } else {
      $views[i].className = 'column-full column-half container hidden view';
    }
  }
  $entryTitle.innerText = 'New Entry';
}

function checkMatch(event) {
  var $match = event.target.matches('.page');
  if (!$match) return;

  for (var i = 0; i < $pages.length; i++) {
    if ($pages[i] === event.target) {
      $pages[i].className = 'margin-1-rem column-30 page active';
    } else {
      $pages[i].className = 'margin-1-rem column-30 page';
    }
  }

  var $dataView = event.target.getAttribute('data-view');
  switchView($dataView);
  data.editing = null;
}
$allPages.addEventListener('click', checkMatch);

function navigateToView(event) {
  var $dataView = event.target.getAttribute('data-view');
  switchView($dataView);
  $deleteButton.className = 'delete hidden';
  $btnContainer.className = 'row btn-container flex-end';
}

function resetValues(event) {
  $photoUrlInput.value = '';
  $titleInput.value = '';
  $notesInput.value = '';
  changeImage();
}
$new.addEventListener('click', navigateToView);
$new.addEventListener('click', resetValues);

function changeImage() {
  event.preventDefault();
  var newImg = $form.elements['photo-URL'].value;
  if (newImg === '') {
    $img.setAttribute('src', 'images/placeholder-image-square.jpg');
  } else {
    $img.setAttribute('src', newImg);
  }
}
$photoUrlInput.addEventListener('input', changeImage);

function addJournalToObj() {
  event.preventDefault();

  var entryInfo = {};

  var newTitle = $form.elements.title.value;
  var newImg = $form.elements['photo-URL'].value;
  var newNotes = $form.elements.notes.value;

  entryInfo.title = newTitle;
  entryInfo.image = newImg;
  entryInfo.notes = newNotes;
  entryInfo.entryID = data.nextEntryId;

  data.nextEntryId++;

  data.entries.unshift(entryInfo);

  $img.setAttribute('src', 'images/placeholder-image-square.jpg');
  $photoUrlInput.value = '';
  $titleInput.value = '';
  $notesInput.value = '';

}

function generateDomTree(journalEntry) {
  var newLi = document.createElement('li');
  newLi.className = 'row margin-top1-bottom2';

  var newImgContainer = document.createElement('div');
  newImgContainer.className = 'img-container entry-info left width-100';
  var newImage = document.createElement('img');

  var newInfoContainer = document.createElement('div');
  newInfoContainer.className = 'right';
  var rowOne = document.createElement('div');
  rowOne.className = 'row space-between';
  var iconContainer = document.createElement('div');
  iconContainer.className = 'icon-container';

  var newTitle = document.createElement('h2');
  newTitle.className = 'margin-bottom-1-rem';
  var newEditIcon = document.createElement('i');
  newEditIcon.setAttribute('id', journalEntry.entryID);
  newEditIcon.className = 'fas fa-pen edit-icon';
  newEditIcon.setAttribute('data-view', 'entry-form');
  var newDesc = document.createElement('p');
  newDesc.className = 'margin-bottom-1-rem entry-info';

  var titleText = document.createTextNode(journalEntry.title);
  newTitle.appendChild(titleText);
  var descText = document.createTextNode(journalEntry.notes);
  newDesc.appendChild(descText);

  iconContainer.append(newEditIcon);
  rowOne.append(newTitle);
  rowOne.append(iconContainer);
  newInfoContainer.appendChild(rowOne);
  newInfoContainer.appendChild(newDesc);

  newImage.setAttribute('src', journalEntry.image);
  newImgContainer.appendChild(newImage);

  newLi.appendChild(newImgContainer);
  newLi.appendChild(newInfoContainer);

  return newLi;
}

function appendDOM(event) {
  for (var i = 0; i < data.entries.length; i++) {
    var newDOM = generateDomTree(data.entries[i]);
    $list.appendChild(newDOM);
  }
}

window.addEventListener('DOMContentLoaded', appendDOM);

function addNewEntry(event) {

  if (data.editing === null) {
    var newDom = generateDomTree(data.entries[0]);
    $list.prepend(newDom);
    $noEntries.className = 'no-entries hidden';
  } else {
    var $allIds = document.querySelectorAll('i');
    var $allLi = document.querySelectorAll('li');
    data.editing.title = $form.elements.title.value;
    data.editing.image = $form.elements['photo-URL'].value;
    data.editing.notes = $form.elements.notes.value;
    var newEditDom = generateDomTree(data.editing);

    for (var i = 0; i < $allIds.length; i++) {
      var stringEntryID = data.editing.entryID.toString();
      var stringID = $allIds[i].getAttribute('id');
      if (stringEntryID === stringID) {
        $allLi[i].replaceWith(newEditDom);
      }
    }
  }
}

document.addEventListener('DOMContentLoaded', function (event) {
  switchView(data.view);
  data.editing = null;
});

if (data.entries.length === 0) {
  $noEntries.className = 'no-entries';
} else if (data.entries.length > 0) {
  $noEntries.className = 'no-entries hidden';
}

$list.addEventListener('click', function (event) {
  var $dataView = event.target.getAttribute('data-view');
  var $oneList = event.target.getAttribute('id');

  if (event.target.className === 'fas fa-pen edit-icon') {
    switchView($dataView);
  }

  for (var j = 0; j < data.entries.length; j++) {
    var stringID = data.entries[j].entryID.toString();
    if ($oneList === stringID) {
      data.editing = data.entries[j];
    }
  }

  $titleInput.value = data.editing.title;
  $photoUrlInput.value = data.editing.image;
  $notesInput.value = data.editing.notes;
  $entryTitle.innerText = 'Edit Entry';

  changeImage();

  $deleteButton.className = 'delete';
  $btnContainer.className = 'row btn-container space-between';

});

function showModal(event) {
  $overlay.className = 'overlay';
  $popUpRow.className = 'row flex-center popUpRow';
}
$deleteButton.addEventListener('click', showModal);

function closeModal(evnet) {
  $overlay.className = 'overlay hidden';
  $popUpRow.className = 'row flex-center popUpRow hidden';
}
$cancel.addEventListener('click', closeModal);
