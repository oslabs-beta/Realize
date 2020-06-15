/* eslint-disable consistent-return */
const connectedTabs = {};

chrome.runtime.onConnect.addListener((port) => {
  const panelListener = (request, sender, sendResponse) => {
    if (request.name === 'connect' && request.tabID) {
      console.log('tab connected, tabs: ', connectedTabs);
      connectedTabs[request.tabID] = port;
    }
  };

  port.onMessage.addListener(panelListener);
  port.onDisconnect.addListener(function (port) {
    port.onMessage.removeListener(panelListener);

    const tabs = Object.keys(connectedTabs);
    for (let k = 0; k < tabs.length; k++) {
      if (connectedTabs[tabs[k]] === port) {
        delete connectedTabs[tabs[k]];
        break;
      }
    }
  });
});

function handleMessage(request, sender, sendResponse) {
  // if from panel

  if (sender.tab) {
    const tabID = sender.tab.id;
    if (tabID in connectedTabs) {
      connectedTabs[tabID].postMessage(request);
      console.log('message sent to tab: ', tabID);
    }
  }

  return Promise.resolve('Dummy resolution for browser happiness');
}

// Listen for messages from devtools
chrome.runtime.onMessage.addListener(handleMessage);

// Called when the user clicks on the browser action.
chrome.browserAction.onClicked.addListener(function(tab) {
  // No tabs or host permissions needed!
  console.log('Turning ' + tab.url + ' red!');
  chrome.tabs.executeScript({
    file: "./content_script.js"
  });
})