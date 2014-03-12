/*global CryptoJS, NProgress */

if (window.File && window.FileReader) {
  // Great success! All the File APIs are supported.
} else {
  alert('Sorry, your brower does not support features needed for this service.');
}

var fileInput = document.getElementById('file-input');
var drophere = document.getElementById('js-drophere');
var dropbox = document.getElementById('js-dropbox');
var dropmask = document.getElementById('drop-mask');
var output = document.getElementById('output');

output.onclick = function() {
  output.focus();
  output.select();
};

var hashFile = function(fileAsArrayBuffer) {
  // we are using cryptoJS https://code.google.com/p/crypto-js/
  var hash = CryptoJS.SHA256(CryptoJS.lib.WordArray.create(fileAsArrayBuffer));
  return hash.toString(CryptoJS.enc.Hex);
};


function errorHandler(evt) {
  switch(evt.target.error.code) {
    case evt.target.error.NOT_FOUND_ERR:
      document.getElementById('todo-next').textContent = 'File Not Found!';
      break;
    case evt.target.error.NOT_READABLE_ERR:
      document.getElementById('todo-next').textContent = 'File is not readable';
      break;
    case evt.target.error.ABORT_ERR:
      break; // noop
    default:
      document.getElementById('todo-next').textContent = 'An error occurred reading this file.';
  };
}

function handleFiles(/* FileList */ files) {
  if(files.length === 0) {
    // no file selected
    return;
  }

  var f = files[0];

  var reader = new FileReader();

  reader.onerror = errorHandler;

  reader.onprogress = function(evt) {
    // evt is an ProgressEvent.
    if (evt.lengthComputable) {
      NProgress.set(evt.loaded / evt.total);
    }
  }


  reader.onloadstart = function(e) {
    NProgress.start();
  };

  reader.onload = function(e) {
    NProgress.done();

    var hash = hashFile(e.target.result);

    // hide file input and display file name instead
    document.getElementById('filename').textContent = f.name;
    fileInput.style.display = 'none';

    var cleanedName = f.name;
    cleanedName.replace(/[^A-Z0-9.\-]/gi, '');

    var finalText = 'SHA256 hash value ' + hash + ' ' + cleanedName;

    console.log(finalText);

    output.value = finalText;
    output.classList.add('non-disabled');
    output.focus();
    output.select();

    document.getElementById('todo-next').textContent = 'Copy this entire text in a bank transfert statement.';
  };

  reader.readAsArrayBuffer(f);
}

var onFileInputChange = function(e) {
  handleFiles(e.target.files);
};
fileInput.addEventListener('change', onFileInputChange, false);

var addDropInfo = function() {
  dropmask.style.display = 'block';

  // display a "drop here" message
  drophere.style.display = 'block';
  drophere.innerHTML = '<strong>Drop</strong> this file anywhere on this window to compute its hash value.';

  // change the dropbox color
  dropbox.classList.add("dropme");
};

var removeDropInfo = function() {
  dropmask.style.display = 'none';
  drophere.style.display = 'none';
  drophere.innerHTML = '';
  dropbox.classList.remove("dropme");
};

var drop = function (e) {
  e.stopPropagation();
  e.preventDefault();
  removeDropInfo();

  var dt = e.dataTransfer;
  var files = dt.files;

  // this will trigger a "change" event for the inpur element
  handleFiles(files);
};

var dragover = function(e) {
  console.log("dragover");

  e.preventDefault();
  addDropInfo();
};

var dragleave = function(e) {
  console.log("dragleave");

  e.preventDefault();
  removeDropInfo();
};

dropbox.addEventListener("dragover", dragover, false);
dropmask.addEventListener("dragleave", dragleave, false);
dropmask.addEventListener("drop", drop, false);




