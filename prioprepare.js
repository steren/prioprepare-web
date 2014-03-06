/*global CryptoJS */

if (window.File && window.FileReader) {
  // Great success! All the File APIs are supported.
} else {
  alert('Sorry, your brower does not support features needed for this service.');
}

var fileInput = document.getElementById('file-input');
var drophere = document.getElementById('js-drophere');
var dropbox = document.getElementById("js-dropbox");
var dropmask = document.getElementById("drop-mask");

var hashFile = function(fileAsText) {
  // we are using cryptoJS https://code.google.com/p/crypto-js/
  var hash = CryptoJS.SHA256(fileAsText);
  return hash.toString(CryptoJS.enc.Hex);
};

function handleFiles(/* FileList */ files) {
  if(files.length === 0) {
    // no file selected
    return;
  }

  var f = files[0];
  
  var reader = new FileReader();
  
  reader.onload = function(e) {
    
    var hash = hashFile(e.target.result);
    
    // hide file input and display file name instead
    document.getElementById('filename').innerText = f.name;
    fileInput.style.display = 'none';
    
    var cleanedName = f.name;
    cleanedName.replace(/[^A-Z0-9.\-]/gi, '');
    
    var finalText = 'SHA256 hash value ' + hash + ' ' + cleanedName;
    
    console.log(finalText);
    
    document.getElementById('output').value = finalText;
    document.getElementById('output').classList.add('non-disabled')
    
    document.getElementById('todo-next').innerText = 'Copy this entire text in a bank transfert statement.'
    
    // document.getElementById('sliced-output-0').value = hash.substr(0*16, 16);
    // document.getElementById('sliced-output-1').value = hash.substr(1*16, 16);
    // document.getElementById('sliced-output-2').value = hash.substr(2*16, 16);
    // document.getElementById('sliced-output-3').value = hash.substr(3*16, 16);
    
  };
  
  reader.readAsText(f);
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




