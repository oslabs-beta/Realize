
function handleMessage(request, sender, sendResponse) {

  // Check that the message is coming from the devtools panel and nowhere else
  if (sender.url != chrome.runtime.getURL("/devtools/panel/panel.html")) {
    console.log("Unknown sender");
    return;
  }

  // Execute the script that is send from Devtools (This is just an example)
  chrome.tabs.executeScript(
    request.tabId,
    {
      code: request.script
    }
  );
}

// Listen for messages from devtools
chrome.runtime.onMessage.addListener(handleMessage);