/* global chrome */
chrome.app.runtime.onLaunched.addListener(function() {
  chrome.app.window.create('index.html', {
    'bounds': {
      'width': 500,
      'height': 280
    },
    'resizable': false,
    'alwaysOnTop': true
    });
});