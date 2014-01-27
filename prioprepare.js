

if (window.File && window.FileReader) {
  // Great success! All the File APIs are supported.
} else {
  alert('Sorry, your brower does not support.');
}


var hashFile = function(fileAsText) {
  // we are using cryptoJS https://code.google.com/p/crypto-js/
  var hash = CryptoJS.SHA256(fileAsText);
  return hash.toString(CryptoJS.enc.Hex);
};


function handleFileSelect(evt) {
  var files = evt.target.files; // FileList object
  
  if(files.length === 0) {
    // no file selected
    return;
  }

  var f = files[0];
  
  var reader = new FileReader();
  
  reader.onload = function(e) {
    
    var hash = hashFile(e.target.result);
    
    console.log(hash.length);
    console.log(hash);
    
    document.getElementById('output').innerHTML = hash;
    
    document.getElementById('sliced-output-0').value = hash.substr(0*16, 16);
    document.getElementById('sliced-output-1').value = hash.substr(1*16, 16);
    document.getElementById('sliced-output-2').value = hash.substr(2*16, 16);
    document.getElementById('sliced-output-3').value = hash.substr(3*16, 16);
    
  };
  
  reader.readAsText(f);
}

document.getElementById('file-input').addEventListener('change', handleFileSelect, false);