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

function submitNewEntry(event) {
  navigateToView(event);
  addJournalToObj();
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
}
$allPages.addEventListener('click', checkMatch);

function navigateToView(event) {
  var $dataView = event.target.getAttribute('data-view');
  switchView($dataView);
}
$new.addEventListener('click', navigateToView);

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

  // console.log(entryInfo);
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
  var newDom = generateDomTree(data.entries[0]);
  $list.prepend(newDom);
  $noEntries.className = 'no-entries hidden';
}

document.addEventListener('DOMContentLoaded', function (event) {
  switchView(data.view);
});

if (data.entries.length === 0) {
  $noEntries.className = 'no-entries';
} else if (data.entries.length > 0) {
  $noEntries.className = 'no-entries hidden';
}

$list.addEventListener('click', function (event) {
  var $dataView = event.target.getAttribute('data-view');
  var $oneList = event.target.getAttribute('id');

  // console.log(event.target);
  if ($dataView === 'entry-form') {
    $views[0].className = 'column-full column-half container view';
    data.view = 'entry-form';
  } else {
    $views[1].className = 'column-full column-half container view';
  }

  for (var i = 0; i < data.entries.length; i++) {
    var stringID = data.entries[i].entryID.toString();
    if ($oneList === stringID) {
      // console.log('hiiiiiiiiiiiiiii');
    }
  }
});

// function checkIdMatch(event) {

// }
