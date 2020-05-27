// This creates the dev tools panel using the panel.html file as the template

chrome.devtools.panels.create(
  "REACTionary", // title
  "./devtools/mango.png", // icon
  "./devtools/panel.html" // content
)
