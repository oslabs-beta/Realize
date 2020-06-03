/* eslint-disable no-use-before-define */
/* eslint-disable no-undef */

const time = 500;

setTimeout(() => {
  console.log(`I waited ${time}milliseconds`);
  const s = document.createElement('script');
  s.src = chrome.extension.getURL('hook.js');
  document.head.appendChild(s);
}, time);

const sendMessage = (tree) => {
  chrome.runtime.sendMessage(tree);
};

function handleMessage(request, sender, sendResponse) {
  if (request.data && request.data.tree) {
    sendMessage(request.data.tree);
  }
}

window.addEventListener('message', handleMessage);
