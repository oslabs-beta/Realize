/* eslint-env browser */
import * as d3 from '../../libraries/d3.min.js';
import { data } from './data-example.js';
import ComponentDisplay from './componentDisplay';
import getValue from './search';
import { createTree } from './createTree';

// ################################# POPULATING THE PANEL
// name - String
// state - object
// stateCategory
// props - array?
// hooks if functional

const theInfoPanel = document.getElementById('info-panel');
const CompDisplay = new ComponentDisplay(theInfoPanel);



// ########################################## CREATE PORT CONNECTION WITH BACKGROUND.JS
const createPort = () => {
  console.log('Inside create port')
  const port = chrome.runtime.connect({ name: 'test' });
  port.postMessage({
    name: 'connect',
    tabID: chrome.devtools.inspectedWindow.tabId,
  });

  port.onMessage.addListener((message) => {
    // if (!message.data) return;
    console.log('message received by panel ', message);
    createTree(message, CompDisplay);
  });
};
createPort();

// For testing
// createTree(data[0], CompDisplay)



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