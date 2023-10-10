//Links that needs to be added to the root file
//Manifest link added to the index html file
var link1 = window.document.createElement('link');
link1.rel = 'manifest';
link1.href = 'manifest.json';
window.document.head.appendChild(link1);

//links added to the index html file to handle ios and android mobile installs
var link2 = window.document.createElement('link');
link2.rel = 'icon';
link2.href = 'images/custom/favicon.png';
window.document.head.appendChild(link2);

var link3 = window.document.createElement('link');
link3.rel = 'apple-touch-icon';
link3.href = 'images/custom/favicon.png';
window.document.head.appendChild(link3);

//This block is to register service worker and save the install event for chrome install popup
var deferredPrompt;
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js').then(function (registration) {
    console.log('SW registration succeeded with scope:', registration.scope);

    window.addEventListener('beforeinstallprompt', function (event) {
      console.log(event);
      // Prevent Chrome 67 and earlier from automatically showing the prompt
      event.preventDefault()
      // Stash the event so it can be triggered later.
      deferredPrompt = event;
      console.log(deferredPrompt);
    });

    window.addEventListener('appinstalled', function (event) {
      removeButton();
      deferredPrompt = null;
      // Log install to analytics
      console.log("INSTALL: Success");
      window.localStorage.setItem("pwainstalled", "true");
    });
  }).catch(function (e) {
    console.log('SW registration failed with error:', e);
  });
}

//Add the listener of the custom block to show install popup in case of chrome
window.document.getElementById('btn-pwa-install').addEventListener('click', function () {
  console.log('inside click');
  onClickInstall();
});

//Check if the site is on iOS/MacOS
function isThisDeviceOniOS() {
  if (isIos() && isSafari()) {
    return true;
  } else {
    return false;
  }
}

// Detects if device is on iOS
function isIos() {
  const userAgent = window.navigator.userAgent.toLowerCase();
  return /iphone|ipad|ipod|macintosh/.test(userAgent);
}

// Detects if the site is on Safari
function isSafari() {
  return navigator.vendor && navigator.vendor.indexOf('Apple') > -1 &&
    navigator.userAgent &&
    navigator.userAgent.indexOf('CriOS') === -1 &&
    navigator.userAgent.indexOf('FxiOS') === -1;
}

//Install popup or disclaimer popup based on the OS
function onClickInstall() {
  if (deferredPrompt) {
    console.log("inside window.deferredPrompt if condition");
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === "accepted") {
        console.log("User accepted the install prompt");
      } else {
        console.log("User dismissed the install prompt");
      }
    });
  } else {
    if (isThisDeviceOniOS()) {
      window.alert("To install this web app on your device follow the below steps:\n 1. Click the Share icon (the square icon with an arrow pointing up out of the top)\n 2. Select the 'Add to Homescreen' option");
    }
  }
}

//Remove the custom block once installed as PWA
function removeButton() {
  console.log("inside remove button");
  var elem = window.document.getElementById('block-pwa-header');
  elem.remove();
}
