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
  if (sender.url === chrome.runtime.getURL('panel.html')) {
    // Execute the script that is send from Devtools (This is just an example)
    chrome.tabs.executeScript(request.tabId, {
      code: request.script,
    });
    return;
  }

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
