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
  for (var j = 0; j < $views.length; j++) {
    if ($views[j].getAttribute('data-view') === $dataView) {
      $views[j].className = 'column-full column-half container view';
      data.view = $dataView;
    } else {
      $views[j].className = 'column-full column-half container hidden view';
    }
  }
}
$allPages.addEventListener('click', checkMatch);

function goToCreateNew(event) {
  for (var j = 0; j < $views.length; j++) {
    if ($views[j].getAttribute('data-view') === event.target.getAttribute('data-view')) {
      $views[j].className = 'column-full column-half container view';
      data.view = event.target.getAttribute('data-view');
    } else {
      $views[j].className = 'column-full column-half container hidden view';
    }
  }
}
$new.addEventListener('click', goToCreateNew);

function goToEntries(event) {
  for (var j = 0; j < $views.length; j++) {
    if ($views[j].getAttribute('data-view') === event.target.getAttribute('data-view')) {
      $views[j].className = 'column-full column-half container view';
      data.view = event.target.getAttribute('data-view');
    } else {
      $views[j].className = 'column-full column-half container hidden view';
    }
  }
}
$form.addEventListener('submit', goToEntries);

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

var dataObj = {};

window.addEventListener('beforeunload', function () {
  var localObj = localStorage.getItem('data');
  if (localObj !== null) {
    dataObj = JSON.parse(localObj);
  }
  var dataObjJSON = JSON.stringify(dataObj);
  localStorage.setItem('data', dataObjJSON);
});

$form.addEventListener('submit', addJournalToObj);
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
  var newTitle = document.createElement('h2');
  newTitle.className = 'margin-bottom-1-rem';
  var newDesc = document.createElement('p');
  newDesc.className = 'margin-bottom-1-rem entry-info';

  var titleText = document.createTextNode(data.entries[journalEntry].title);
  newTitle.appendChild(titleText);
  var descText = document.createTextNode(data.entries[journalEntry].notes);
  newDesc.appendChild(descText);
  newInfoContainer.appendChild(newTitle);
  newInfoContainer.appendChild(newDesc);

  newImage.setAttribute('src', data.entries[journalEntry].image);
  newImgContainer.appendChild(newImage);

  newLi.appendChild(newImgContainer);
  newLi.appendChild(newInfoContainer);

  return newLi;
}

function appendDOM(event) {
  for (var i = 0; i < data.entries.length; i++) {
    var newDOM = generateDomTree(i);
    $list.appendChild(newDOM);
  }
}

function addNewEntry(event) {
  var newDom = generateDomTree(0);
  $list.prepend(newDom);
}

window.addEventListener('DOMContentLoaded', appendDOM);
$form.addEventListener('submit', addNewEntry);

document.addEventListener('DOMContentLoaded', function (event) {
  if (data.view === 'entries') {
    $views[0].className = 'column-full column-half container hidden view';
    $views[1].className = 'column-full column-half container view';
  } else if (localStorage.getItem('entry-form') === 'entry-form') {
    $views[1].className = 'column-full column-half container hidden view';
    $views[0].className = 'column-full column-half container view';
  }
});
