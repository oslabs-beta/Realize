/* eslint-env browser */
import * as d3 from '../../libraries/d3.min.js';
import { data } from './data-example.js';
import ComponentDisplay from './componentDisplay';
import { getValue } from './search';
import { createTree } from './createTree';
import { addInterationsListeners } from './interactions'

// Store 66% of the users screen width for creating the tree
const panelWidth = Math.floor(screen.width * 0.66);

// ########################################## CREATE PORT CONNECTION WITH BACKGROUND.JS
const createPort = () => {
  const port = chrome.runtime.connect({ name: 'test' });
  port.postMessage({
    name: 'connect',
    tabID: chrome.devtools.inspectedWindow.tabId,
  });

  port.onMessage.addListener((message) => {
    // if (!message.data) return;

    console.log('message received by panel ', message);
    createTree(message);
    addInterationsListeners()
  });
};
createPort();




// ################################# POPULATING THE PANEL
// name - String
// state - object
// stateCategory
// props - array?
// hooks if functional

const theInfoPanel = document.getElementById('info-panel');
const CompDisplay = new ComponentDisplay(theInfoPanel);

function populatePanel(dataObj) {
  // Grab the info panel element
  const infoPanel = document.getElementById('info-panel');
  // Add the name bar
  addNameBar(infoPanel, dataObj.name);

  CompDisplay.update(dataObj);
}

function addNameBar(infoPanel, componentName) {
  const titleBar = document.createElement('div');
  titleBar.className = 'component-title-bar';
  titleBar.innerHTML = `<div class="title">${componentName}</div>`;
  infoPanel.appendChild(titleBar);
}

let idFind = document.getElementById("searchInput")
idFind.addEventListener('keyup', () => {
  console.log('hi there');
  let value = document.getElementById("searchInput").value;
  getValue(value)
})

