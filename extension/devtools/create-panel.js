/* eslint-disable no-use-before-define */
// This creates the dev tools panel using the panel.html file as the template

chrome.devtools.panels.create(
  'Realize', // title
  '', // icon
  './panel.html' // content
);

