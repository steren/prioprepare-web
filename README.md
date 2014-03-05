prioprepare-web
===============

Store a hash of your document in a bank transaction for priority statement.

For full information, see http://rschoenm.github.io/prioprepare/.

Usage
-----

Select or drag and drop a file to the window to compute its hash value. See the [Prioprepare webpage](http://rschoenm.github.io/prioprepare/) for more information.


Contributing
------------

### Improvements

* use [JSzip](http://stuartk.com/jszip/) to create a ready to be stored zip file with original file anf txt file containing hash.


### Code architecture

#### Chrome application 
`manifest.json` is used for Chrome app manifest. `background.js` is used to declare the Chrome app window. 
See https://developer.chrome.com/apps/first_app.html for more info.

