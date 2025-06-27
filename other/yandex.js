// ==UserScript==
// @name         Remove ads (yandex mail)
// @namespace    http://tampermonkey.net/
// @version      2025-01-05
// @description  Remove ads (yandex mail)
// @author       Anhsirk0
// @match        https://mail.yandex.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=netlify.app
// @grant        none
// ==/UserScript==

(function () {
  "use strict";
  // let logsCount = 0;
  // const log = (text) => {
  //   let el = document.createElement("a");
  //   el.innerHTML = text;
  //   el.style.fontSize = "1rem";
  //   el.style.padding = "0.8rem";
  //   el.style.backgroundColor = "#5a2e98";
  //   el.style.color = "#EFEFEF";
  //   el.style.zIndex = "9999";
  //   el.style.position = "fixed";
  //   el.style.top = `${1 + 4.4 * logsCount}rem`;
  //   el.style.left = "1rem";
  //   el.style.borderRadius = "0.5rem";
  //   document.body.appendChild(el);
  //   logsCount++;
  // };

  const removeAdHeader = () => {
    const portal = document.querySelector(".message-list-banner-portal");
    if (!portal) return;
    portal.nextSibling.outerHTML = "";
  };

  const removeAdSidePanel = () => {
    const inner = document.getElementById("js-layout-inner");
    if (!inner) return;
    inner.nextSibling.outerHTML = "";
  };

  const main = () => {
    removeAdSidePanel();
    removeAdHeader();
  };

  setTimeout(() => {
    main();
    let previousUrl = "";
    const observer = new MutationObserver(function (mutations) {
      if (location.href !== previousUrl) {
        previousUrl = location.href;
        main();
      }
    });
    observer.observe(document, { subtree: true, childList: true });
  }, 5000);
})();
