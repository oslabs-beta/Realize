// THIS PAGE IS TO STORE THE JAVASCRIPT NEEDED INSIDE THE DEVTOOLS PANEL

// ALSO, FROM HERE WE CAN SEND MESSAGES TO THE BACKGROUND.js
// EXAMPLE BELOW WHERE WE SEND A SCRIPT TO BACKGROUND.js
// THIS SCRIPT IS THEN RUN IN THE OPEN WINDOW BY BACKGROUND.JS

/**
EXAMPLE
When the user clicks the 'message' button,
send a message to the background script.
*/
const scriptToAttach = "alert('Hi from the devtools');";
document.getElementById("alert-button").addEventListener("click", () => {
  chrome.runtime.sendMessage({
    tabId: chrome.devtools.inspectedWindow.tabId,
    script: scriptToAttach
  });
});

// EXAMPLE 2 - You can also eval scripts into main pages

const evalString = "document.getElementById('body').style.backgroundColor = 'pink'"
document.getElementById("color-button").addEventListener("click", () => {
  chrome.devtools.inspectedWindow.eval(evalString);
});