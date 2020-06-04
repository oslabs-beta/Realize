// This creates the dev tools panel using the panel.html file as the template

chrome.devtools.panels.create(
  'Realise', // title
  'palm-tree.svg', // icon
  './panel.html', // content
  function () {
    const port = chrome.runtime.connect({ name: 'test' });
    port.postMessage({
      name: 'connect',
      tabID: chrome.devtools.inspectedWindow.tabId,
    });
    // port.onMessage.addListener((message) => {
    //   if (!message.data) return;
    // });
  }
);
// Adds a sidebar to the elements panel
// Not sure if useful and only looks like it can be added to Elements (i.e. not our own panel)
// See Devtools for more information - https://developer.chrome.com/extensions/devtools
// chrome.devtools.panels.elements.createSidebarPane("My Sidebar",
//     function(sidebar) {
//         // sidebar initialization code here
//         sidebar.setObject({ some_data: "Some data to show" });
// });
