// ==UserScript==
// @name         Retitle watchseries
// @namespace    http://tampermonkey.net/
// @version      2025-01-05
// @description  Fix document title
// @author       Anhsirk0
// @match        https://watchseries.im/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=netlify.app
// @grant        none
// ==/UserScript==

(function () {
  "use strict";

  const getName = () => {
    let name = "";
    const nameEl = document.querySelector(".heading-name>a");
    if (nameEl) {
      name = nameEl.innerHTML.replaceAll(" ", "_");
      // name = (nameEl.dataset.jname ?? nameEl.innerHTML).replaceAll(" ", "_");
    }
    if (!name) {
      const urlName = location.href.split("/").at(-1) ?? "Anime";
      name = urlName.split("-").slice(0, -1).join("_");
    }

    const episodeEl = document.querySelector(".eps-item.active");
    if (episodeEl) {
      const match = /Eps ([0-9]+).*/.exec(episodeEl.title);
      if (match) {
        name = Number(match[1]) + "__" + name;
      }
    }

    const seasonEl = document.querySelector("#current-season");
    if (seasonEl) {
      const match = /Season ([0-9]+).*/.exec(seasonEl.innerHTML);
      if (match) {
        name = name + "__S" + Number(match[1]);
      }
    }
    return name;
  };

  const chooseVidcloud = () => {
    const btns = document.querySelectorAll(".server-select>a");
    const btn = Array.from(btns).find((a) => a.title.includes("Vidcloud"));
    if (btn) btn.click();
  };

  const main = () => {
    document.title = getName();
    setTimeout(chooseVidcloud, 2222);
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
