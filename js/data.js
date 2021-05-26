/* exported data */
/* exported pageView */

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

var dataObj = {};

window.addEventListener('beforeunload', function () {
  var localObj = localStorage.getItem('data');
  if (localObj !== null) {
    dataObj = JSON.parse(localObj);
  }
  var dataObjJSON = JSON.stringify(dataObj);
  localStorage.setItem('data', dataObjJSON);
});
