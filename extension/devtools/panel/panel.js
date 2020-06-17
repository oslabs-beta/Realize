/* eslint-env browser */
import { data } from './data-example.js';
import ComponentDisplay from './componentDisplay';
import { createTree } from './createTree';
import * as d3 from '../../libraries/d3.js';
// import search from './search';
import { highlightNodes } from './interactions';

// Instantiate the Panel

const theInfoPanel = document.getElementById('info-panel');
const CompDisplay = new ComponentDisplay(theInfoPanel);

// ########################################## CREATE PORT CONNECTION WITH BACKGROUND.JS
const port = chrome.runtime.connect({ name: 'test' });
port.postMessage({
  name: 'connect',
  tabID: chrome.devtools.inspectedWindow.tabId,
});

port.onMessage.addListener((message) => {
  // if (!message.data) return;
  console.log('message received by panel ', message);
  if (typeof message === 'object') {
    createTree(message, CompDisplay);
  } else {
    d3.select('#error-message')
      .style('visibility', 'visible')
      .text(message)
  }
  
});

chrome.runtime.sendMessage({
  name: 'inject-script',
  tabID: chrome.devtools.inspectedWindow.tabId,
});

// For testing
// createTree(data[0], CompDisplay)
let search = document.getElementById('searchInput')
console.log(search)
search.addEventListener("keyup", function(event) {
  console.log("Inside event listener")
  console.log("event", event)
  if (event.keyCode === 13){
    console.log('hit');
    let input = search.value.toLowerCase()
    console.log('input', input)
    highlightNodes(input)
    search.textContent = ''
  }
})


// ##################################################### ATTEMPT TO IMPORT FONT!!!!
let font = new FontFace("Ubuntu", "url('ubuntu.woff2')");
// document.fonts.add(font);

font.load().then(function(loadedFont)
{
    document.fonts.add(loadedFont);
    //do something after the font is loaded
    console.log('good job the font loaded')
}).catch(function(error) {
    // error occurred
});