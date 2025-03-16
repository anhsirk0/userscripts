// ==UserScript==
// @name         Retitle 9animetv
// @namespace    http://tampermonkey.net/
// @version      2025-01-05
// @description  Fix document title
// @author       You
// @match        https://9animetv.to/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=netlify.app
// @grant        none
// ==/UserScript==

(function () {
  "use strict";

  const getName = () => {
    let name = "";
    const nameEl = document.querySelector("h2.film-name.dynamic-name");
    if (nameEl) {
      name = nameEl.innerHTML.replaceAll(" ", "_");
      // name = (nameEl.dataset.jname ?? nameEl.innerHTML).replaceAll(" ", "_");
    }
    if (!name) {
      const urlName = location.href.split("/").at(-1) ?? "Anime";
      name = urlName.split("-").slice(0, -1).join("_");
    }

    const episodeEl = document.querySelector(".ep-item.active");
    if (episodeEl) {
      let ep = Number(episodeEl.dataset.number);
      if (ep) name = ep + "_" + name;
    }
    return name;
  };

  const main = () => {
    document.title = getName();
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
