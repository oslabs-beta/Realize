/* eslint-disable no-undef */

const time = 500;

setTimeout(() => {
  console.log(`I waited ${time}milliseconds`);
  const s = document.createElement('script');
  s.src = chrome.extension.getURL('hook.js');
  document.head.appendChild(s);
}, time);
