/* exported data */

var data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1
};
var localData = localStorage.getItem('data');

if (localData !== null) {
  localData = JSON.parse(localData);
  data = localData;
}

window.addEventListener('beforeunload', function (event) {
  var newData = JSON.stringify(data);
  localStorage.setItem('data', newData);
});
