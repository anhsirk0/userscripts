// ==UserScript==
// @name         Vidcloud 9animetv
// @namespace    http://tampermonkey.net/
// @version      2025-01-05
// @description  Vidcloud
// @author       You
// @match        https://9animetv.to/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=netlify.app
// @grant        none
// ==/UserScript==
(function () {
  "use strict";
  const main = () => {
    setTimeout(() => {
      const btns = document.querySelectorAll(".server-item[data-type='dub']>a");
      const btn = Array.from(btns).find((a) => a.innerHTML === "Vidcloud");
      if (btn) btn.click();
    }, 4444);
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
  }, 1000);
})();
